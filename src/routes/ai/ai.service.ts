import { Injectable } from '@nestjs/common';
import Groq from 'groq-sdk';
import { PrismaService } from '../../shared/services/prisma.service';

// ============================================================
// Pure utility functions — exported for PBT testing
// ============================================================

export function isBotMention(text: string): boolean {
  return text.toLowerCase().startsWith('@royolabot');
}

export function extractMentionContent(text: string): string {
  // Remove @RoyolaBot prefix and exactly one space separator (if present)
  return text.replace(/^@royolabot /i, '').replace(/^@royolabot$/i, '');
}

export function filterMessagesForAI(messages: any[]): any[] {
  return messages.filter((m) => m.type === 'TEXT' && m.isRecalled === false);
}

export function parseSmartReplies(geminiResponse: string): string[] {
  // Try JSON array first
  try {
    const parsed = JSON.parse(geminiResponse);
    if (Array.isArray(parsed)) {
      return parsed
        .slice(0, 3)
        .map((s: unknown) => String(s).slice(0, 50))
        .filter((s) => s.length > 0);
    }
  } catch {
    // not JSON, fall through
  }
  // Fallback: split by newline, strip numbering
  const lines = geminiResponse
    .split('\n')
    .map((l) => l.replace(/^\d+[\.\)]\s*/, '').replace(/^[-*]\s*/, '').trim())
    .filter((l) => l.length > 0 && l.length <= 50);
  return lines.slice(0, 3);
}

export function shouldShowSmartReply(message: { type: string }): boolean {
  return message.type === 'TEXT';
}

export function shouldShowToneEditor(text: string): boolean {
  return text.length >= 5 && text.length <= 2000;
}

export function hasSensitiveContent(text: string): boolean {
  // Credit card: 16 consecutive digits (with optional spaces/dashes)
  if (/\d{16}/.test(text.replace(/[\s-]/g, ''))) return true;
  if (/\b\d{4}[\s-]\d{4}[\s-]\d{4}[\s-]\d{4}\b/.test(text)) return true;
  // Password patterns
  if (/password\s*[=:]/i.test(text)) return true;
  if (/mật\s*khẩu\s*[=:]/i.test(text)) return true;
  if (/passwd\s*[=:]/i.test(text)) return true;
  if (/pwd\s*[=:]/i.test(text)) return true;
  return false;
}

// ============================================================
// Context message format for Gemini
// ============================================================

export interface ContextMessage {
  role: 'user' | 'model';
  parts: [{ text: string }];
}

// ============================================================
// AiService
// ============================================================

@Injectable()
export class AiService {
  private botUserId: number = 0;
  private userRateLimits = new Map<number, { count: number; windowStart: number }>();
  private groupRateLimits = new Map<number, number>();
  private groq: Groq | null = null;
  private readonly MODEL = 'llama-3.1-8b-instant';

  constructor(private readonly prisma: PrismaService) {
    const apiKey = process.env.GROQ_API_KEY;
    if (apiKey) {
      this.groq = new Groq({ apiKey });
      console.log('[AiService] Groq AI initialized');
    } else {
      console.warn('[AiService] GROQ_API_KEY not set — AI features disabled');
    }
  }

  setBotUserId(id: number): void {
    this.botUserId = id;
  }

  getBotUserId(): number {
    return this.botUserId;
  }

  // ---- Rate limiting ----

  async checkRateLimit(userId: number): Promise<boolean> {
    const now = Date.now();
    const ONE_HOUR = 60 * 60 * 1000;
    const entry = this.userRateLimits.get(userId);
    if (!entry || now - entry.windowStart > ONE_HOUR) return true;
    return entry.count < 50;
  }

  async recordRequest(userId: number): Promise<void> {
    const now = Date.now();
    const ONE_HOUR = 60 * 60 * 1000;
    const entry = this.userRateLimits.get(userId);
    if (!entry || now - entry.windowStart > ONE_HOUR) {
      this.userRateLimits.set(userId, { count: 1, windowStart: now });
    } else {
      entry.count++;
    }
  }

  checkGroupRateLimit(conversationId: number): boolean {
    const last = this.groupRateLimits.get(conversationId);
    if (!last) return true;
    return Date.now() - last >= 3000;
  }

  recordGroupRequest(conversationId: number): void {
    this.groupRateLimits.set(conversationId, Date.now());
  }

  // ---- Token-safe context builder ----

  /**
   * Build context from raw messages array (used by PBT and internally).
   * Iterates from newest to oldest, stops when maxChars exceeded.
   */
  buildContextFromMessages(
    messages: Array<{ role: 'user' | 'model'; content: string }>,
    maxChars: number,
  ): ContextMessage[] {
    let totalChars = 0;
    const result: ContextMessage[] = [];
    // Iterate newest → oldest to ensure we cut the oldest messages
    for (let i = messages.length - 1; i >= 0; i--) {
      const msg = messages[i];
      if (totalChars + msg.content.length > maxChars) break;
      totalChars += msg.content.length;
      result.unshift({ role: msg.role, parts: [{ text: msg.content }] });
    }
    // Gemini requires history to start with 'user' role
    while (result.length > 0 && result[0].role !== 'user') {
      result.shift();
    }
    return result;
  }

  async buildContext(
    conversationId: number,
    maxMessages: number,
    maxChars = 30000,
  ): Promise<ContextMessage[]> {
    const messages = await this.prisma.message.findMany({
      where: { conversationId, type: 'TEXT', isRecalled: false },
      orderBy: { createdAt: 'desc' },
      take: maxMessages,
      select: { content: true, senderId: true },
    });
    // Reverse to get chronological order (oldest first)
    const reversed = messages.reverse();
    const mapped = reversed.map((m) => ({
      role: (m.senderId === this.botUserId ? 'model' : 'user') as 'user' | 'model',
      content: m.content || '',
    }));
    return this.buildContextFromMessages(mapped, maxChars);
  }

  // ---- Structured API call logger (Requirement 10.4) ----

  /**
   * Logs every Gemini API call with timestamp, userId, taskType, and status.
   * IMPORTANT: message content is intentionally NOT logged.
   */
  private logGeminiCall(
    userId: number,
    taskType: 'chat_1v1' | 'group_mention' | 'smart_reply' | 'tone_edit',
    status: 'start' | 'success' | 'fail' | 'rate_limited' | 'sensitive_content',
    extra?: Record<string, string | number>,
  ): void {
    const entry: Record<string, unknown> = {
      timestamp: new Date().toISOString(),
      userId,
      taskType,
      status,
      ...extra,
    };
    if (status === 'fail') {
      console.error('[AiService]', JSON.stringify(entry));
    } else {
      console.log('[AiService]', JSON.stringify(entry));
    }
  }

  // ---- Process 1-1 bot message (called via setImmediate from gateway) ----

  async processMessage(params: {
    conversationId: number;
    content: string;
    userId: number;
    server: any;
    userSockets: Map<number, string[]>;
  }): Promise<void> {
    const { conversationId, content, userId, server, userSockets } = params;
    const userSocketIds = userSockets.get(userId) || [];

    const emitToUser = (event: string, data: any) => {
      userSocketIds.forEach((sid) => server.to(sid).emit(event, data));
    };

    try {
      // Rate limit check
      if (!(await this.checkRateLimit(userId))) {
        this.logGeminiCall(userId, 'chat_1v1', 'rate_limited');
        const errMsg = await this.saveBotMessage(
          conversationId,
          'Bạn đã đạt giới hạn sử dụng AI. Vui lòng thử lại sau 1 giờ.',
        );
        emitToUser('newMessage', errMsg);
        return;
      }

      // Sensitive content check
      if (hasSensitiveContent(content)) {
        this.logGeminiCall(userId, 'chat_1v1', 'sensitive_content');
        const errMsg = await this.saveBotMessage(
          conversationId,
          'Nội dung có thể chứa thông tin nhạy cảm. Vui lòng kiểm tra lại trước khi gửi cho AI.',
        );
        emitToUser('newMessage', errMsg);
        return;
      }

      await this.recordRequest(userId);
      this.logGeminiCall(userId, 'chat_1v1', 'start', { conversationId });

      // Build context
      const context = await this.buildContext(conversationId, 10, 30000);

      // Call Gemini with retry on 5xx
      let responseText: string;
      try {
        responseText = await this.callGemini(context, content, 30000);
      } catch (err: any) {
        if (err.message === 'TIMEOUT' || err.status >= 500) {
          // Retry once after 2s
          await new Promise((r) => setTimeout(r, 2000));
          responseText = await this.callGemini(context, content, 30000);
        } else {
          throw err;
        }
      }

      const botMsg = await this.saveBotMessage(conversationId, responseText);
      this.logGeminiCall(userId, 'chat_1v1', 'success', { conversationId });
      emitToUser('newMessage', botMsg);
    } catch (err) {
      this.logGeminiCall(userId, 'chat_1v1', 'fail', { conversationId });
      console.error('[AiService] processMessage exception:', (err as Error).message);
      const errMsg = await this.saveBotMessage(
        conversationId,
        'Royola Bot hiện không khả dụng, vui lòng thử lại sau.',
      );
      emitToUser('newMessage', errMsg);
    } finally {
      emitToUser('botTypingStop', { conversationId });
    }
  }

  // ---- Process @RoyolaBot mention in group ----

  async processGroupMention(params: {
    conversationId: number;
    question: string;
    userId: number;
    server: any;
  }): Promise<void> {
    const { conversationId, question, userId, server } = params;
    const roomName = `conversation_${conversationId}`;

    try {
      if (!(await this.checkRateLimit(userId))) {
        this.logGeminiCall(userId, 'group_mention', 'rate_limited', { conversationId });
        const errMsg = await this.saveBotMessage(
          conversationId,
          'Bạn đã đạt giới hạn sử dụng AI. Vui lòng thử lại sau 1 giờ.',
        );
        server.to(roomName).emit('newMessage', errMsg);
        return;
      }

      await this.recordRequest(userId);
      const intent = this.detectIntent(question);
      this.logGeminiCall(userId, 'group_mention', 'start', { conversationId, intent });

      let responseText: string;

      if (intent === 'summarize') {
        const since = new Date(Date.now() - 24 * 60 * 60 * 1000);
        const messages = await this.prisma.message.findMany({
          where: {
            conversationId,
            type: 'TEXT',
            isRecalled: false,
            createdAt: { gte: since },
          },
          orderBy: { createdAt: 'asc' },
          take: 100,
          include: { sender: { select: { name: true } } },
        });
        if (messages.length === 0) {
          responseText = 'Không có nội dung nào để tóm tắt trong 24 giờ qua.';
        } else {
          const chatText = messages
            .map((m) => `${m.sender.name}: ${m.content}`)
            .join('\n')
            .slice(0, 30000);
          responseText = await this.callGeminiRaw(
            `Tóm tắt ngắn gọn nội dung cuộc trò chuyện sau bằng tiếng Việt:\n\n${chatText}`,
            30000,
          );
        }
      } else if (intent === 'task') {
        const messages = await this.prisma.message.findMany({
          where: { conversationId, type: 'TEXT', isRecalled: false },
          orderBy: { createdAt: 'desc' },
          take: 200,
          include: { sender: { select: { name: true } } },
        });
        if (messages.length === 0) {
          responseText = 'Không tìm thấy câu giao việc nào trong lịch sử trò chuyện.';
        } else {
          const chatText = messages
            .reverse()
            .map((m) => `${m.sender.name}: ${m.content}`)
            .join('\n')
            .slice(0, 30000);
          responseText = await this.callGeminiRaw(
            `Từ đoạn hội thoại sau, hãy trích xuất tất cả các câu giao việc, người được giao và deadline (nếu có). Trả về dạng danh sách rõ ràng bằng tiếng Việt:\n\n${chatText}`,
            30000,
          );
        }
      } else {
        responseText = await this.callGeminiRaw(question, 30000);
      }

      const botMsg = await this.saveBotMessage(conversationId, responseText);
      this.logGeminiCall(userId, 'group_mention', 'success', { conversationId });
      server.to(roomName).emit('newMessage', botMsg);
    } catch (err) {
      this.logGeminiCall(userId, 'group_mention', 'fail', { conversationId });
      console.error('[AiService] processGroupMention exception:', (err as Error).message);
      const errMsg = await this.saveBotMessage(
        conversationId,
        'Royola Bot hiện không khả dụng, vui lòng thử lại sau.',
      );
      server.to(roomName).emit('newMessage', errMsg);
    } finally {
      server.to(roomName).emit('botTypingStop', { conversationId });
    }
  }

  // ---- Smart Reply (HTTP, on-demand) ----

  async getSmartReplies(params: {
    messageContent: string;
    userId: number;
  }): Promise<string[]> {
    const { messageContent, userId } = params;
    if (!(await this.checkRateLimit(userId))) {
      this.logGeminiCall(userId, 'smart_reply', 'rate_limited');
      throw new Error('RATE_LIMIT_EXCEEDED');
    }
    await this.recordRequest(userId);
    this.logGeminiCall(userId, 'smart_reply', 'start');
    try {
      const prompt = `Dựa vào tin nhắn sau, hãy gợi ý 3 câu trả lời ngắn gọn (mỗi câu tối đa 50 ký tự) bằng cùng ngôn ngữ với tin nhắn. Trả về JSON array: ["gợi ý 1", "gợi ý 2", "gợi ý 3"]\n\nTin nhắn: "${messageContent}"`;
      const response = await this.callGeminiRaw(prompt, 5000);
      const replies = parseSmartReplies(response);
      this.logGeminiCall(userId, 'smart_reply', 'success');
      return replies;
    } catch (err) {
      this.logGeminiCall(userId, 'smart_reply', 'fail');
      throw err;
    }
  }

  // ---- Tone Editor (HTTP) ----

  async editTone(params: {
    text: string;
    mode: 'polite' | 'grammar';
    userId: number;
  }): Promise<string> {
    const { text, mode, userId } = params;
    if (!(await this.checkRateLimit(userId))) {
      this.logGeminiCall(userId, 'tone_edit', 'rate_limited');
      throw new Error('RATE_LIMIT_EXCEEDED');
    }
    await this.recordRequest(userId);
    this.logGeminiCall(userId, 'tone_edit', 'start', { mode });
    try {
      const prompt =
        mode === 'polite'
          ? `Viết lại đoạn văn sau theo giọng điệu lịch sự hơn, giữ nguyên ý nghĩa. Chỉ trả về đoạn văn đã viết lại, không giải thích:\n\n${text}`
          : `Sửa lỗi ngữ pháp và chính tả trong đoạn văn sau. Chỉ trả về đoạn văn đã sửa, không giải thích:\n\n${text}`;
      const result = await this.callGeminiRaw(prompt, 10000);
      this.logGeminiCall(userId, 'tone_edit', 'success', { mode });
      return result;
    } catch (err) {
      this.logGeminiCall(userId, 'tone_edit', 'fail', { mode });
      throw err;
    }
  }

  // ---- Private helpers ----

  private detectIntent(question: string): 'summarize' | 'task' | 'qa' {
    const lower = question.toLowerCase();
    if (/tóm tắt|summarize|tóm lược|tổng hợp/.test(lower)) return 'summarize';
    if (/\btask\b|công việc|giao việc|danh sách việc|todo/.test(lower)) return 'task';
    return 'qa';
  }

  private async callGemini(
    context: ContextMessage[],
    newMessage: string,
    timeoutMs: number,
  ): Promise<string> {
    if (!this.groq) throw new Error('Groq API not configured');
    const messages: Groq.Chat.ChatCompletionMessageParam[] = [
      { role: 'system', content: 'Bạn là Royola Bot, một trợ lý AI thông minh và thân thiện. Hãy trả lời bằng ngôn ngữ của người dùng.' },
      // Map 'model' → 'assistant' vì Groq dùng OpenAI format
      ...context.map(m => ({
        role: (m.role === 'model' ? 'assistant' : 'user') as 'user' | 'assistant',
        content: m.parts[0].text,
      })),
      { role: 'user', content: newMessage },
    ];
    const result = await Promise.race([
      this.groq.chat.completions.create({ model: this.MODEL, messages, max_tokens: 1024 }),
      new Promise<never>((_, reject) => setTimeout(() => reject(new Error('TIMEOUT')), timeoutMs)),
    ]);
    return (result as Groq.Chat.ChatCompletion).choices[0]?.message?.content || '';
  }

  private async callGeminiRaw(prompt: string, timeoutMs: number): Promise<string> {
    if (!this.groq) throw new Error('Groq API not configured');
    const result = await Promise.race([
      this.groq.chat.completions.create({
        model: this.MODEL,
        messages: [
          { role: 'system', content: 'Bạn là Royola Bot, một trợ lý AI thông minh và thân thiện.' },
          { role: 'user', content: prompt },
        ],
        max_tokens: 1024,
      }),
      new Promise<never>((_, reject) => setTimeout(() => reject(new Error('TIMEOUT')), timeoutMs)),
    ]);
    return (result as Groq.Chat.ChatCompletion).choices[0]?.message?.content || '';
  }

  private async saveBotMessage(conversationId: number, content: string) {
    return this.prisma.message.create({
      data: {
        senderId: this.botUserId,
        conversationId,
        content,
        type: 'TEXT',
      },
      include: { sender: { select: { id: true, name: true, avatar: true } } },
    });
  }
}

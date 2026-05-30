import { Injectable } from '@nestjs/common';
import Groq from 'groq-sdk';
import { PrismaService } from '../../shared/services/prisma.service';

// ============================================================
// Pure utility functions
// ============================================================
export function isBotMention(text: string): boolean {
  return text.toLowerCase().startsWith('@royolabot');
}
export function extractMentionContent(text: string): string {
  return text.replace(/^@royolabot /i, '').replace(/^@royolabot$/i, '');
}
export function filterMessagesForAI(messages: any[]): any[] {
  return messages.filter((m) => m.type === 'TEXT' && m.isRecalled === false);
}
export function parseSmartReplies(raw: string): string[] {
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed))
      return parsed.slice(0, 3).map((s: unknown) => String(s).slice(0, 50)).filter((s) => s.length > 0);
  } catch { }
  return raw
    .split('\n')
    .map((l) => l.replace(/^\d+[\.\)]\s*/, '').replace(/^[-*]\s*/, '').trim())
    .filter((l) => l.length > 0 && l.length <= 50)
    .slice(0, 3);
}
export function shouldShowSmartReply(message: { type: string }): boolean { return message.type === 'TEXT'; }
export function shouldShowToneEditor(text: string): boolean { return text.length >= 5 && text.length <= 2000; }
export function hasSensitiveContent(text: string): boolean {
  if (/\d{16}/.test(text.replace(/[\s-]/g, ''))) return true;
  if (/\b\d{4}[\s-]\d{4}[\s-]\d{4}[\s-]\d{4}\b/.test(text)) return true;
  if (/password\s*[=:]/i.test(text)) return true;
  if (/mat\s*khau\s*[=:]/i.test(text)) return true;
  if (/passwd\s*[=:]/i.test(text)) return true;
  if (/pwd\s*[=:]/i.test(text)) return true;
  return false;
}
export interface ContextMessage { role: 'user' | 'model'; parts: [{ text: string }]; }

// ============================================================
// AGENT TOOLS  Function Calling (Groq / OpenAI format)
// ============================================================
const AGENT_TOOLS: Groq.Chat.ChatCompletionTool[] = [
  {
    type: 'function',
    function: {
      name: 'get_friend_list',
      description: 'Sử dụng hàm này để lấy danh sách tên và số lượng bạn bè của người dùng hiện tại.',
      parameters: { type: 'object', properties: {}, required: [] },
    },
  },
  {
    type: 'function',
    function: {
      name: 'open_chat_room',
      description: 'CHỈ kích hoạt hàm này khi người dùng CÓ LỆNH RÕ RÀNG yêu cầu điều hướng giao diện (ví dụ: "mở đoạn chat với A", "chuyển sang phòng chat của B", "nhắn tin cho C"). TUYỆT ĐỐI KHÔNG gọi hàm này nếu người dùng chỉ đang hỏi bâng quơ, nhắc đến tên một người, hoặc hỏi đáp thông thường.',
      parameters: {
        type: 'object',
        properties: {
          target_name: { type: 'string', description: 'Ten nguoi ban muon mo cuoc tro chuyen. Vi du: "Nguyen Nhat Tan"' },
        },
        required: ['target_name'],
      },
    },
  },
    
];

export interface UserContext { userId: number; userName: string; }

// ============================================================
// AiService
// ============================================================
@Injectable()
export class AiService {
  private botUserId: number = 0;
  private userRateLimits = new Map<number, { count: number; windowStart: number }>();
  private groupRateLimits = new Map<number, number>();
  private groq: Groq | null = null;
  // llama-3.3-70b-versatile ho tro tool calling tot, khong leak XML tags
  private readonly MODEL = 'llama-3.3-70b-versatile';

  constructor(private readonly prisma: PrismaService) {
    const apiKey = process.env.GROQ_API_KEY;
    if (apiKey) {
      this.groq = new Groq({ apiKey });
      console.log('[AiService] Groq AI initialized');
    } else {
      console.warn('[AiService] GROQ_API_KEY not set - AI features disabled');
    }
  }

  setBotUserId(id: number): void { this.botUserId = id; }
  getBotUserId(): number { return this.botUserId; }

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
    } else { entry.count++; }
  }
  checkGroupRateLimit(conversationId: number): boolean {
    const last = this.groupRateLimits.get(conversationId);
    if (!last) return true;
    return Date.now() - last >= 3000;
  }
  recordGroupRequest(conversationId: number): void {
    this.groupRateLimits.set(conversationId, Date.now());
  }

  // ---- Context builder ----
  buildContextFromMessages(messages: Array<{ role: 'user' | 'model'; content: string }>, maxChars: number): ContextMessage[] {
    let totalChars = 0;
    const result: ContextMessage[] = [];
    for (let i = messages.length - 1; i >= 0; i--) {
      const msg = messages[i];
      if (totalChars + msg.content.length > maxChars) break;
      totalChars += msg.content.length;
      result.unshift({ role: msg.role, parts: [{ text: msg.content }] });
    }
    while (result.length > 0 && result[0].role !== 'user') result.shift();
    return result;
  }
  async buildContext(conversationId: number, maxMessages: number, maxChars = 30000): Promise<ContextMessage[]> {
    const messages = await this.prisma.message.findMany({
      where: { conversationId, type: 'TEXT', isRecalled: false },
      orderBy: { createdAt: 'desc' },
      take: maxMessages,
      select: { content: true, senderId: true },
    });
    const reversed = messages.reverse();
    const mapped = reversed.map((m) => ({
      role: (m.senderId === this.botUserId ? 'model' : 'user') as 'user' | 'model',
      content: m.content || '',
    }));
    return this.buildContextFromMessages(mapped, maxChars);
  }

  // ---- Logger ----
  private logCall(
    userId: number,
    taskType: 'chat_1v1' | 'group_mention' | 'smart_reply' | 'tone_edit',
    status: 'start' | 'success' | 'fail' | 'rate_limited' | 'sensitive_content',
    extra?: Record<string, string | number>,
  ): void {
    const entry: Record<string, unknown> = { timestamp: new Date().toISOString(), userId, taskType, status, ...extra };
    if (status === 'fail') console.error('[AiService]', JSON.stringify(entry));
    else console.log('[AiService]', JSON.stringify(entry));
  }

  // ============================================================
  // processMessage  chat 1-1 voi bot, co System Prompt + Function Calling
  // Luong: rate limit -> sensitive check -> Groq lan 1 voi tools
  //        -> neu tool_calls: xu ly tung tool -> Groq lan 2 -> luu + emit
  //        -> neu khong tool: luu + emit truc tiep
  // ============================================================
  async processMessage(params: {
    conversationId: number;
    content: string;
    userId: number;
    userName: string;
    server: any;
    userSockets: Map<number, string[]>;
  }): Promise<void> {
    const { conversationId, content, userId, userName, server, userSockets } = params;
    const userSocketIds = userSockets.get(userId) || [];
    const emitToUser = (event: string, data: any) => userSocketIds.forEach((sid) => server.to(sid).emit(event, data));

    try {
      if (!(await this.checkRateLimit(userId))) {
        this.logCall(userId, 'chat_1v1', 'rate_limited');
        emitToUser('newMessage', await this.saveBotMessage(conversationId, 'Ban da dat gioi han su dung AI. Vui long thu lai sau 1 gio.'));
        return;
      }
      if (hasSensitiveContent(content)) {
        this.logCall(userId, 'chat_1v1', 'sensitive_content');
        emitToUser('newMessage', await this.saveBotMessage(conversationId, 'Noi dung co the chua thong tin nhay cam. Vui long kiem tra lai.'));
        return;
      }

      await this.recordRequest(userId);
      this.logCall(userId, 'chat_1v1', 'start', { conversationId });

      const context = await this.buildContext(conversationId, 10, 30000);

      // --- CAP DO 1: System Prompt dong voi boi canh user + thoi gian thuc ---
      const now = new Date();
      const systemPrompt = [
        `Bạn là Royola Bot, trợ lý AI thông minh của ứng dụng chat Royola.`,
        `Thông tin người dùng đang chat với bạn:`,
        `  - Tên: ${userName}`,
        `  - User ID: ${userId}`,
        `Thời gian hệ thống hiện tại: ${now.toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })} (GMT+7).`,
        ``,
        `QUY TẮC NGÔN NGỮ TỐI THƯỢNG: BẠN BẮT BUỘC PHẢI LUÔN LUÔN trả lời bằng tiếng Việt có dấu chuẩn xác, định dạng rõ ràng, tự nhiên.`,
        ``,
        `Quy tắc Gọi Hàm (Strict Rules):`,
        `CHỈ gọi hàm khi người dùng yêu cầu hành động cụ thể (ví dụ: "mở chat với X", "tạo nhóm", "tôi có bao nhiêu bạn bè").`,
        `NẾU người dùng hỏi các câu hỏi hướng dẫn sử dụng (FAQ), TUYỆT ĐỐI KHÔNG kích hoạt tool. Hãy trả lời dựa trên Cẩm nang sau:`,
        ``,
        `CẨM NANG HƯỚNG DẪN (Không gọi tool khi hỏi các câu này):`,
        `  - Để kết bạn: Bấm vào biểu tượng Kết bạn ở thanh Sidebar bên trái -> Nhập số điện thoại để tìm -> Gửi yêu cầu kết bạn.`,
        `  - Để tạo nhóm chat: Bấm vào biểu tượng Tạo nhóm là dấu + ở trong mục chat -> Chọn danh sách bạn bè bạn muốn thêm vào nhóm -> Đặt tên nhóm -> Khởi tạo nhóm. Lưu ý rằng, tạo nhóm cần phải kết bạn từ trước và phải có ít nhất 3 thành viên mới có thể tạo nhóm được.`,
        ``,
        `QUAN TRỌNG: Tuyệt đối KHÔNG tự viết XML tags, function tags hay <function=...> trong câu trả lời.`,
        `Nếu đã gọi tool và nhận được kết quả, hãy trả lời bằng ngôn ngữ tự nhiên dựa trên kết quả đó.`,
      ].join('\n');

      if (!this.groq) throw new Error('Groq API not configured');

      const messages: Groq.Chat.ChatCompletionMessageParam[] = [
        { role: 'system', content: systemPrompt },
        ...context.map((m) => ({
          role: (m.role === 'model' ? 'assistant' : 'user') as 'user' | 'assistant',
          content: m.parts[0].text,
        })),
        { role: 'user', content },
      ];

      // --- Groq LAN 1: co tools, de AI tu quyet dinh co goi hay khong ---
      const firstRes = await Promise.race([
        this.groq.chat.completions.create({ model: this.MODEL, messages, tools: AGENT_TOOLS, tool_choice: 'auto', max_tokens: 1024 }),
        new Promise<never>((_, reject) => setTimeout(() => reject(new Error('TIMEOUT')), 30000)),
      ]) as Groq.Chat.ChatCompletion;

      const firstChoice = firstRes.choices[0];

      // --- CAP DO 2 & 3: Xu ly tool calls ---
      if (firstChoice.finish_reason === 'tool_calls' && firstChoice.message.tool_calls) {
        messages.push(firstChoice.message as Groq.Chat.ChatCompletionMessageParam);

        for (const toolCall of firstChoice.message.tool_calls) {
          const toolName = toolCall.function.name;
          let toolResult: string;
          console.log(`[AiService] Tool call: ${toolName}`, toolCall.function.arguments);

          if (toolName === 'get_friend_list') {
            // Trả về mảng { id, name } thay vì chỉ đếm số lượng
            try {
              const friendships = await this.prisma.friendship.findMany({
                where: { OR: [{ requesterId: userId, status: 'ACCEPTED' }, { receiverId: userId, status: 'ACCEPTED' }] },
                include: { requester: { select: { id: true, name: true } }, receiver: { select: { id: true, name: true } } },
              });
              const friends = friendships.map((f) =>
                f.requesterId === userId
                  ? { id: f.receiverId, name: f.receiver.name }
                  : { id: f.requesterId, name: f.requester.name },
              );
              toolResult = JSON.stringify({ friend_count: friends.length, friends });
            } catch (e) {
              toolResult = JSON.stringify({ error: 'Không tìm thấy dữ liệu phù hợp trong hệ thống' });
            }

          } else if (toolName === 'open_chat_room') {
            // CAP DO 3: Emit Socket.IO de dieu huong Frontend — bọc try/catch để không crash app
            try {
              let args: { target_name?: string } = {};
              try { args = JSON.parse(toolCall.function.arguments); } catch { }
              const targetName = args.target_name || '';

              const friendship = await this.prisma.friendship.findFirst({
                where: {
                  status: 'ACCEPTED',
                  OR: [
                    { requesterId: userId, receiver: { name: { contains: targetName, mode: 'insensitive' } } },
                    { receiverId: userId, requester: { name: { contains: targetName, mode: 'insensitive' } } },
                  ],
                },
                include: { requester: { select: { id: true, name: true } }, receiver: { select: { id: true, name: true } } },
              });

              if (!friendship) {
                toolResult = JSON.stringify({ error: `Không tìm thấy dữ liệu phù hợp trong hệ thống: không có bạn bè tên "${targetName}"` });
              } else {
                const friendId = friendship.requesterId === userId ? friendship.receiverId : friendship.requesterId;
                const friendName = friendship.requesterId === userId ? friendship.receiver.name : friendship.requester.name;
                const conv = await this.prisma.conversation.findFirst({
                  where: { isGroup: false, AND: [{ members: { some: { userId } } }, { members: { some: { userId: friendId } } }] },
                });
                if (conv) {
                  emitToUser('AI_CLIENT_ACTION', { action: 'OPEN_CHAT', conversationId: conv.id, targetName: friendName });
                  toolResult = JSON.stringify({ success: true, message: `Da mo giao dien chat voi ${friendName}` });
                } else {
                  toolResult = JSON.stringify({ error: 'Không tìm thấy dữ liệu phù hợp trong hệ thống: chưa có cuộc trò chuyện nào' });
                }
              }
            } catch (e) {
              toolResult = JSON.stringify({ error: 'Không tìm thấy dữ liệu phù hợp trong hệ thống' });
            }

          } else if (toolName === 'create_group_chat') {
            // TOOL MOI: Tao nhom chat thuc su qua Prisma
            let args: { group_name?: string; member_names?: string[] } = {};
            try { args = JSON.parse(toolCall.function.arguments); } catch { }
            const groupName = args.group_name || 'Nhom moi';
            const memberNames = args.member_names || [];

            if (memberNames.length === 0) {
              toolResult = JSON.stringify({ success: false, message: 'Vui long cung cap ten it nhat 1 thanh vien de tao nhom.' });
            } else {
              const friendships = await this.prisma.friendship.findMany({
                where: { status: 'ACCEPTED', OR: [{ requesterId: userId }, { receiverId: userId }] },
                include: { requester: { select: { id: true, name: true } }, receiver: { select: { id: true, name: true } } },
              });

              const foundIds: number[] = [];
              const notFound: string[] = [];
              for (const name of memberNames) {
                const match = friendships.find((f) => {
                  const friend = f.requesterId === userId ? f.receiver : f.requester;
                  return friend.name.toLowerCase().includes(name.toLowerCase());
                });
                if (match) {
                  foundIds.push(match.requesterId === userId ? match.receiverId : match.requesterId);
                } else {
                  notFound.push(name);
                }
              }

              if (notFound.length > 0) {
                toolResult = JSON.stringify({ success: false, message: `Khong tim thay ban be: ${notFound.join(', ')}. Vui long kiem tra lai ten.` });
              } else if (foundIds.length < 2) {
                toolResult = JSON.stringify({ success: false, message: 'Nhom chat can it nhat 3 nguoi (bao gom ban). Vui long them it nhat 2 nguoi ban.' });
              } else {
                const allIds = [userId, ...foundIds];
                const newGroup = await this.prisma.conversation.create({
                  data: {
                    isGroup: true,
                    name: groupName,
                    members: {
                      create: allIds.map((id) => ({
                        user: { connect: { id } },
                        role: id === userId ? ('ADMIN' as any) : ('MEMBER' as any),
                      })),
                    },
                  },
                  include: { members: { include: { user: { select: { id: true, name: true } } } } },
                });
                emitToUser('AI_CLIENT_ACTION', { action: 'OPEN_CHAT', conversationId: newGroup.id, targetName: groupName });
                const nameList = newGroup.members.map((m) => m.user.name).join(', ');
                toolResult = JSON.stringify({ success: true, conversationId: newGroup.id, message: `Da tao nhom "${groupName}" thanh cong voi ${newGroup.members.length} thanh vien: ${nameList}` });
              }
            }

          } else {
            toolResult = JSON.stringify({ error: `Tool "${toolName}" khong duoc ho tro` });
          }

          messages.push({ role: 'tool', tool_call_id: toolCall.id, content: toolResult });
        }

        // --- Groq LAN 2: sinh cau tra loi tu nhien dua tren ket qua tool ---
        const secondRes = await Promise.race([
          this.groq.chat.completions.create({ model: this.MODEL, messages, max_tokens: 1024 }),
          new Promise<never>((_, reject) => setTimeout(() => reject(new Error('TIMEOUT')), 30000)),
        ]) as Groq.Chat.ChatCompletion;

        const finalText = this.sanitizeResponse(secondRes.choices[0]?.message?.content || 'Da thuc hien xong.');
        this.logCall(userId, 'chat_1v1', 'success', { conversationId });
        emitToUser('newMessage', await this.saveBotMessage(conversationId, finalText));

      } else {
        // Groq tra loi binh thuong, khong goi tool
        const responseText = this.sanitizeResponse(firstChoice.message?.content || '');
        this.logCall(userId, 'chat_1v1', 'success', { conversationId });
        emitToUser('newMessage', await this.saveBotMessage(conversationId, responseText));
      }

    } catch (err) {
      this.logCall(userId, 'chat_1v1', 'fail', { conversationId });
      console.error('[AiService] processMessage exception:', (err as Error).message);
      emitToUser('newMessage', await this.saveBotMessage(conversationId, 'Royola Bot hien khong kha dung, vui long thu lai sau.'));
    } finally {
      emitToUser('botTypingStop', { conversationId });
    }
  }

  // ---- processGroupMention: @RoyolaBot trong nhom ----
  async processGroupMention(params: { conversationId: number; question: string; userId: number; server: any }): Promise<void> {
    const { conversationId, question, userId, server } = params;
    const roomName = `conversation_${conversationId}`;
    try {
      if (!(await this.checkRateLimit(userId))) {
        this.logCall(userId, 'group_mention', 'rate_limited', { conversationId });
        server.to(roomName).emit('newMessage', await this.saveBotMessage(conversationId, 'Ban da dat gioi han su dung AI. Vui long thu lai sau 1 gio.'));
        return;
      }
      await this.recordRequest(userId);
      const intent = this.detectIntent(question);
      this.logCall(userId, 'group_mention', 'start', { conversationId, intent });
      let responseText: string;

      if (intent === 'summarize') {
        const since = new Date(Date.now() - 24 * 60 * 60 * 1000);
        const msgs = await this.prisma.message.findMany({
          where: { conversationId, type: 'TEXT', isRecalled: false, createdAt: { gte: since } },
          orderBy: { createdAt: 'asc' }, take: 100,
          include: { sender: { select: { name: true } } },
        });
        if (msgs.length === 0) {
          responseText = 'Khong co noi dung nao de tom tat trong 24 gio qua.';
        } else {
          const chatText = msgs.map((m) => `${m.sender.name}: ${m.content}`).join('\n').slice(0, 30000);
          responseText = await this.callGeminiRaw(`Tom tat ngan gon noi dung cuoc tro chuyen sau bang tieng Viet:\n\n${chatText}`, 30000);
        }
      } else if (intent === 'task') {
        const msgs = await this.prisma.message.findMany({
          where: { conversationId, type: 'TEXT', isRecalled: false },
          orderBy: { createdAt: 'desc' }, take: 200,
          include: { sender: { select: { name: true } } },
        });
        if (msgs.length === 0) {
          responseText = 'Khong tim thay cau giao viec nao trong lich su tro chuyen.';
        } else {
          const chatText = msgs.reverse().map((m) => `${m.sender.name}: ${m.content}`).join('\n').slice(0, 30000);
          responseText = await this.callGeminiRaw(`Tu doan hoi thoai sau, hay trich xuat tat ca cac cau giao viec, nguoi duoc giao va deadline (neu co). Tra ve dang danh sach ro rang bang tieng Viet:\n\n${chatText}`, 30000);
        }
      } else {
        responseText = await this.callGeminiRaw(question, 30000);
      }

      this.logCall(userId, 'group_mention', 'success', { conversationId });
      server.to(roomName).emit('newMessage', await this.saveBotMessage(conversationId, responseText));
    } catch (err) {
      this.logCall(userId, 'group_mention', 'fail', { conversationId });
      console.error('[AiService] processGroupMention exception:', (err as Error).message);
      server.to(roomName).emit('newMessage', await this.saveBotMessage(conversationId, 'Royola Bot hien khong kha dung, vui long thu lai sau.'));
    } finally {
      server.to(roomName).emit('botTypingStop', { conversationId });
    }
  }

  // ---- Smart Reply ----
  async getSmartReplies(params: { messageContent: string; userId: number }): Promise<string[]> {
    const { messageContent, userId } = params;
    if (!(await this.checkRateLimit(userId))) { this.logCall(userId, 'smart_reply', 'rate_limited'); throw new Error('RATE_LIMIT_EXCEEDED'); }
    await this.recordRequest(userId);
    this.logCall(userId, 'smart_reply', 'start');
    try {
      const prompt = `Dua vao tin nhan sau, hay goi y 3 cau tra loi ngan gon (moi cau toi da 50 ky tu) bang cung ngon ngu voi tin nhan. Tra ve JSON array: ["goi y 1", "goi y 2", "goi y 3"]\n\nTin nhan: "${messageContent}"`;
      const response = await this.callGeminiRaw(prompt, 5000);
      const replies = parseSmartReplies(response);
      this.logCall(userId, 'smart_reply', 'success');
      return replies;
    } catch (err) { this.logCall(userId, 'smart_reply', 'fail'); throw err; }
  }

  // ---- Tone Editor ----
  async editTone(params: { text: string; mode: 'polite' | 'grammar'; userId: number }): Promise<string> {
    const { text, mode, userId } = params;
    if (!(await this.checkRateLimit(userId))) { this.logCall(userId, 'tone_edit', 'rate_limited'); throw new Error('RATE_LIMIT_EXCEEDED'); }
    await this.recordRequest(userId);
    this.logCall(userId, 'tone_edit', 'start', { mode });
    try {
      const prompt = mode === 'polite'
        ? `Viet lai doan van sau theo giong dieu lich su hon, giu nguyen y nghia. Chi tra ve doan van da viet lai, khong giai thich:\n\n${text}`
        : `Sua loi ngu phap va chinh ta trong doan van sau. Chi tra ve doan van da sua, khong giai thich:\n\n${text}`;
      const result = await this.callGeminiRaw(prompt, 10000);
      this.logCall(userId, 'tone_edit', 'success', { mode });
      return result;
    } catch (err) { this.logCall(userId, 'tone_edit', 'fail', { mode }); throw err; }
  }

  // ---- Private helpers ----
  private detectIntent(question: string): 'summarize' | 'task' | 'qa' {
    const lower = question.toLowerCase();
    if (/tom tat|summarize|tom luoc|tong hop/.test(lower)) return 'summarize';
    if (/\btask\b|cong viec|giao viec|danh sach viec|todo/.test(lower)) return 'task';
    return 'qa';
  }

  /**
   * Loai bo XML/function tags bi leak ra ngoai cau tra loi.
   * Mot so model nho doi khi tu viet <function=...> thay vi goi tool dung cach.
   */
  private sanitizeResponse(text: string): string {
    let cleaned = text.replace(/<function=[^>]*>[\s\S]*?<\/function>/gi, '');
    cleaned = cleaned.replace(/<function=[^>]*\/>/gi, '');
    cleaned = cleaned.replace(/\{"name"\s*:\s*"[^"]+"\s*,\s*"parameters"[\s\S]*?\}/g, '');
    cleaned = cleaned.replace(/\n{3,}/g, '\n\n').trim();
    return cleaned || 'Da thuc hien xong.';
  }

  private async callGeminiRaw(prompt: string, timeoutMs: number): Promise<string> {
    if (!this.groq) throw new Error('Groq API not configured');
    const result = await Promise.race([
      this.groq.chat.completions.create({
        model: this.MODEL,
        messages: [
          { role: 'system', content: 'Ban la Royola Bot, mot tro ly AI thong minh va than thien.' },
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
      data: { senderId: this.botUserId, conversationId, content, type: 'TEXT' },
      include: { sender: { select: { id: true, name: true, avatar: true } } },
    });
  }
}

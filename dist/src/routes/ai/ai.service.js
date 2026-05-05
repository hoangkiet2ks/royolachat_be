"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiService = void 0;
exports.isBotMention = isBotMention;
exports.extractMentionContent = extractMentionContent;
exports.filterMessagesForAI = filterMessagesForAI;
exports.parseSmartReplies = parseSmartReplies;
exports.shouldShowSmartReply = shouldShowSmartReply;
exports.shouldShowToneEditor = shouldShowToneEditor;
exports.hasSensitiveContent = hasSensitiveContent;
const common_1 = require("@nestjs/common");
const groq_sdk_1 = __importDefault(require("groq-sdk"));
const prisma_service_1 = require("../../shared/services/prisma.service");
function isBotMention(text) {
    return text.toLowerCase().startsWith('@royolabot');
}
function extractMentionContent(text) {
    return text.replace(/^@royolabot /i, '').replace(/^@royolabot$/i, '');
}
function filterMessagesForAI(messages) {
    return messages.filter((m) => m.type === 'TEXT' && m.isRecalled === false);
}
function parseSmartReplies(geminiResponse) {
    try {
        const parsed = JSON.parse(geminiResponse);
        if (Array.isArray(parsed)) {
            return parsed
                .slice(0, 3)
                .map((s) => String(s).slice(0, 50))
                .filter((s) => s.length > 0);
        }
    }
    catch {
    }
    const lines = geminiResponse
        .split('\n')
        .map((l) => l.replace(/^\d+[\.\)]\s*/, '').replace(/^[-*]\s*/, '').trim())
        .filter((l) => l.length > 0 && l.length <= 50);
    return lines.slice(0, 3);
}
function shouldShowSmartReply(message) {
    return message.type === 'TEXT';
}
function shouldShowToneEditor(text) {
    return text.length >= 5 && text.length <= 2000;
}
function hasSensitiveContent(text) {
    if (/\d{16}/.test(text.replace(/[\s-]/g, '')))
        return true;
    if (/\b\d{4}[\s-]\d{4}[\s-]\d{4}[\s-]\d{4}\b/.test(text))
        return true;
    if (/password\s*[=:]/i.test(text))
        return true;
    if (/mật\s*khẩu\s*[=:]/i.test(text))
        return true;
    if (/passwd\s*[=:]/i.test(text))
        return true;
    if (/pwd\s*[=:]/i.test(text))
        return true;
    return false;
}
let AiService = class AiService {
    constructor(prisma) {
        this.prisma = prisma;
        this.botUserId = 0;
        this.userRateLimits = new Map();
        this.groupRateLimits = new Map();
        this.groq = null;
        this.MODEL = 'llama-3.1-8b-instant';
        const apiKey = process.env.GROQ_API_KEY;
        if (apiKey) {
            this.groq = new groq_sdk_1.default({ apiKey });
            console.log('[AiService] Groq AI initialized');
        }
        else {
            console.warn('[AiService] GROQ_API_KEY not set — AI features disabled');
        }
    }
    setBotUserId(id) {
        this.botUserId = id;
    }
    getBotUserId() {
        return this.botUserId;
    }
    async checkRateLimit(userId) {
        const now = Date.now();
        const ONE_HOUR = 60 * 60 * 1000;
        const entry = this.userRateLimits.get(userId);
        if (!entry || now - entry.windowStart > ONE_HOUR)
            return true;
        return entry.count < 50;
    }
    async recordRequest(userId) {
        const now = Date.now();
        const ONE_HOUR = 60 * 60 * 1000;
        const entry = this.userRateLimits.get(userId);
        if (!entry || now - entry.windowStart > ONE_HOUR) {
            this.userRateLimits.set(userId, { count: 1, windowStart: now });
        }
        else {
            entry.count++;
        }
    }
    checkGroupRateLimit(conversationId) {
        const last = this.groupRateLimits.get(conversationId);
        if (!last)
            return true;
        return Date.now() - last >= 3000;
    }
    recordGroupRequest(conversationId) {
        this.groupRateLimits.set(conversationId, Date.now());
    }
    buildContextFromMessages(messages, maxChars) {
        let totalChars = 0;
        const result = [];
        for (let i = messages.length - 1; i >= 0; i--) {
            const msg = messages[i];
            if (totalChars + msg.content.length > maxChars)
                break;
            totalChars += msg.content.length;
            result.unshift({ role: msg.role, parts: [{ text: msg.content }] });
        }
        while (result.length > 0 && result[0].role !== 'user') {
            result.shift();
        }
        return result;
    }
    async buildContext(conversationId, maxMessages, maxChars = 30000) {
        const messages = await this.prisma.message.findMany({
            where: { conversationId, type: 'TEXT', isRecalled: false },
            orderBy: { createdAt: 'desc' },
            take: maxMessages,
            select: { content: true, senderId: true },
        });
        const reversed = messages.reverse();
        const mapped = reversed.map((m) => ({
            role: (m.senderId === this.botUserId ? 'model' : 'user'),
            content: m.content || '',
        }));
        return this.buildContextFromMessages(mapped, maxChars);
    }
    logGeminiCall(userId, taskType, status, extra) {
        const entry = {
            timestamp: new Date().toISOString(),
            userId,
            taskType,
            status,
            ...extra,
        };
        if (status === 'fail') {
            console.error('[AiService]', JSON.stringify(entry));
        }
        else {
            console.log('[AiService]', JSON.stringify(entry));
        }
    }
    async processMessage(params) {
        const { conversationId, content, userId, server, userSockets } = params;
        const userSocketIds = userSockets.get(userId) || [];
        const emitToUser = (event, data) => {
            userSocketIds.forEach((sid) => server.to(sid).emit(event, data));
        };
        try {
            if (!(await this.checkRateLimit(userId))) {
                this.logGeminiCall(userId, 'chat_1v1', 'rate_limited');
                const errMsg = await this.saveBotMessage(conversationId, 'Bạn đã đạt giới hạn sử dụng AI. Vui lòng thử lại sau 1 giờ.');
                emitToUser('newMessage', errMsg);
                return;
            }
            if (hasSensitiveContent(content)) {
                this.logGeminiCall(userId, 'chat_1v1', 'sensitive_content');
                const errMsg = await this.saveBotMessage(conversationId, 'Nội dung có thể chứa thông tin nhạy cảm. Vui lòng kiểm tra lại trước khi gửi cho AI.');
                emitToUser('newMessage', errMsg);
                return;
            }
            await this.recordRequest(userId);
            this.logGeminiCall(userId, 'chat_1v1', 'start', { conversationId });
            const context = await this.buildContext(conversationId, 10, 30000);
            let responseText;
            try {
                responseText = await this.callGemini(context, content, 30000);
            }
            catch (err) {
                if (err.message === 'TIMEOUT' || err.status >= 500) {
                    await new Promise((r) => setTimeout(r, 2000));
                    responseText = await this.callGemini(context, content, 30000);
                }
                else {
                    throw err;
                }
            }
            const botMsg = await this.saveBotMessage(conversationId, responseText);
            this.logGeminiCall(userId, 'chat_1v1', 'success', { conversationId });
            emitToUser('newMessage', botMsg);
        }
        catch (err) {
            this.logGeminiCall(userId, 'chat_1v1', 'fail', { conversationId });
            console.error('[AiService] processMessage exception:', err.message);
            const errMsg = await this.saveBotMessage(conversationId, 'Royola Bot hiện không khả dụng, vui lòng thử lại sau.');
            emitToUser('newMessage', errMsg);
        }
        finally {
            emitToUser('botTypingStop', { conversationId });
        }
    }
    async processGroupMention(params) {
        const { conversationId, question, userId, server } = params;
        const roomName = `conversation_${conversationId}`;
        try {
            if (!(await this.checkRateLimit(userId))) {
                this.logGeminiCall(userId, 'group_mention', 'rate_limited', { conversationId });
                const errMsg = await this.saveBotMessage(conversationId, 'Bạn đã đạt giới hạn sử dụng AI. Vui lòng thử lại sau 1 giờ.');
                server.to(roomName).emit('newMessage', errMsg);
                return;
            }
            await this.recordRequest(userId);
            const intent = this.detectIntent(question);
            this.logGeminiCall(userId, 'group_mention', 'start', { conversationId, intent });
            let responseText;
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
                }
                else {
                    const chatText = messages
                        .map((m) => `${m.sender.name}: ${m.content}`)
                        .join('\n')
                        .slice(0, 30000);
                    responseText = await this.callGeminiRaw(`Tóm tắt ngắn gọn nội dung cuộc trò chuyện sau bằng tiếng Việt:\n\n${chatText}`, 30000);
                }
            }
            else if (intent === 'task') {
                const messages = await this.prisma.message.findMany({
                    where: { conversationId, type: 'TEXT', isRecalled: false },
                    orderBy: { createdAt: 'desc' },
                    take: 200,
                    include: { sender: { select: { name: true } } },
                });
                if (messages.length === 0) {
                    responseText = 'Không tìm thấy câu giao việc nào trong lịch sử trò chuyện.';
                }
                else {
                    const chatText = messages
                        .reverse()
                        .map((m) => `${m.sender.name}: ${m.content}`)
                        .join('\n')
                        .slice(0, 30000);
                    responseText = await this.callGeminiRaw(`Từ đoạn hội thoại sau, hãy trích xuất tất cả các câu giao việc, người được giao và deadline (nếu có). Trả về dạng danh sách rõ ràng bằng tiếng Việt:\n\n${chatText}`, 30000);
                }
            }
            else {
                responseText = await this.callGeminiRaw(question, 30000);
            }
            const botMsg = await this.saveBotMessage(conversationId, responseText);
            this.logGeminiCall(userId, 'group_mention', 'success', { conversationId });
            server.to(roomName).emit('newMessage', botMsg);
        }
        catch (err) {
            this.logGeminiCall(userId, 'group_mention', 'fail', { conversationId });
            console.error('[AiService] processGroupMention exception:', err.message);
            const errMsg = await this.saveBotMessage(conversationId, 'Royola Bot hiện không khả dụng, vui lòng thử lại sau.');
            server.to(roomName).emit('newMessage', errMsg);
        }
        finally {
            server.to(roomName).emit('botTypingStop', { conversationId });
        }
    }
    async getSmartReplies(params) {
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
        }
        catch (err) {
            this.logGeminiCall(userId, 'smart_reply', 'fail');
            throw err;
        }
    }
    async editTone(params) {
        const { text, mode, userId } = params;
        if (!(await this.checkRateLimit(userId))) {
            this.logGeminiCall(userId, 'tone_edit', 'rate_limited');
            throw new Error('RATE_LIMIT_EXCEEDED');
        }
        await this.recordRequest(userId);
        this.logGeminiCall(userId, 'tone_edit', 'start', { mode });
        try {
            const prompt = mode === 'polite'
                ? `Viết lại đoạn văn sau theo giọng điệu lịch sự hơn, giữ nguyên ý nghĩa. Chỉ trả về đoạn văn đã viết lại, không giải thích:\n\n${text}`
                : `Sửa lỗi ngữ pháp và chính tả trong đoạn văn sau. Chỉ trả về đoạn văn đã sửa, không giải thích:\n\n${text}`;
            const result = await this.callGeminiRaw(prompt, 10000);
            this.logGeminiCall(userId, 'tone_edit', 'success', { mode });
            return result;
        }
        catch (err) {
            this.logGeminiCall(userId, 'tone_edit', 'fail', { mode });
            throw err;
        }
    }
    detectIntent(question) {
        const lower = question.toLowerCase();
        if (/tóm tắt|summarize|tóm lược|tổng hợp/.test(lower))
            return 'summarize';
        if (/\btask\b|công việc|giao việc|danh sách việc|todo/.test(lower))
            return 'task';
        return 'qa';
    }
    async callGemini(context, newMessage, timeoutMs) {
        if (!this.groq)
            throw new Error('Groq API not configured');
        const messages = [
            { role: 'system', content: 'Bạn là Royola Bot, một trợ lý AI thông minh và thân thiện. Hãy trả lời bằng ngôn ngữ của người dùng.' },
            ...context.map(m => ({
                role: (m.role === 'model' ? 'assistant' : 'user'),
                content: m.parts[0].text,
            })),
            { role: 'user', content: newMessage },
        ];
        const result = await Promise.race([
            this.groq.chat.completions.create({ model: this.MODEL, messages, max_tokens: 1024 }),
            new Promise((_, reject) => setTimeout(() => reject(new Error('TIMEOUT')), timeoutMs)),
        ]);
        return result.choices[0]?.message?.content || '';
    }
    async callGeminiRaw(prompt, timeoutMs) {
        if (!this.groq)
            throw new Error('Groq API not configured');
        const result = await Promise.race([
            this.groq.chat.completions.create({
                model: this.MODEL,
                messages: [
                    { role: 'system', content: 'Bạn là Royola Bot, một trợ lý AI thông minh và thân thiện.' },
                    { role: 'user', content: prompt },
                ],
                max_tokens: 1024,
            }),
            new Promise((_, reject) => setTimeout(() => reject(new Error('TIMEOUT')), timeoutMs)),
        ]);
        return result.choices[0]?.message?.content || '';
    }
    async saveBotMessage(conversationId, content) {
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
};
exports.AiService = AiService;
exports.AiService = AiService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AiService);
//# sourceMappingURL=ai.service.js.map
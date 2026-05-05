import { PrismaService } from '../../shared/services/prisma.service';
export declare function isBotMention(text: string): boolean;
export declare function extractMentionContent(text: string): string;
export declare function filterMessagesForAI(messages: any[]): any[];
export declare function parseSmartReplies(geminiResponse: string): string[];
export declare function shouldShowSmartReply(message: {
    type: string;
}): boolean;
export declare function shouldShowToneEditor(text: string): boolean;
export declare function hasSensitiveContent(text: string): boolean;
export interface ContextMessage {
    role: 'user' | 'model';
    parts: [{
        text: string;
    }];
}
export declare class AiService {
    private readonly prisma;
    private botUserId;
    private userRateLimits;
    private groupRateLimits;
    private groq;
    private readonly MODEL;
    constructor(prisma: PrismaService);
    setBotUserId(id: number): void;
    getBotUserId(): number;
    checkRateLimit(userId: number): Promise<boolean>;
    recordRequest(userId: number): Promise<void>;
    checkGroupRateLimit(conversationId: number): boolean;
    recordGroupRequest(conversationId: number): void;
    buildContextFromMessages(messages: Array<{
        role: 'user' | 'model';
        content: string;
    }>, maxChars: number): ContextMessage[];
    buildContext(conversationId: number, maxMessages: number, maxChars?: number): Promise<ContextMessage[]>;
    private logGeminiCall;
    processMessage(params: {
        conversationId: number;
        content: string;
        userId: number;
        server: any;
        userSockets: Map<number, string[]>;
    }): Promise<void>;
    processGroupMention(params: {
        conversationId: number;
        question: string;
        userId: number;
        server: any;
    }): Promise<void>;
    getSmartReplies(params: {
        messageContent: string;
        userId: number;
    }): Promise<string[]>;
    editTone(params: {
        text: string;
        mode: 'polite' | 'grammar';
        userId: number;
    }): Promise<string>;
    private detectIntent;
    private callGemini;
    private callGeminiRaw;
    private saveBotMessage;
}

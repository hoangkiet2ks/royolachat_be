import { ChatService } from './chat.service';
export declare class UpdateGroupInfoDto {
    name?: string;
    avatar?: string;
}
export declare class ChatController {
    private readonly chatService;
    constructor(chatService: ChatService);
    getChatHistory(conversationId: number, user: any, limit?: string, offset?: string): Promise<({
        reactions: {
            id: number;
            createdAt: Date;
            userId: number;
            messageId: number;
            emoji: string;
        }[];
        sender: {
            id: number;
            name: string;
            avatar: string | null;
        };
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        type: import("../../generated/prisma/enums").MessageType;
        conversationId: number;
        content: string | null;
        fileUrl: string | null;
        isRecalled: boolean;
        replyToId: number | null;
        senderId: number;
        deletedByIds: number[];
        isPinned: boolean;
    })[]>;
    getOrCreateConversation(user: any, friendId: number): Promise<{
        id: number;
        name: string | null;
        avatar: string | null;
        createdAt: Date;
        updatedAt: Date;
        isGroup: boolean;
    }>;
    getConversationInfo(id: number, user: any): Promise<{
        id: number;
        isGroup: boolean;
        name: string;
        avatar: string | null;
        partnerId: number | undefined;
        myRole?: undefined;
        members?: undefined;
    } | {
        id: number;
        isGroup: boolean;
        name: string | null;
        avatar: string | null;
        myRole: import("../../generated/prisma/enums").MemberRole;
        members: {
            id: number;
            name: string;
            avatar: string | null;
            role: import("../../generated/prisma/enums").MemberRole;
        }[];
        partnerId?: undefined;
    } | null>;
    getConversations(user: any): Promise<{
        id: string;
        name: string | null;
        avatar: string | null;
        lastMsg: string;
        time: string;
        isGroup: boolean;
    }[]>;
    uploadChatFile(file: Express.Multer.File): Promise<{
        status: string;
        fileUrl: string;
        type: string;
        fileName: string;
    }>;
    createGroup(user: any, name: string, memberIds: number[]): Promise<{
        members: ({
            user: {
                id: number;
                name: string;
                avatar: string | null;
            };
        } & {
            id: number;
            userId: number;
            conversationId: number;
            role: import("../../generated/prisma/enums").MemberRole;
            joinedAt: Date;
            lastReadMessageId: number | null;
            clearedAt: Date | null;
        })[];
    } & {
        id: number;
        name: string | null;
        avatar: string | null;
        createdAt: Date;
        updatedAt: Date;
        isGroup: boolean;
    }>;
    requestAddMembers(conversationId: number, user: any, memberIds: number[]): Promise<{
        status: string;
        message: string;
        isDirectlyAdded: boolean;
    }>;
    getPendingRequests(conversationId: number, user: any): Promise<({
        user: {
            id: number;
            name: string;
            avatar: string | null;
        };
        inviter: {
            id: number;
            name: string;
            avatar: string | null;
        };
    } & {
        id: number;
        status: string;
        createdAt: Date;
        userId: number;
        conversationId: number;
        inviterId: number;
    })[]>;
    approveRequest(requestId: number, user: any): Promise<{
        status: string;
        message: string;
    }>;
    rejectRequest(requestId: number, user: any): Promise<{
        status: string;
        message: string;
    }>;
    kickMember(conversationId: number, user: any, targetUserId: number): Promise<{
        status: string;
        message: string;
    }>;
    assignRole(conversationId: number, user: any, targetUserId: number, role: string): Promise<{
        status: string;
        message: string;
    }>;
    disbandGroup(conversationId: number, user: any): Promise<{
        status: string;
        message: string;
    }>;
    updateGroupInfo(conversationId: number, user: any, body: UpdateGroupInfoDto): Promise<{
        status: string;
        message: string;
    }>;
    clearHistory(conversationId: string, req: any): Promise<{
        status: string;
        message: string;
    }>;
    leaveGroup(conversationId: string, req: any, newAdminId?: number): Promise<{
        status: string;
        message: string;
    }>;
    getPinnedMessages(conversationId: string): Promise<({
        sender: {
            id: number;
            name: string;
            avatar: string | null;
        };
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        type: import("../../generated/prisma/enums").MessageType;
        conversationId: number;
        content: string | null;
        fileUrl: string | null;
        isRecalled: boolean;
        replyToId: number | null;
        senderId: number;
        deletedByIds: number[];
        isPinned: boolean;
    })[]>;
}

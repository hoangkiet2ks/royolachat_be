import { PrismaService } from '../../shared/services/prisma.service';
export declare class ChatService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getUserConversations(userId: number): Promise<{
        conversationId: number;
    }[]>;
    getConversationMembers(conversationId: number): Promise<{
        id: number;
        name: string;
    }[]>;
    getUserById(userId: number): Promise<{
        id: number;
        name: string;
    } | null>;
    updateLastSeen(userId: number): Promise<{
        id: number;
        email: string;
        name: string;
        password: string;
        phoneNumber: string;
        avatar: string | null;
        banner: string | null;
        birthday: Date | null;
        appRole: import("../../generated/prisma/enums").AppRole;
        totpSecret: string | null;
        status: import("../../generated/prisma/enums").UserStatus;
        lastSeenAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    saveMessage(data: {
        senderId: number;
        conversationId: number;
        content?: string;
        fileUrl?: string;
        type: 'TEXT' | 'IMAGE' | 'FILE' | 'SYSTEM';
    }): Promise<{
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
    }>;
    getMessages(conversationId: number, userId: number, limit?: number, offset?: number): Promise<({
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
    getOrCreateOneToOneConversation(userId: number, friendId: number): Promise<{
        id: number;
        name: string | null;
        avatar: string | null;
        createdAt: Date;
        updatedAt: Date;
        isGroup: boolean;
    }>;
    getRecentConversations(userId: number): Promise<{
        id: string;
        name: string | null;
        avatar: string | null;
        lastMsg: string;
        time: string;
        isGroup: boolean;
    }[]>;
    getConversationInfo(conversationId: number, currentUserId: number): Promise<{
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
    uploadToS3(file: Express.Multer.File): Promise<string>;
    recallMessage(messageId: number, userId: number): Promise<{
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
    }>;
    deleteMessageForUser(messageId: number, userId: number): Promise<{
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
    }>;
    createGroupConversation(creatorId: number, groupName: string, memberIds: number[]): Promise<{
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
    private getUserRoleInGroup;
    requestAddMembers(conversationId: number, requesterId: number, newMemberIds: number[]): Promise<{
        status: string;
        message: string;
        isDirectlyAdded: boolean;
    }>;
    getPendingJoinRequests(conversationId: number, requesterId: number): Promise<({
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
    approveJoinRequest(requestId: number, requesterId: number): Promise<{
        id: number;
        userId: number;
        conversationId: number;
        role: import("../../generated/prisma/enums").MemberRole;
        joinedAt: Date;
        lastReadMessageId: number | null;
        clearedAt: Date | null;
    }>;
    rejectJoinRequest(requestId: number, requesterId: number): Promise<{
        id: number;
        status: string;
        createdAt: Date;
        userId: number;
        conversationId: number;
        inviterId: number;
    }>;
    kickMember(conversationId: number, requesterId: number, targetUserId: number): Promise<{
        id: number;
        userId: number;
        conversationId: number;
        role: import("../../generated/prisma/enums").MemberRole;
        joinedAt: Date;
        lastReadMessageId: number | null;
        clearedAt: Date | null;
    }>;
    assignRole(conversationId: number, requesterId: number, targetUserId: number, newRole: string): Promise<{
        id: number;
        userId: number;
        conversationId: number;
        role: import("../../generated/prisma/enums").MemberRole;
        joinedAt: Date;
        lastReadMessageId: number | null;
        clearedAt: Date | null;
    }>;
    disbandGroup(conversationId: number, requesterId: number): Promise<{
        id: number;
        name: string | null;
        avatar: string | null;
        createdAt: Date;
        updatedAt: Date;
        isGroup: boolean;
    }>;
    updateGroupInfo(conversationId: number, requesterId: number, data: {
        name?: string;
        avatar?: string;
    }): Promise<{
        id: number;
        name: string | null;
        avatar: string | null;
        createdAt: Date;
        updatedAt: Date;
        isGroup: boolean;
    }>;
    clearConversationHistory(conversationId: number, userId: number): Promise<void>;
    leaveGroup(conversationId: number, requesterId: number, newAdminId?: number): Promise<{
        status: string;
        message: string;
    }>;
    getPinnedMessages(conversationId: number): Promise<({
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
    togglePinMessage(messageId: number, conversationId: number, userId: number): Promise<{
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
    }>;
    toggleReaction(messageId: number, userId: number, emoji: string): Promise<{
        action: string;
        messageId: number;
        userId: number;
        emoji?: undefined;
    } | {
        action: string;
        messageId: number;
        userId: number;
        emoji: string;
    }>;
}

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
    updateLastSeen(userId: number): Promise<import("../../generated/prisma/internal/prismaNamespace").BatchPayload>;
    saveMessage(data: {
        senderId: number;
        conversationId: number;
        content?: string;
        fileUrl?: string;
        type: 'TEXT' | 'IMAGE' | 'FILE' | 'SYSTEM' | 'POLL';
        replyToId?: number;
        pollData?: {
            title: string;
            options: string[];
        };
    }): Promise<{
        poll: ({
            options: ({
                votes: {
                    id: number;
                    userId: number;
                    createdAt: Date;
                    pollId: number;
                    optionId: number;
                }[];
            } & {
                id: number;
                text: string;
                createdAt: Date;
                order: number;
                pollId: number;
            })[];
        } & {
            title: string;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            messageId: number;
        }) | null;
        replyTo: {
            id: number;
            content: string | null;
            type: import("../../generated/prisma/enums").MessageType;
            sender: {
                name: string;
            };
        } | null;
        reactions: {
            id: number;
            emoji: string;
            userId: number;
            createdAt: Date;
            messageId: number;
        }[];
        sender: {
            id: number;
            name: string;
            avatar: string | null;
        };
    } & {
        id: number;
        content: string | null;
        type: import("../../generated/prisma/enums").MessageType;
        createdAt: Date;
        updatedAt: Date;
        fileUrl: string | null;
        isRecalled: boolean;
        deletedByIds: number[];
        isPinned: boolean;
        replyToId: number | null;
        conversationId: number;
        senderId: number;
    }>;
    getMessages(conversationId: number, userId: number, limit?: number, offset?: number): Promise<({
        poll: ({
            options: ({
                votes: {
                    id: number;
                    userId: number;
                    createdAt: Date;
                    pollId: number;
                    optionId: number;
                }[];
            } & {
                id: number;
                text: string;
                createdAt: Date;
                order: number;
                pollId: number;
            })[];
        } & {
            title: string;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            messageId: number;
        }) | null;
        replyTo: {
            id: number;
            content: string | null;
            type: import("../../generated/prisma/enums").MessageType;
            sender: {
                name: string;
            };
        } | null;
        reactions: {
            id: number;
            emoji: string;
            userId: number;
            createdAt: Date;
            messageId: number;
        }[];
        sender: {
            id: number;
            name: string;
            avatar: string | null;
        };
    } & {
        id: number;
        content: string | null;
        type: import("../../generated/prisma/enums").MessageType;
        createdAt: Date;
        updatedAt: Date;
        fileUrl: string | null;
        isRecalled: boolean;
        deletedByIds: number[];
        isPinned: boolean;
        replyToId: number | null;
        conversationId: number;
        senderId: number;
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
        partnerIsBot: boolean;
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
        partnerIsBot?: undefined;
    } | null>;
    uploadToS3(file: Express.Multer.File): Promise<string>;
    recallMessage(messageId: number, userId: number): Promise<{
        id: number;
        content: string | null;
        type: import("../../generated/prisma/enums").MessageType;
        createdAt: Date;
        updatedAt: Date;
        fileUrl: string | null;
        isRecalled: boolean;
        deletedByIds: number[];
        isPinned: boolean;
        replyToId: number | null;
        conversationId: number;
        senderId: number;
    }>;
    deleteMessageForUser(messageId: number, userId: number): Promise<{
        id: number;
        content: string | null;
        type: import("../../generated/prisma/enums").MessageType;
        createdAt: Date;
        updatedAt: Date;
        fileUrl: string | null;
        isRecalled: boolean;
        deletedByIds: number[];
        isPinned: boolean;
        replyToId: number | null;
        conversationId: number;
        senderId: number;
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
            role: import("../../generated/prisma/enums").MemberRole;
            userId: number;
            conversationId: number;
            joinedAt: Date;
            clearedAt: Date | null;
            lastReadMessageId: number | null;
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
        userId: number;
        createdAt: Date;
        conversationId: number;
        inviterId: number;
    })[]>;
    approveJoinRequest(requestId: number, requesterId: number): Promise<{
        id: number;
        role: import("../../generated/prisma/enums").MemberRole;
        userId: number;
        conversationId: number;
        joinedAt: Date;
        clearedAt: Date | null;
        lastReadMessageId: number | null;
    }>;
    rejectJoinRequest(requestId: number, requesterId: number): Promise<{
        id: number;
        status: string;
        userId: number;
        createdAt: Date;
        conversationId: number;
        inviterId: number;
    }>;
    kickMember(conversationId: number, requesterId: number, targetUserId: number): Promise<{
        id: number;
        role: import("../../generated/prisma/enums").MemberRole;
        userId: number;
        conversationId: number;
        joinedAt: Date;
        clearedAt: Date | null;
        lastReadMessageId: number | null;
    }>;
    assignRole(conversationId: number, requesterId: number, targetUserId: number, newRole: string): Promise<{
        id: number;
        role: import("../../generated/prisma/enums").MemberRole;
        userId: number;
        conversationId: number;
        joinedAt: Date;
        clearedAt: Date | null;
        lastReadMessageId: number | null;
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
        content: string | null;
        type: import("../../generated/prisma/enums").MessageType;
        createdAt: Date;
        updatedAt: Date;
        fileUrl: string | null;
        isRecalled: boolean;
        deletedByIds: number[];
        isPinned: boolean;
        replyToId: number | null;
        conversationId: number;
        senderId: number;
    })[]>;
    togglePinMessage(messageId: number, conversationId: number, userId: number): Promise<{
        sender: {
            id: number;
            name: string;
            avatar: string | null;
        };
    } & {
        id: number;
        content: string | null;
        type: import("../../generated/prisma/enums").MessageType;
        createdAt: Date;
        updatedAt: Date;
        fileUrl: string | null;
        isRecalled: boolean;
        deletedByIds: number[];
        isPinned: boolean;
        replyToId: number | null;
        conversationId: number;
        senderId: number;
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
    votePoll(userId: number, pollId: number, optionId: number): Promise<({
        options: ({
            votes: {
                id: number;
                userId: number;
                createdAt: Date;
                pollId: number;
                optionId: number;
            }[];
        } & {
            id: number;
            text: string;
            createdAt: Date;
            order: number;
            pollId: number;
        })[];
    } & {
        title: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        messageId: number;
    }) | null>;
    addPollOption(userId: number, pollId: number, text: string): Promise<({
        options: ({
            votes: {
                id: number;
                userId: number;
                createdAt: Date;
                pollId: number;
                optionId: number;
            }[];
        } & {
            id: number;
            text: string;
            createdAt: Date;
            order: number;
            pollId: number;
        })[];
    } & {
        title: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        messageId: number;
    }) | null>;
}

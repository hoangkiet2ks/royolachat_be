import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { JwtService } from '@nestjs/jwt';
import { AiService } from '../ai/ai.service';
import { FriendRepository } from '../friend/friend.repo';
export declare class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly chatService;
    private readonly jwtService;
    private readonly aiService;
    private readonly friendRepo;
    server: Server;
    private userSockets;
    private activeCallParticipants;
    constructor(chatService: ChatService, jwtService: JwtService, aiService: AiService, friendRepo: FriendRepository);
    handleConnection(client: Socket): Promise<void>;
    handleDisconnect(client: Socket): void;
    handleMessage(client: Socket, payload: {
        conversationId: number;
        content?: string;
        fileUrl?: string;
        type: 'TEXT' | 'IMAGE' | 'FILE' | 'POLL';
        replyToId?: number;
        pollData?: {
            title: string;
            options: string[];
        };
    }): Promise<{
        status: string;
        message: string;
        data?: undefined;
    } | {
        status: string;
        data: {
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
        };
        message?: undefined;
    }>;
    handleAnalyzeGroupImage(client: Socket, payload: {
        conversationId: number;
        imageUrl: string;
        task: 'describe' | 'ocr' | 'analyze';
    }): Promise<{
        status: string;
        message: string;
    } | {
        status: string;
        message?: undefined;
    }>;
    handleCheckOnlineStatus(client: Socket, partnerId: number): void;
    handleRecallMessage(client: Socket, payload: {
        messageId: number;
        conversationId: number;
    }): Promise<{
        status: string;
        message?: undefined;
    } | {
        status: string;
        message: string;
    }>;
    handleDeleteMessage(client: Socket, messageId: number): Promise<{
        status: string;
        messageId: number;
        message?: undefined;
    } | {
        status: string;
        message: string;
        messageId?: undefined;
    }>;
    handleCallInitiate(client: Socket, payload: {
        targetUserId?: number;
        conversationId: number;
        callType: 'audio' | 'video';
        callerName: string;
        callerAvatar?: string;
        isGroup?: boolean;
    }): Promise<boolean | undefined>;
    handleCallAnswer(client: Socket, payload: {
        callerId: number;
        accepted: boolean;
        conversationId: number;
        answererName?: string;
        isGroup?: boolean;
    }): Promise<void>;
    handleOffer(client: Socket, payload: {
        targetUserId: number;
        offer: RTCSessionDescriptionInit;
    }): void;
    handleWebRTCAnswer(client: Socket, payload: {
        callerId: number;
        answer: RTCSessionDescriptionInit;
    }): void;
    handleIceCandidate(client: Socket, payload: {
        targetUserId: number;
        candidate: RTCIceCandidateInit;
    }): void;
    handleCallEnd(client: Socket, payload: {
        targetUserId: number;
        conversationId?: number;
    }): void;
    handleCallReject(client: Socket, payload: {
        callerId: number;
    }): void;
    private broadcastSystemMessage;
    handleSwitchToVideo(client: Socket, payload: {
        targetUserId: number;
    }): void;
    notifyFriendRequest(receiverId: number, requester: {
        id: number;
        name: string;
        avatar: string | null;
    }): void;
    notifyBlocked(targetId: number, blockerId: number): void;
    notifyUnblocked(targetId: number, unblockerId: number): void;
    handleTogglePin(client: Socket, payload: {
        messageId: number;
        conversationId: number;
    }): Promise<{
        status: string;
        message?: undefined;
    } | {
        status: string;
        message: any;
    }>;
    handleToggleReaction(client: Socket, payload: {
        messageId: number;
        conversationId: number;
        emoji: string;
    }): Promise<void>;
    handleTyping(client: Socket, payload: {
        conversationId: number;
        userName: string;
    }): void;
    handleStopTyping(client: Socket, payload: {
        conversationId: number;
    }): void;
    handleVotePoll(client: Socket, payload: {
        conversationId: number;
        pollId: number;
        optionId: number;
    }): Promise<void>;
    handleAddPollOption(client: Socket, payload: {
        conversationId: number;
        pollId: number;
        text: string;
    }): Promise<void>;
}

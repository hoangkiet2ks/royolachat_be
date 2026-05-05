import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { JwtService } from '@nestjs/jwt';
import { AiService } from '../ai/ai.service';
export declare class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly chatService;
    private readonly jwtService;
    private readonly aiService;
    server: Server;
    private userSockets;
    private activeCallParticipants;
    constructor(chatService: ChatService, jwtService: JwtService, aiService: AiService);
    handleConnection(client: Socket): Promise<void>;
    handleDisconnect(client: Socket): void;
    handleMessage(client: Socket, payload: {
        conversationId: number;
        content?: string;
        fileUrl?: string;
        type: 'TEXT' | 'IMAGE' | 'FILE';
    }): Promise<{
        status: string;
        data: {
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
        };
        message?: undefined;
    } | {
        status: string;
        message: string;
        data?: undefined;
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
}

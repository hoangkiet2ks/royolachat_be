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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const chat_service_1 = require("./chat.service");
const jwt_1 = require("@nestjs/jwt");
const ai_service_1 = require("../ai/ai.service");
let ChatGateway = class ChatGateway {
    constructor(chatService, jwtService, aiService) {
        this.chatService = chatService;
        this.jwtService = jwtService;
        this.aiService = aiService;
        this.userSockets = new Map();
        this.activeCallParticipants = new Map();
    }
    async handleConnection(client) {
        try {
            const token = client.handshake.auth.token?.split(' ')[1] || client.handshake.headers.authorization?.split(' ')[1];
            console.log('[Socket] Client kết nối:', client.id);
            console.log('[Socket] Auth token có không:', !!token);
            if (!token) {
                console.log('[Socket] KHÔNG CÓ TOKEN - ngắt kết nối');
                client.disconnect();
                return;
            }
            const payload = this.jwtService.decode(token);
            console.log('[Socket] Payload decode:', payload ? `userId=${payload.userId}` : 'NULL');
            if (!payload)
                throw new Error('Token không hợp lệ');
            const userId = payload.userId;
            if (!userId)
                throw new Error('Không tìm thấy userId trong token');
            client.data.userId = userId;
            const userDeviceSockets = this.userSockets.get(userId) || [];
            userDeviceSockets.push(client.id);
            this.userSockets.set(userId, userDeviceSockets);
            const conversations = await this.chatService.getUserConversations(userId);
            conversations.forEach(conv => {
                client.join(`conversation_${conv.conversationId}`);
            });
            console.log(`[Socket] User ${userId} ĐÃ KẾT NỐI THÀNH CÔNG!`);
            this.server.emit('userOnline', { userId });
        }
        catch (error) {
            console.log('Lỗi Socket:', error.message);
            client.disconnect();
        }
    }
    handleDisconnect(client) {
        const userId = client.data.userId;
        if (!userId)
            return;
        const sockets = this.userSockets.get(userId);
        if (sockets) {
            const index = sockets.indexOf(client.id);
            if (index !== -1) {
                sockets.splice(index, 1);
                if (sockets.length === 0) {
                    this.userSockets.delete(userId);
                    this.chatService.updateLastSeen(userId);
                    this.server.emit('userOffline', { userId, lastSeenAt: new Date() });
                }
            }
        }
        console.log(`[Socket] Client ${client.id} đã ngắt kết nối`);
    }
    async handleMessage(client, payload) {
        try {
            const userId = client.data.userId;
            if (!userId)
                throw new Error('Chưa xác thực');
            const savedMessage = await this.chatService.saveMessage({
                senderId: userId,
                conversationId: payload.conversationId,
                content: payload.content,
                fileUrl: payload.fileUrl,
                type: payload.type || 'TEXT',
            });
            const conversationInfo = await this.chatService.getConversationInfo(payload.conversationId, userId);
            if (conversationInfo && conversationInfo.members) {
                conversationInfo.members.forEach(member => {
                    const memberSockets = this.userSockets.get(member.id);
                    if (memberSockets) {
                        memberSockets.forEach(socketId => {
                            this.server.to(socketId).emit('newMessage', savedMessage);
                        });
                    }
                });
            }
            else if (!conversationInfo?.isGroup) {
                const partnerSockets = this.userSockets.get(conversationInfo?.partnerId);
                partnerSockets?.forEach(socketId => this.server.to(socketId).emit('newMessage', savedMessage));
                const mySockets = this.userSockets.get(userId);
                mySockets?.forEach(socketId => this.server.to(socketId).emit('newMessage', savedMessage));
            }
            if (payload.type === 'TEXT' && payload.content) {
                const content = payload.content;
                if (!conversationInfo?.isGroup && conversationInfo?.partnerIsBot) {
                    const userSocketIds = this.userSockets.get(userId) || [];
                    userSocketIds.forEach(sid => this.server.to(sid).emit('botTyping', { conversationId: payload.conversationId }));
                    setImmediate(() => {
                        this.aiService.processMessage({
                            conversationId: payload.conversationId,
                            content,
                            userId,
                            server: this.server,
                            userSockets: this.userSockets,
                        }).catch(err => console.error('[Gateway] processMessage error:', err));
                    });
                }
                if (conversationInfo?.isGroup && (0, ai_service_1.isBotMention)(content)) {
                    if (!this.aiService.checkGroupRateLimit(payload.conversationId)) {
                        const userSocketIds = this.userSockets.get(userId) || [];
                        userSocketIds.forEach(sid => this.server.to(sid).emit('botRateLimit', {
                            message: 'Bot đang xử lý yêu cầu trước, vui lòng đợi 3 giây.',
                        }));
                    }
                    else {
                        this.aiService.recordGroupRequest(payload.conversationId);
                        const question = (0, ai_service_1.extractMentionContent)(content);
                        this.server.to(`conversation_${payload.conversationId}`).emit('botTyping', { conversationId: payload.conversationId });
                        setImmediate(() => {
                            this.aiService.processGroupMention({
                                conversationId: payload.conversationId,
                                question,
                                userId,
                                server: this.server,
                            }).catch(err => console.error('[Gateway] processGroupMention error:', err));
                        });
                    }
                }
            }
            return { status: 'success', data: savedMessage };
        }
        catch (error) {
            console.error(error);
            return { status: 'error', message: 'Không thể gửi tin nhắn' };
        }
    }
    handleCheckOnlineStatus(client, partnerId) {
        const isOnline = this.userSockets.has(partnerId) && (this.userSockets.get(partnerId)?.length || 0) > 0;
        client.emit('statusAnswer', { partnerId, isOnline });
    }
    async handleRecallMessage(client, payload) {
        try {
            const userId = client.data.userId;
            if (!userId)
                throw new Error('Chưa xác thực');
            await this.chatService.recallMessage(payload.messageId, userId);
            this.server.to(`conversation_${payload.conversationId}`).emit('messageRecalled', {
                messageId: payload.messageId
            });
            return { status: 'success' };
        }
        catch (error) {
            console.error('Lỗi thu hồi tin nhắn:', error);
            return { status: 'error', message: 'Không thể thu hồi tin nhắn' };
        }
    }
    async handleDeleteMessage(client, messageId) {
        try {
            const userId = client.data.userId;
            if (!userId)
                throw new Error('Chưa xác thực');
            await this.chatService.deleteMessageForUser(messageId, userId);
            return { status: 'success', messageId };
        }
        catch (error) {
            return { status: 'error', message: 'Không thể xóa tin nhắn' };
        }
    }
    async handleCallInitiate(client, payload) {
        const callerId = client.data.userId;
        if (payload.isGroup) {
            console.log(`[Call Group] User ${callerId} khởi tạo group call, conversationId: ${payload.conversationId}`);
            try {
                const members = await this.chatService.getConversationMembers(payload.conversationId);
                if (!this.activeCallParticipants.has(payload.conversationId)) {
                    this.activeCallParticipants.set(payload.conversationId, new Map());
                }
                this.activeCallParticipants.get(payload.conversationId).set(callerId, {
                    name: payload.callerName,
                    avatar: payload.callerAvatar || null,
                });
                await this.broadcastSystemMessage(payload.conversationId, callerId, ` ${payload.callerName} đã bắt đầu cuộc gọi nhóm`);
                members.forEach(member => {
                    if (member.id === callerId)
                        return;
                    const sockets = this.userSockets.get(member.id);
                    sockets?.forEach(socketId => {
                        this.server.to(socketId).emit('call:incoming', {
                            callerId,
                            callerName: payload.callerName,
                            callType: payload.callType,
                            conversationId: payload.conversationId,
                            isGroup: true,
                        });
                    });
                });
            }
            catch (err) {
                console.error('[Call Group] Error:', err);
            }
        }
        else {
            console.log(`[Call 1-1] User ${callerId} gọi ${payload.targetUserId}`);
            const targetSockets = this.userSockets.get(payload.targetUserId);
            if (!targetSockets || targetSockets.length === 0) {
                return client.emit('call:unavailable', { targetUserId: payload.targetUserId });
            }
            targetSockets.forEach(socketId => {
                this.server.to(socketId).emit('call:incoming', {
                    callerId,
                    callerName: payload.callerName,
                    callerAvatar: payload.callerAvatar,
                    callType: payload.callType,
                    conversationId: payload.conversationId,
                    isGroup: false,
                });
            });
        }
    }
    async handleCallAnswer(client, payload) {
        const answererId = client.data.userId;
        if (payload.isGroup) {
            try {
                const members = await this.chatService.getConversationMembers(payload.conversationId);
                if (payload.accepted) {
                    const callParticipants = this.activeCallParticipants.get(payload.conversationId);
                    if (callParticipants) {
                        callParticipants.set(answererId, {
                            name: payload.answererName || `User ${answererId}`,
                            avatar: null,
                        });
                        await this.broadcastSystemMessage(payload.conversationId, answererId, `${payload.answererName || `User ${answererId}`} đã tham gia cuộc gọi`);
                        const currentParticipantsList = Array.from(callParticipants.entries())
                            .filter(([uid]) => uid !== answererId)
                            .map(([uid, info]) => ({ userId: uid, name: info.name, avatar: info.avatar }));
                        console.log(`[Call Group] Sending current-participants to ${answererId}:`, currentParticipantsList.map(p => p.userId));
                        const answererSockets = this.userSockets.get(answererId);
                        answererSockets?.forEach(socketId => {
                            this.server.to(socketId).emit('call:current-participants', {
                                participants: currentParticipantsList,
                            });
                        });
                    }
                }
                members.forEach(member => {
                    if (member.id === answererId)
                        return;
                    const sockets = this.userSockets.get(member.id);
                    sockets?.forEach(socketId => {
                        this.server.to(socketId).emit('call:user-joined', {
                            userId: answererId,
                            name: payload.answererName || `User ${answererId}`,
                            accepted: payload.accepted,
                        });
                    });
                });
            }
            catch (err) {
                console.error('[Call Group] answer error:', err);
            }
        }
        else {
            const callerSockets = this.userSockets.get(payload.callerId);
            callerSockets?.forEach(socketId => {
                this.server.to(socketId).emit('call:answered', {
                    accepted: payload.accepted,
                    answererId,
                    answererName: payload.answererName,
                });
            });
        }
    }
    handleOffer(client, payload) {
        const callerId = client.data.userId;
        const targetSockets = this.userSockets.get(payload.targetUserId);
        targetSockets?.forEach(socketId => {
            this.server.to(socketId).emit('call:offer', { offer: payload.offer, callerId });
        });
    }
    handleWebRTCAnswer(client, payload) {
        const answererId = client.data.userId;
        const callerSockets = this.userSockets.get(payload.callerId);
        callerSockets?.forEach(socketId => {
            this.server.to(socketId).emit('call:webrtc-answer', { answer: payload.answer, answererId });
        });
    }
    handleIceCandidate(client, payload) {
        const fromUserId = client.data.userId;
        const targetSockets = this.userSockets.get(payload.targetUserId);
        targetSockets?.forEach(socketId => {
            this.server.to(socketId).emit('call:ice-candidate', { candidate: payload.candidate, fromUserId });
        });
    }
    handleCallEnd(client, payload) {
        const fromUserId = client.data.userId;
        if (payload.conversationId) {
            const callParticipants = this.activeCallParticipants.get(payload.conversationId);
            if (callParticipants) {
                callParticipants.delete(fromUserId);
                if (callParticipants.size === 0) {
                    this.activeCallParticipants.delete(payload.conversationId);
                }
            }
        }
        const targetSockets = this.userSockets.get(payload.targetUserId);
        targetSockets?.forEach(socketId => {
            this.server.to(socketId).emit('call:ended', { fromUserId });
        });
    }
    handleCallReject(client, payload) {
        const rejecterId = client.data.userId;
        const callerSockets = this.userSockets.get(payload.callerId);
        callerSockets?.forEach(socketId => {
            this.server.to(socketId).emit('call:rejected', { rejecterId });
        });
    }
    async broadcastSystemMessage(conversationId, senderId, content) {
        try {
            const msg = await this.chatService.saveMessage({
                senderId,
                conversationId,
                content,
                type: 'SYSTEM',
            });
            this.server.to(`conversation_${conversationId}`).emit('newMessage', msg);
        }
        catch (err) {
            console.error('[SystemMsg] Error:', err);
        }
    }
    handleSwitchToVideo(client, payload) {
        const fromUserId = client.data.userId;
        const targetSockets = this.userSockets.get(payload.targetUserId);
        targetSockets?.forEach(socketId => {
            this.server.to(socketId).emit('call:switch-to-video', { fromUserId });
        });
    }
    notifyFriendRequest(receiverId, requester) {
        const receiverSockets = this.userSockets.get(receiverId);
        if (receiverSockets && receiverSockets.length > 0) {
            receiverSockets.forEach(socketId => {
                this.server.to(socketId).emit('friend:request-received', {
                    requesterId: requester.id,
                    requesterName: requester.name,
                    requesterAvatar: requester.avatar,
                    timestamp: new Date(),
                });
            });
            console.log(`[Friend] Sent friend request notification to user ${receiverId} from ${requester.name}`);
        }
    }
    async handleTogglePin(client, payload) {
        try {
            const userId = client.data.userId;
            if (!userId)
                throw new Error('Chưa xác thực');
            const updatedMessage = await this.chatService.togglePinMessage(payload.messageId, payload.conversationId, userId);
            this.server.to(`conversation_${payload.conversationId}`).emit('pinUpdated', updatedMessage);
            return { status: 'success' };
        }
        catch (error) {
            return { status: 'error', message: error.message };
        }
    }
    async handleToggleReaction(client, payload) {
        try {
            const userId = client.data.userId;
            if (!userId)
                throw new Error('Chưa xác thực');
            const result = await this.chatService.toggleReaction(payload.messageId, userId, payload.emoji);
            this.server.to(`conversation_${payload.conversationId}`).emit('reactionUpdated', result);
        }
        catch (error) {
            console.error('Lỗi thả reaction:', error.message);
        }
    }
};
exports.ChatGateway = ChatGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], ChatGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('sendMessage'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('checkOnlineStatus'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Number]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "handleCheckOnlineStatus", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('recallMessage'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleRecallMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('deleteMessage'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Number]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleDeleteMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('call:initiate'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleCallInitiate", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('call:answer'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleCallAnswer", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('call:offer'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "handleOffer", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('call:webrtc-answer'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "handleWebRTCAnswer", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('call:ice-candidate'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "handleIceCandidate", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('call:end'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "handleCallEnd", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('call:reject'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "handleCallReject", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('call:switch-to-video'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "handleSwitchToVideo", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('togglePin'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleTogglePin", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('toggleReaction'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleToggleReaction", null);
exports.ChatGateway = ChatGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: true,
            credentials: true,
        },
        namespace: '/chat',
        transports: ['polling', 'websocket'],
        allowEIO3: true,
        pingTimeout: 60000,
        pingInterval: 25000,
    }),
    __metadata("design:paramtypes", [chat_service_1.ChatService,
        jwt_1.JwtService,
        ai_service_1.AiService])
], ChatGateway);
//# sourceMappingURL=chat.gateway.js.map
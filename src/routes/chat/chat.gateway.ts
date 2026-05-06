import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { JwtService } from '@nestjs/jwt';
import { AiService, isBotMention, extractMentionContent } from '../ai/ai.service';

@WebSocketGateway({
  cors: {
    origin: '*',
    credentials: true,
  },
  namespace: '/chat',
  transports: ['polling', 'websocket'],
  allowEIO3: true,
  pingTimeout: 60000,
  pingInterval: 25000,
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server!: Server;

  private userSockets = new Map<number, string[]>();
  // Track active group call participants: conversationId -> Map<userId, { name, avatar }>
  private activeCallParticipants = new Map<number, Map<number, { name: string; avatar?: string | null }>>();

  constructor(
    private readonly chatService: ChatService,
    private readonly jwtService: JwtService,
    private readonly aiService: AiService,
  ) {}

  async handleConnection(client: Socket) {
    try {
      const token = client.handshake.auth.token?.split(' ')[1] || client.handshake.headers.authorization?.split(' ')[1];
      
      console.log('[Socket] Client kết nối:', client.id);
      console.log('[Socket] Auth token có không:', !!token);
      
      if (!token) {
        console.log('[Socket] KHÔNG CÓ TOKEN - ngắt kết nối');
        client.disconnect();
        return;
      }

      const payload: any = this.jwtService.decode(token);
      console.log('[Socket] Payload decode:', payload ? `userId=${payload.userId}` : 'NULL');
      
      if (!payload) throw new Error('Token không hợp lệ');

      const userId = payload.userId; 
      if (!userId) throw new Error('Không tìm thấy userId trong token');

      // Gắn ID vào client để dùng cho việc gửi tin nhắn sau này
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

    } catch (error: any) {
      console.log('Lỗi Socket:', error.message);
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    const userId = client.data.userId;
    if (!userId) return;

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

  @SubscribeMessage('sendMessage')
  async handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: { conversationId: number; content?: string; fileUrl?: string; type: 'TEXT' | 'IMAGE' | 'FILE' }
  ) {
    try {
      const userId = client.data.userId as number;
      if (!userId) throw new Error('Chưa xác thực');

      // 1. Lưu vào Database
      const savedMessage = await this.chatService.saveMessage({
        senderId: userId,
        conversationId: payload.conversationId,
        content: payload.content,
        fileUrl: payload.fileUrl,
        type: payload.type || 'TEXT',
      });

      // 2. Lấy thông tin conversation
      const conversationInfo = await this.chatService.getConversationInfo(payload.conversationId, userId);
      
      // 3. Broadcast tin nhắn tới tất cả members
      if (conversationInfo && conversationInfo.members) {
        conversationInfo.members.forEach(member => {
          const memberSockets = this.userSockets.get(member.id);
          if (memberSockets) {
            memberSockets.forEach(socketId => {
              this.server.to(socketId).emit('newMessage', savedMessage);
            });
          }
        });
      } else if (!conversationInfo?.isGroup) {
        const partnerSockets = this.userSockets.get(conversationInfo?.partnerId as number);
        partnerSockets?.forEach(socketId => this.server.to(socketId).emit('newMessage', savedMessage));
        const mySockets = this.userSockets.get(userId);
        mySockets?.forEach(socketId => this.server.to(socketId).emit('newMessage', savedMessage));
      }

      // 4. AI Bot handling — non-blocking via setImmediate
      if (payload.type === 'TEXT' && payload.content) {
        const content = payload.content;

        // 4a. Chat 1-1 với bot
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

        // 4b. @RoyolaBot mention trong group
        if (conversationInfo?.isGroup && isBotMention(content)) {
          if (!this.aiService.checkGroupRateLimit(payload.conversationId)) {
            const userSocketIds = this.userSockets.get(userId) || [];
            userSocketIds.forEach(sid => this.server.to(sid).emit('botRateLimit', {
              message: 'Bot đang xử lý yêu cầu trước, vui lòng đợi 3 giây.',
            }));
          } else {
            this.aiService.recordGroupRequest(payload.conversationId);
            const question = extractMentionContent(content);
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
    } catch (error) {
      console.error(error);
      return { status: 'error', message: 'Không thể gửi tin nhắn' };
    }
  }
  // HÀM Trả lời Frontend khi nó hỏi trạng thái của 1 người cụ thể
  @SubscribeMessage('checkOnlineStatus')
  handleCheckOnlineStatus(
    @ConnectedSocket() client: Socket,
    @MessageBody() partnerId: number
  ) {
    // Kiểm tra xem partnerId có đang nằm trong danh sách các socket đang kết nối không
    const isOnline = this.userSockets.has(partnerId) && (this.userSockets.get(partnerId)?.length || 0) > 0;
    
    // Bắn câu trả lời về chỉ cho riêng cái tab vừa hỏi
    client.emit('statusAnswer', { partnerId, isOnline });
  }

// HÀM QUAN TRỌNG: LẮNG NGHE LỆNH THU HỒI TỪ FRONTEND
  @SubscribeMessage('recallMessage')
  async handleRecallMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: { messageId: number; conversationId: number }
  ) {
    try {
      const userId = client.data.userId;
      if (!userId) throw new Error('Chưa xác thực');

      // 1. Cập nhật vào DB
      await this.chatService.recallMessage(payload.messageId, userId);

      // 2. Phóng sự kiện cho cả 2 màn hình để nó chuyển thành chữ "Tin nhắn đã được thu hồi"
      this.server.to(`conversation_${payload.conversationId}`).emit('messageRecalled', {
        messageId: payload.messageId
      });

      return { status: 'success' };
    } catch (error) {
      console.error('Lỗi thu hồi tin nhắn:', error);
      return { status: 'error', message: 'Không thể thu hồi tin nhắn' };
    }
  }
  
  // HÀM MỚI: Lắng nghe Frontend gọi lệnh xóa
  @SubscribeMessage('deleteMessage')
  async handleDeleteMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() messageId: number
  ) {
    try {
      const userId = client.data.userId;
      if (!userId) throw new Error('Chưa xác thực');

      // Cập nhật Database
      await this.chatService.deleteMessageForUser(messageId, userId);

      // Trả lời lại cho ĐÚNG CÁI TAB VỪA BẤM XÓA (để nó ẩn khỏi màn hình)
      return { status: 'success', messageId };
    } catch (error) {
      return { status: 'error', message: 'Không thể xóa tin nhắn' };
    }
  }

  // ==========================================
  // WEBRTC SIGNALING - GỌI ĐIỆN / VIDEO CALL
  // ==========================================

  @SubscribeMessage('call:initiate')
  async handleCallInitiate(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: { 
      targetUserId?: number;   // 1-1
      conversationId: number; 
      callType: 'audio' | 'video'; 
      callerName: string;
      callerAvatar?: string;
      isGroup?: boolean;
    }
  ) {
    const callerId = client.data.userId;

    if (payload.isGroup) {
      // ---- GROUP CALL ----
      console.log(`[Call Group] User ${callerId} khởi tạo group call, conversationId: ${payload.conversationId}`);
      try {
        const members = await this.chatService.getConversationMembers(payload.conversationId);

        // Khởi tạo danh sách participants với caller
        if (!this.activeCallParticipants.has(payload.conversationId)) {
          this.activeCallParticipants.set(payload.conversationId, new Map());
        }
        this.activeCallParticipants.get(payload.conversationId)!.set(callerId, {
          name: payload.callerName,
          avatar: payload.callerAvatar || null,
        });

        // System message: bắt đầu cuộc gọi
        await this.broadcastSystemMessage(
          payload.conversationId,
          callerId,
          ` ${payload.callerName} đã bắt đầu cuộc gọi nhóm`,
        );

        members.forEach(member => {
          if (member.id === callerId) return;
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
      } catch (err) {
        console.error('[Call Group] Error:', err);
      }
    } else {
      // ---- 1-1 CALL ----
      console.log(`[Call 1-1] User ${callerId} gọi ${payload.targetUserId}`);
      const targetSockets = this.userSockets.get(payload.targetUserId!);
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

  @SubscribeMessage('call:answer')
  async handleCallAnswer(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: { 
      callerId: number; 
      accepted: boolean; 
      conversationId: number;
      answererName?: string;
      isGroup?: boolean;
    }
  ) {
    const answererId = client.data.userId;

    if (payload.isGroup) {
      // Group: thông báo cho tất cả members đang trong cuộc gọi
      try {
        const members = await this.chatService.getConversationMembers(payload.conversationId);

        if (payload.accepted) {
          // Thêm người mới vào danh sách active participants
          const callParticipants = this.activeCallParticipants.get(payload.conversationId);
          if (callParticipants) {
            callParticipants.set(answererId, {
              name: payload.answererName || `User ${answererId}`,
              avatar: null,
            });

            // System message: có người tham gia
            await this.broadcastSystemMessage(
              payload.conversationId,
              answererId,
              `${payload.answererName || `User ${answererId}`} đã tham gia cuộc gọi`,
            );

            // Gửi danh sách người đang trong call cho người mới join
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

        // Thông báo cho tất cả members khác về người mới join/từ chối
        members.forEach(member => {
          if (member.id === answererId) return;
          const sockets = this.userSockets.get(member.id);
          sockets?.forEach(socketId => {
            this.server.to(socketId).emit('call:user-joined', {
              userId: answererId,
              name: payload.answererName || `User ${answererId}`,
              accepted: payload.accepted,
            });
          });
        });
      } catch (err) {
        console.error('[Call Group] answer error:', err);
      }
    } else {
      // 1-1
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

  @SubscribeMessage('call:offer')
  handleOffer(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: { targetUserId: number; offer: RTCSessionDescriptionInit }
  ) {
    const callerId = client.data.userId;
    const targetSockets = this.userSockets.get(payload.targetUserId);
    targetSockets?.forEach(socketId => {
      this.server.to(socketId).emit('call:offer', { offer: payload.offer, callerId });
    });
  }

  @SubscribeMessage('call:webrtc-answer')
  handleWebRTCAnswer(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: { callerId: number; answer: RTCSessionDescriptionInit }
  ) {
    const answererId = client.data.userId;
    const callerSockets = this.userSockets.get(payload.callerId);
    callerSockets?.forEach(socketId => {
      this.server.to(socketId).emit('call:webrtc-answer', { answer: payload.answer, answererId });
    });
  }

  @SubscribeMessage('call:ice-candidate')
  handleIceCandidate(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: { targetUserId: number; candidate: RTCIceCandidateInit }
  ) {
    const fromUserId = client.data.userId;
    const targetSockets = this.userSockets.get(payload.targetUserId);
    targetSockets?.forEach(socketId => {
      this.server.to(socketId).emit('call:ice-candidate', { candidate: payload.candidate, fromUserId });
    });
  }

  @SubscribeMessage('call:end')
  handleCallEnd(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: { targetUserId: number; conversationId?: number }
  ) {
    const fromUserId = client.data.userId;

    // Cleanup active call participants nếu có conversationId
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

  @SubscribeMessage('call:reject')
  handleCallReject(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: { callerId: number }
  ) {
    const rejecterId = client.data.userId;
    const callerSockets = this.userSockets.get(payload.callerId);
    callerSockets?.forEach(socketId => {
      this.server.to(socketId).emit('call:rejected', { rejecterId });
    });
  }

  // Helper: Lưu system message và broadcast cho tất cả members trong conversation
  private async broadcastSystemMessage(conversationId: number, senderId: number, content: string) {
    try {
      const msg = await this.chatService.saveMessage({
        senderId,
        conversationId,
        content,
        type: 'SYSTEM',
      });
      // Broadcast tới room conversation
      this.server.to(`conversation_${conversationId}`).emit('newMessage', msg);
    } catch (err) {
      console.error('[SystemMsg] Error:', err);
    }
  }

  @SubscribeMessage('call:switch-to-video')
  handleSwitchToVideo(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: { targetUserId: number }
  ) {
    const fromUserId = client.data.userId;
    const targetSockets = this.userSockets.get(payload.targetUserId);
    targetSockets?.forEach(socketId => {
      this.server.to(socketId).emit('call:switch-to-video', { fromUserId });
    });
  }

  /**
   * Gửi thông báo lời mời kết bạn realtime
   * Method này được gọi từ FriendService
   */
  notifyFriendRequest(receiverId: number, requester: { id: number; name: string; avatar: string | null }) {
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
  
  //Sự kiện 1 người ghim thì cả nhóm đều thấy
  @SubscribeMessage('togglePin')
  async handleTogglePin(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: { messageId: number; conversationId: number }
  ) {
    try {
      const userId = client.data.userId;
      if (!userId) throw new Error('Chưa xác thực');

      // Chạy hàm ghim ở Service
      const updatedMessage = await this.chatService.togglePinMessage(payload.messageId, payload.conversationId, userId);

      // Phóng sự kiện 'pinUpdated' cho tất cả mọi người trong phòng
      this.server.to(`conversation_${payload.conversationId}`).emit('pinUpdated', updatedMessage);

      return { status: 'success' };
    } catch (error: any) {
      // Trả về lỗi nếu vượt quá 5 tin nhắn
      return { status: 'error', message: error.message };
    }
  }

  // Thả cảm xúc trên tin nhắn
  @SubscribeMessage('toggleReaction')
  async handleToggleReaction(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: { messageId: number; conversationId: number; emoji: string }
  ) {
    try {
      const userId = client.data.userId;
      if (!userId) throw new Error('Chưa xác thực');

      // Chạy logic ở Service
      const result = await this.chatService.toggleReaction(payload.messageId, userId, payload.emoji);

      // Phát loa thông báo cho cả phòng biết
      this.server.to(`conversation_${payload.conversationId}`).emit('reactionUpdated', result);

    } catch (error: any) {
      console.error('Lỗi thả reaction:', error.message);
    }
  }

}

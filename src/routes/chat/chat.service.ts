import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../shared/services/prisma.service';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

@Injectable()
export class ChatService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserConversations(userId: number) {
    return this.prisma.conversationMember.findMany({
      where: { userId },
      select: { conversationId: true },
    });
  }

  async getConversationMembers(conversationId: number) {
    const members = await this.prisma.conversationMember.findMany({
      where: { conversationId },
      include: { user: { select: { id: true, name: true } } },
    });
    return members.map(m => ({ id: m.user.id, name: m.user.name }));
  }

  async getUserById(userId: number) {
    return this.prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true },
    });
  }

  async updateLastSeen(userId: number) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { lastSeenAt: new Date() }
    });
  }

  async saveMessage(data: { senderId: number; conversationId: number; content?: string; fileUrl?: string; type: 'TEXT' | 'IMAGE' | 'FILE' | 'SYSTEM' }) {
    return this.prisma.message.create({
      data: {
        senderId: data.senderId,
        conversationId: data.conversationId,
        content: data.content,
        fileUrl: data.fileUrl,
        type: data.type,
      },
      include: {
        sender: { select: { id: true, name: true, avatar: true } }
      }
    });
  }

// ĐÃ NÂNG CẤP CHUẨN ZALO: Sắp xếp xuôi dòng thời gian
  async getMessages(conversationId: number, userId: number, limit: number = 50, offset: number = 0) {
    const memberInfo = await this.prisma.conversationMember.findUnique({
      where: {
        userId_conversationId: {
          conversationId: conversationId,
          userId: userId,
        }
      },
    });

    if (!memberInfo) {
      throw new Error('Bạn không có quyền xem tin nhắn nhóm này');
    }

    const whereCondition: any = {
      conversationId: conversationId,
      NOT: { deletedByIds: { has: userId } } 
    };

    if (memberInfo.clearedAt) {
      whereCondition.createdAt = {
        gt: memberInfo.clearedAt, 
      };
    }

    // BƯỚC 1: Bắt buộc dùng 'desc' để móc ra được 50 tin nhắn GẦN ĐÂY NHẤT
    const messages = await this.prisma.message.findMany({
      where: whereCondition,
      take: limit,
      skip: offset,
      orderBy: { createdAt: 'desc' }, 
      include: {
        sender: { select: { id: true, name: true, avatar: true } },
        reactions: true,
      }
    });

    // BƯỚC 2: ĐẢO NGƯỢC MẢNG (REVERSE) TRƯỚC KHI TRẢ VỀ FRONTEND
    // Bước này biến danh sách từ [Mới -> Cũ] thành [Cũ -> Mới]
    // Giúp khung chat hiển thị xuôi dòng thời gian và khớp hoàn toàn với Socket!
    return messages.reverse();
  }

  async getOrCreateOneToOneConversation(userId: number, friendId: number) {
    const userConversations = await this.prisma.conversation.findMany({
      where: { isGroup: false, members: { some: { userId: userId } } },
      include: { members: true }
    });

    const existingConversation = userConversations.find(conv => 
      conv.members.some(member => member.userId === friendId)
    );

    if (existingConversation) return existingConversation;

    return this.prisma.conversation.create({
      data: {
        isGroup: false,
        members: { create: [{ userId: userId }, { userId: friendId }] }
      }
    });
  }

  async getRecentConversations(userId: number) {
    const memberships = await this.prisma.conversationMember.findMany({
      where: { userId },
      include: {
        conversation: {
          include: {
            members: {
              where: { userId: { not: userId } },
              include: { user: { select: { id: true, name: true, avatar: true } } }
            },
           messages: { 
              where: { NOT: { deletedByIds: { has: userId } } }, // THÊM DÒNG NÀY
              take: 1, 
              orderBy: { createdAt: 'desc' } 
            }
          }
        }
      },
      orderBy: { conversation: { updatedAt: 'desc' } }
    });

    return memberships.map(m => {
      const conv = m.conversation;
      const partner = conv.members[0]?.user;
      const lastMsg = conv.messages[0];

      return {
        id: conv.id.toString(),
        name: conv.isGroup ? conv.name : partner?.name,
        avatar: conv.isGroup ? conv.avatar : partner?.avatar,
        // Cập nhật giao diện Sidebar nếu tin nhắn cuối cùng bị thu hồi
        lastMsg: lastMsg?.isRecalled ? 'Tin nhắn đã thu hồi' : (lastMsg?.content || (lastMsg?.fileUrl ? '[Tệp tin]' : 'Bắt đầu trò chuyện...')),
        time: lastMsg ? new Date(lastMsg.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : '',
        isGroup: conv.isGroup
      };
    });
  }

  async getConversationInfo(conversationId: number, currentUserId: number) {
    const conv = await this.prisma.conversation.findUnique({
      where: { id: conversationId },
      include: { members: { include: { user: { select: { id: true, name: true, avatar: true, isBot: true } } } } }
    });

    if (!conv) return null;

    if (!conv.isGroup) {
      const partnerMember = conv.members.find(m => m.userId !== currentUserId);
      const friend = partnerMember?.user;
      return {
        id: conv.id,
        isGroup: false,
        name: friend?.name || 'Người dùng',
        avatar: friend?.avatar || null,
        partnerId: friend?.id,
        partnerIsBot: friend?.isBot ?? false,
      };
    }

    // NẾU LÀ NHÓM: Lấy chức vụ của mình và danh sách toàn bộ thành viên
    const myRole = conv.members.find(m => m.userId === currentUserId)?.role || 'MEMBER';
    
    const formattedMembers = conv.members.map(m => ({
      id: m.userId,
      name: m.user.name,
      avatar: m.user.avatar,
      role: m.role
    }));

    // Sắp xếp Trưởng nhóm lên đầu, rồi tới Phó nhóm, rồi tới Thành viên
    formattedMembers.sort((a, b) => {
      const roleWeight = { 'ADMIN': 1, 'DEPUTY': 2, 'MEMBER': 3 };
      return roleWeight[a.role as keyof typeof roleWeight] - roleWeight[b.role as keyof typeof roleWeight];
    });

    return { 
      id: conv.id, 
      isGroup: true, 
      name: conv.name, 
      avatar: conv.avatar,
      myRole: myRole, // Báo cho Frontend biết mình có quyền gì
      members: formattedMembers // Gửi danh sách thành viên
    };
  }

  async uploadToS3(file: Express.Multer.File): Promise<string> {
    const s3Client = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
      },
    });
    const originalName = Buffer.from(file.originalname, 'latin1').toString('utf8');
    const fileName = `chat-assets/${Date.now()}-${originalName.replace(/\s+/g, '-')}`;
    await s3Client.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: fileName,
        Body: file.buffer,
        ContentType: file.mimetype,
      })
    );
    return `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
  }

  // CẬP NHẬT TRẠNG THÁI THU HỒI VÀO DATABASE
  async recallMessage(messageId: number, userId: number) {
    const message = await this.prisma.message.findUnique({ where: { id: messageId } });
    if (!message) throw new Error('Tin nhắn không tồn tại');
    if (message.senderId !== userId) throw new Error('Không có quyền thu hồi tin nhắn của người khác');
    
    return this.prisma.message.update({
      where: { id: messageId },
      data: { isRecalled: true }
    });
  }

  //xoa tin nhan 
  async deleteMessageForUser(messageId: number, userId: number) {
    const message = await this.prisma.message.findUnique({ where: { id: messageId } });
    if (!message) throw new Error('Tin nhắn không tồn tại');

    return this.prisma.message.update({
      where: { id: messageId },
      data: { deletedByIds: { push: userId } }
    });
  }

  // HÀM MỚI: Tạo Nhóm Chat
  async createGroupConversation(creatorId: number, groupName: string, memberIds: number[]) {
    // Đảm bảo người tạo cũng nằm trong danh sách thành viên
    const allMemberIds = Array.from(new Set([creatorId, ...memberIds]));

    if (allMemberIds.length < 3) {
      throw new Error('Nhóm chat phải có ít nhất 3 thành viên (bao gồm cả bạn)');
    }

    // Dùng cú pháp `user: { connect: { id } }` thay vì `userId`
    // Thêm `as any` hoặc `as const` để TypeScript không bắt bẻ lỗi Enum MemberRole
    const membersData = allMemberIds.map(id => ({
      user: { connect: { id: id } }, 
      role: id === creatorId ? 'ADMIN' as any : 'MEMBER' as any 
    }));

    // Tạo Group và Insert toàn bộ member cùng một lúc
    return this.prisma.conversation.create({
      data: {
        isGroup: true,
        name: groupName,
        members: {
          create: membersData // Bây giờ đưa membersData vào sẽ không bị gạch đỏ nữa
        }
      },
      include: {
        members: { include: { user: { select: { id: true, name: true, avatar: true } } } }
      }
    });
  }


  // ==========================================
  // TRỌN BỘ API QUẢN LÝ NHÓM CHAT
  // ==========================================

  // Hàm phụ trợ: Lấy quyền của 1 user trong nhóm
  private async getUserRoleInGroup(conversationId: number, userId: number) {
    const member = await this.prisma.conversationMember.findUnique({
      where: { userId_conversationId: { userId, conversationId } }
    });
    return member?.role;
  }

  // 1. GỬI YÊU CẦU THÊM THÀNH VIÊN
  async requestAddMembers(conversationId: number, requesterId: number, newMemberIds: number[]) {
    const role = await this.getUserRoleInGroup(conversationId, requesterId);
    if (!role) throw new Error('Bạn không nằm trong nhóm này');

    // Lọc bỏ những người đã có sẵn trong nhóm
    const existingMembers = await this.prisma.conversationMember.findMany({
      where: { conversationId, userId: { in: newMemberIds } }
    });
    const existingIds = existingMembers.map(m => m.userId);
    const validTargetIds = newMemberIds.filter(id => !existingIds.includes(id));

    if (validTargetIds.length === 0) throw new Error('Các thành viên này đã có trong nhóm');

    if (role === 'ADMIN') {
      // NẾU LÀ TRƯỞNG NHÓM: Thêm thẳng vào luôn không cần duyệt
      const newMembersData = validTargetIds.map(id => ({
        conversationId, userId: id, role: 'MEMBER' as any
      }));
      await this.prisma.conversationMember.createMany({ data: newMembersData, skipDuplicates: true });
      return { status: 'success', message: 'Đã thêm thành viên thành công', isDirectlyAdded: true };
    } else {
      // NẾU LÀ PHÓ NHÓM / THÀNH VIÊN: Đưa vào hàng chờ
      const requestsData = validTargetIds.map(id => ({
        conversationId, userId: id, inviterId: requesterId, status: 'PENDING'
      }));
      await this.prisma.groupJoinRequest.createMany({ data: requestsData, skipDuplicates: true });
      return { status: 'success', message: 'Đã gửi yêu cầu thêm thành viên. Đang chờ Trưởng nhóm duyệt!', isDirectlyAdded: false };
    }
  }

  // 2. LẤY DANH SÁCH CHỜ DUYỆT
  async getPendingJoinRequests(conversationId: number, requesterId: number) {
    const role = await this.getUserRoleInGroup(conversationId, requesterId);
    if (role !== 'ADMIN') throw new Error('Chỉ Trưởng nhóm mới được xem danh sách duyệt');

    return this.prisma.groupJoinRequest.findMany({
      where: { conversationId, status: 'PENDING' },
      include: {
        user: { select: { id: true, name: true, avatar: true } },
        inviter: { select: { id: true, name: true, avatar: true } }
      }
    });
  }

  // 3. DUYỆT THÀNH VIÊN
  async approveJoinRequest(requestId: number, requesterId: number) {
    const request = await this.prisma.groupJoinRequest.findUnique({ where: { id: requestId } });
    if (!request) throw new Error('Yêu cầu không tồn tại');

    const role = await this.getUserRoleInGroup(request.conversationId, requesterId);
    if (role !== 'ADMIN') throw new Error('Chỉ Trưởng nhóm mới có quyền duyệt');

    await this.prisma.groupJoinRequest.update({ where: { id: requestId }, data: { status: 'ACCEPTED' } });

    return this.prisma.conversationMember.create({
      data: { conversationId: request.conversationId, userId: request.userId, role: 'MEMBER' as any }
    });
  }

  // 4. TỪ CHỐI THÀNH VIÊN
  async rejectJoinRequest(requestId: number, requesterId: number) {
    const request = await this.prisma.groupJoinRequest.findUnique({ where: { id: requestId } });
    if (!request) throw new Error('Yêu cầu không tồn tại');

    const role = await this.getUserRoleInGroup(request.conversationId, requesterId);
    if (role !== 'ADMIN') throw new Error('Chỉ Trưởng nhóm mới có quyền duyệt');

    return this.prisma.groupJoinRequest.delete({ where: { id: requestId } });
  }

  // 5. MỜI RA KHỎI NHÓM (KICK)
  async kickMember(conversationId: number, requesterId: number, targetUserId: number) {
    const requesterRole = await this.getUserRoleInGroup(conversationId, requesterId);
    const targetRole = await this.getUserRoleInGroup(conversationId, targetUserId);

    if (requesterRole !== 'ADMIN' && requesterRole !== 'DEPUTY') {
      throw new Error('Bạn không có quyền xóa thành viên');
    }

    if (requesterRole === 'DEPUTY' && (targetRole === 'ADMIN' || targetRole === 'DEPUTY')) {
      throw new Error('Phó nhóm không thể xóa Trưởng nhóm hoặc Phó nhóm khác');
    }

    return this.prisma.conversationMember.delete({
      where: { userId_conversationId: { userId: targetUserId, conversationId } }
    });
  }

  // 6. PHÂN QUYỀN (GÁN CHỨC VỤ)
  async assignRole(conversationId: number, requesterId: number, targetUserId: number, newRole: string) {
    const requesterRole = await this.getUserRoleInGroup(conversationId, requesterId);
    if (requesterRole !== 'ADMIN') {
      throw new Error('Chỉ Trưởng nhóm mới có quyền phân bổ chức vụ');
    }

    return this.prisma.conversationMember.update({
      where: { userId_conversationId: { userId: targetUserId, conversationId } },
      data: { role: newRole as any }
    });
  }

  // 7. GIẢI TÁN NHÓM
  async disbandGroup(conversationId: number, requesterId: number) {
    const requesterRole = await this.getUserRoleInGroup(conversationId, requesterId);
    if (requesterRole !== 'ADMIN') {
      throw new Error('Chỉ Trưởng nhóm mới có quyền giải tán nhóm');
    }

    return this.prisma.conversation.delete({
      where: { id: conversationId }
    });
  }

  // CẬP NHẬT THÔNG TIN NHÓM (Tên & Ảnh)
  async updateGroupInfo(conversationId: number, requesterId: number, data: { name?: string, avatar?: string }) {
    // 1. Kiểm tra quyền
    const role = await this.getUserRoleInGroup(conversationId, requesterId);
    if (role !== 'ADMIN' && role !== 'DEPUTY') {
      throw new Error('Chỉ Trưởng nhóm hoặc Phó nhóm mới được đổi thông tin');
    }

    // 2. Gom dữ liệu an toàn
    const updateData: any = {};
    if (data.name) updateData.name = data.name;
    if (data.avatar) updateData.avatar = data.avatar;

    if (Object.keys(updateData).length === 0) {
      throw new Error('Không có dữ liệu hợp lệ để cập nhật');
    }

    // 3. Cập nhật Database
    return this.prisma.conversation.update({
      where: { id: conversationId },
      data: updateData
    });
  }

  //Xóa cuộc hội thoại
  async clearConversationHistory(conversationId: number, userId: number) {
  try {
    // Tìm đúng user đó trong cuộc hội thoại đó và cập nhật giờ bấm xóa thành hiện tại
    await this.prisma.conversationMember.updateMany({
      where: {
        conversationId: conversationId,
        userId: userId,
      },
      data: {
        clearedAt: new Date(), // Đóng dấu thời gian lúc này!
      },
    });
  } catch (error) {
    console.error('Lỗi cập nhật clearedAt:', error);
    throw new Error('Không thể xóa lịch sử cuộc trò chuyện');
  }
}

  // Trưởng Nhóm RỜI NHÓM VÀ NHƯỜNG QUYỀN
  async leaveGroup(conversationId: number, requesterId: number, newAdminId?: number) {
    // 1. Kiểm tra mình đang giữ chức vụ gì
    const myRole = await this.getUserRoleInGroup(conversationId, requesterId);
    if (!myRole) throw new Error('Bạn không có trong nhóm này');

    // 2. Đếm xem nhóm còn bao nhiêu người
    const totalMembers = await this.prisma.conversationMember.count({
      where: { conversationId }
    });

    // 3. Nếu là Trưởng nhóm muốn rời đi
    if (myRole === 'ADMIN') {
      if (totalMembers > 1) {
        // Nhóm còn người mà không chỉ định admin mới -> Báo lỗi
        if (!newAdminId) {
          throw new Error('Bạn là Trưởng nhóm. Vui lòng chọn Trưởng nhóm mới trước khi rời đi!');
        }
        
        // Kiểm tra xem người được truyền ngôi có trong nhóm không
        const targetRole = await this.getUserRoleInGroup(conversationId, newAdminId);
        if (!targetRole) throw new Error('Người được chọn không có trong nhóm');

        // Truyền ngôi: Nâng người đó lên làm ADMIN
        await this.prisma.conversationMember.update({
          where: { userId_conversationId: { userId: newAdminId, conversationId } },
          data: { role: 'ADMIN' }
        });
      }
    }

    // 4. Xóa bản thân khỏi nhóm
    await this.prisma.conversationMember.delete({
      where: { userId_conversationId: { userId: requesterId, conversationId } }
    });

    // 5. NẾU NHÓM KHÔNG CÒN AI SAU KHI BẠN RỜI ĐI -> Giải tán nhóm luôn cho sạch DB
    if (totalMembers === 1) {
      await this.prisma.conversation.delete({
        where: { id: conversationId }
      });
    }

    return { status: 'success', message: 'Đã rời nhóm' };
  }

  // 1. LẤY DANH SÁCH TIN NHẮN ĐANG GHIM
  async getPinnedMessages(conversationId: number) {
    return this.prisma.message.findMany({
      where: { conversationId: conversationId, isPinned: true },
      orderBy: { updatedAt: 'desc' }, 
      include: { sender: { select: { id: true, name: true, avatar: true } } }
    });
  }

  // 2. THAO TÁC GHIM / BỎ GHIM (Giới hạn tối đa 5 tin)
  async togglePinMessage(messageId: number, conversationId: number, userId: number) {
    const message = await this.prisma.message.findUnique({ where: { id: messageId } });
    if (!message) throw new Error('Tin nhắn không tồn tại');

    if (!message.isPinned) {
      const currentPinnedCount = await this.prisma.message.count({
        where: { conversationId: conversationId, isPinned: true }
      });
      if (currentPinnedCount >= 5) {
        throw new Error('Chỉ được ghim tối đa 5 tin nhắn trong cuộc trò chuyện này!');
      }
    }

    return this.prisma.message.update({
      where: { id: messageId },
      data: { isPinned: !message.isPinned },
      include: { sender: { select: { id: true, name: true, avatar: true } } }
    });
  }

  // THẢ / GỠ REACTION (CẢM XÚC) TRÊN TIN NHẮN
  async toggleReaction(messageId: number, userId: number, emoji: string) {
    // 1. Kiểm tra xem người này đã thả reaction trên tin nhắn này chưa
    const existingReaction = await this.prisma.messageReaction.findUnique({
      where: {
        messageId_userId: { messageId, userId } // Khóa unique bạn đã tạo ở schema
      }
    });

    if (existingReaction) {
      // Nếu đã thả rồi:
      if (existingReaction.emoji === emoji) {
        // - Bấm lại đúng emoji đó -> Gỡ reaction (Xóa khỏi DB)
        await this.prisma.messageReaction.delete({
          where: { id: existingReaction.id }
        });
        return { action: 'removed', messageId, userId };
      } else {
        // - Bấm emoji khác -> Đổi reaction (Update DB)
        const updated = await this.prisma.messageReaction.update({
          where: { id: existingReaction.id },
          data: { emoji: emoji }
        });
        return { action: 'updated', messageId, userId, emoji: updated.emoji };
      }
    } else {
      // 2. Nếu chưa thả bao giờ -> Thêm reaction mới
      const newReaction = await this.prisma.messageReaction.create({
        data: { messageId, userId, emoji }
      });
      return { action: 'added', messageId, userId, emoji: newReaction.emoji };
    }
  }
  
}
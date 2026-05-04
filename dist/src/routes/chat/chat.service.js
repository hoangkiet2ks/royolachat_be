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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../shared/services/prisma.service");
const client_s3_1 = require("@aws-sdk/client-s3");
let ChatService = class ChatService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getUserConversations(userId) {
        return this.prisma.conversationMember.findMany({
            where: { userId },
            select: { conversationId: true },
        });
    }
    async getConversationMembers(conversationId) {
        const members = await this.prisma.conversationMember.findMany({
            where: { conversationId },
            include: { user: { select: { id: true, name: true } } },
        });
        return members.map(m => ({ id: m.user.id, name: m.user.name }));
    }
    async getUserById(userId) {
        return this.prisma.user.findUnique({
            where: { id: userId },
            select: { id: true, name: true },
        });
    }
    async updateLastSeen(userId) {
        return this.prisma.user.update({
            where: { id: userId },
            data: { lastSeenAt: new Date() }
        });
    }
    async saveMessage(data) {
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
    async getMessages(conversationId, userId, limit = 50, offset = 0) {
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
        const whereCondition = {
            conversationId: conversationId,
            NOT: { deletedByIds: { has: userId } }
        };
        if (memberInfo.clearedAt) {
            whereCondition.createdAt = {
                gt: memberInfo.clearedAt,
            };
        }
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
        return messages.reverse();
    }
    async getOrCreateOneToOneConversation(userId, friendId) {
        const userConversations = await this.prisma.conversation.findMany({
            where: { isGroup: false, members: { some: { userId: userId } } },
            include: { members: true }
        });
        const existingConversation = userConversations.find(conv => conv.members.some(member => member.userId === friendId));
        if (existingConversation)
            return existingConversation;
        return this.prisma.conversation.create({
            data: {
                isGroup: false,
                members: { create: [{ userId: userId }, { userId: friendId }] }
            }
        });
    }
    async getRecentConversations(userId) {
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
                            where: { NOT: { deletedByIds: { has: userId } } },
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
                lastMsg: lastMsg?.isRecalled ? 'Tin nhắn đã thu hồi' : (lastMsg?.content || (lastMsg?.fileUrl ? '[Tệp tin]' : 'Bắt đầu trò chuyện...')),
                time: lastMsg ? new Date(lastMsg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '',
                isGroup: conv.isGroup
            };
        });
    }
    async getConversationInfo(conversationId, currentUserId) {
        const conv = await this.prisma.conversation.findUnique({
            where: { id: conversationId },
            include: { members: { include: { user: { select: { id: true, name: true, avatar: true } } } } }
        });
        if (!conv)
            return null;
        if (!conv.isGroup) {
            const friend = conv.members.find(m => m.userId !== currentUserId)?.user;
            return {
                id: conv.id,
                isGroup: false,
                name: friend?.name || 'Người dùng',
                avatar: friend?.avatar || null,
                partnerId: friend?.id
            };
        }
        const myRole = conv.members.find(m => m.userId === currentUserId)?.role || 'MEMBER';
        const formattedMembers = conv.members.map(m => ({
            id: m.userId,
            name: m.user.name,
            avatar: m.user.avatar,
            role: m.role
        }));
        formattedMembers.sort((a, b) => {
            const roleWeight = { 'ADMIN': 1, 'DEPUTY': 2, 'MEMBER': 3 };
            return roleWeight[a.role] - roleWeight[b.role];
        });
        return {
            id: conv.id,
            isGroup: true,
            name: conv.name,
            avatar: conv.avatar,
            myRole: myRole,
            members: formattedMembers
        };
    }
    async uploadToS3(file) {
        const s3Client = new client_s3_1.S3Client({
            region: process.env.AWS_REGION,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            },
        });
        const originalName = Buffer.from(file.originalname, 'latin1').toString('utf8');
        const fileName = `chat-assets/${Date.now()}-${originalName.replace(/\s+/g, '-')}`;
        await s3Client.send(new client_s3_1.PutObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: fileName,
            Body: file.buffer,
            ContentType: file.mimetype,
        }));
        return `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
    }
    async recallMessage(messageId, userId) {
        const message = await this.prisma.message.findUnique({ where: { id: messageId } });
        if (!message)
            throw new Error('Tin nhắn không tồn tại');
        if (message.senderId !== userId)
            throw new Error('Không có quyền thu hồi tin nhắn của người khác');
        return this.prisma.message.update({
            where: { id: messageId },
            data: { isRecalled: true }
        });
    }
    async deleteMessageForUser(messageId, userId) {
        const message = await this.prisma.message.findUnique({ where: { id: messageId } });
        if (!message)
            throw new Error('Tin nhắn không tồn tại');
        return this.prisma.message.update({
            where: { id: messageId },
            data: { deletedByIds: { push: userId } }
        });
    }
    async createGroupConversation(creatorId, groupName, memberIds) {
        const allMemberIds = Array.from(new Set([creatorId, ...memberIds]));
        if (allMemberIds.length < 3) {
            throw new Error('Nhóm chat phải có ít nhất 3 thành viên (bao gồm cả bạn)');
        }
        const membersData = allMemberIds.map(id => ({
            user: { connect: { id: id } },
            role: id === creatorId ? 'ADMIN' : 'MEMBER'
        }));
        return this.prisma.conversation.create({
            data: {
                isGroup: true,
                name: groupName,
                members: {
                    create: membersData
                }
            },
            include: {
                members: { include: { user: { select: { id: true, name: true, avatar: true } } } }
            }
        });
    }
    async getUserRoleInGroup(conversationId, userId) {
        const member = await this.prisma.conversationMember.findUnique({
            where: { userId_conversationId: { userId, conversationId } }
        });
        return member?.role;
    }
    async requestAddMembers(conversationId, requesterId, newMemberIds) {
        const role = await this.getUserRoleInGroup(conversationId, requesterId);
        if (!role)
            throw new Error('Bạn không nằm trong nhóm này');
        const existingMembers = await this.prisma.conversationMember.findMany({
            where: { conversationId, userId: { in: newMemberIds } }
        });
        const existingIds = existingMembers.map(m => m.userId);
        const validTargetIds = newMemberIds.filter(id => !existingIds.includes(id));
        if (validTargetIds.length === 0)
            throw new Error('Các thành viên này đã có trong nhóm');
        if (role === 'ADMIN') {
            const newMembersData = validTargetIds.map(id => ({
                conversationId, userId: id, role: 'MEMBER'
            }));
            await this.prisma.conversationMember.createMany({ data: newMembersData, skipDuplicates: true });
            return { status: 'success', message: 'Đã thêm thành viên thành công', isDirectlyAdded: true };
        }
        else {
            const requestsData = validTargetIds.map(id => ({
                conversationId, userId: id, inviterId: requesterId, status: 'PENDING'
            }));
            await this.prisma.groupJoinRequest.createMany({ data: requestsData, skipDuplicates: true });
            return { status: 'success', message: 'Đã gửi yêu cầu thêm thành viên. Đang chờ Trưởng nhóm duyệt!', isDirectlyAdded: false };
        }
    }
    async getPendingJoinRequests(conversationId, requesterId) {
        const role = await this.getUserRoleInGroup(conversationId, requesterId);
        if (role !== 'ADMIN')
            throw new Error('Chỉ Trưởng nhóm mới được xem danh sách duyệt');
        return this.prisma.groupJoinRequest.findMany({
            where: { conversationId, status: 'PENDING' },
            include: {
                user: { select: { id: true, name: true, avatar: true } },
                inviter: { select: { id: true, name: true, avatar: true } }
            }
        });
    }
    async approveJoinRequest(requestId, requesterId) {
        const request = await this.prisma.groupJoinRequest.findUnique({ where: { id: requestId } });
        if (!request)
            throw new Error('Yêu cầu không tồn tại');
        const role = await this.getUserRoleInGroup(request.conversationId, requesterId);
        if (role !== 'ADMIN')
            throw new Error('Chỉ Trưởng nhóm mới có quyền duyệt');
        await this.prisma.groupJoinRequest.update({ where: { id: requestId }, data: { status: 'ACCEPTED' } });
        return this.prisma.conversationMember.create({
            data: { conversationId: request.conversationId, userId: request.userId, role: 'MEMBER' }
        });
    }
    async rejectJoinRequest(requestId, requesterId) {
        const request = await this.prisma.groupJoinRequest.findUnique({ where: { id: requestId } });
        if (!request)
            throw new Error('Yêu cầu không tồn tại');
        const role = await this.getUserRoleInGroup(request.conversationId, requesterId);
        if (role !== 'ADMIN')
            throw new Error('Chỉ Trưởng nhóm mới có quyền duyệt');
        return this.prisma.groupJoinRequest.delete({ where: { id: requestId } });
    }
    async kickMember(conversationId, requesterId, targetUserId) {
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
    async assignRole(conversationId, requesterId, targetUserId, newRole) {
        const requesterRole = await this.getUserRoleInGroup(conversationId, requesterId);
        if (requesterRole !== 'ADMIN') {
            throw new Error('Chỉ Trưởng nhóm mới có quyền phân bổ chức vụ');
        }
        return this.prisma.conversationMember.update({
            where: { userId_conversationId: { userId: targetUserId, conversationId } },
            data: { role: newRole }
        });
    }
    async disbandGroup(conversationId, requesterId) {
        const requesterRole = await this.getUserRoleInGroup(conversationId, requesterId);
        if (requesterRole !== 'ADMIN') {
            throw new Error('Chỉ Trưởng nhóm mới có quyền giải tán nhóm');
        }
        return this.prisma.conversation.delete({
            where: { id: conversationId }
        });
    }
    async updateGroupInfo(conversationId, requesterId, data) {
        const role = await this.getUserRoleInGroup(conversationId, requesterId);
        if (role !== 'ADMIN' && role !== 'DEPUTY') {
            throw new Error('Chỉ Trưởng nhóm hoặc Phó nhóm mới được đổi thông tin');
        }
        const updateData = {};
        if (data.name)
            updateData.name = data.name;
        if (data.avatar)
            updateData.avatar = data.avatar;
        if (Object.keys(updateData).length === 0) {
            throw new Error('Không có dữ liệu hợp lệ để cập nhật');
        }
        return this.prisma.conversation.update({
            where: { id: conversationId },
            data: updateData
        });
    }
    async clearConversationHistory(conversationId, userId) {
        try {
            await this.prisma.conversationMember.updateMany({
                where: {
                    conversationId: conversationId,
                    userId: userId,
                },
                data: {
                    clearedAt: new Date(),
                },
            });
        }
        catch (error) {
            console.error('Lỗi cập nhật clearedAt:', error);
            throw new Error('Không thể xóa lịch sử cuộc trò chuyện');
        }
    }
    async leaveGroup(conversationId, requesterId, newAdminId) {
        const myRole = await this.getUserRoleInGroup(conversationId, requesterId);
        if (!myRole)
            throw new Error('Bạn không có trong nhóm này');
        const totalMembers = await this.prisma.conversationMember.count({
            where: { conversationId }
        });
        if (myRole === 'ADMIN') {
            if (totalMembers > 1) {
                if (!newAdminId) {
                    throw new Error('Bạn là Trưởng nhóm. Vui lòng chọn Trưởng nhóm mới trước khi rời đi!');
                }
                const targetRole = await this.getUserRoleInGroup(conversationId, newAdminId);
                if (!targetRole)
                    throw new Error('Người được chọn không có trong nhóm');
                await this.prisma.conversationMember.update({
                    where: { userId_conversationId: { userId: newAdminId, conversationId } },
                    data: { role: 'ADMIN' }
                });
            }
        }
        await this.prisma.conversationMember.delete({
            where: { userId_conversationId: { userId: requesterId, conversationId } }
        });
        if (totalMembers === 1) {
            await this.prisma.conversation.delete({
                where: { id: conversationId }
            });
        }
        return { status: 'success', message: 'Đã rời nhóm' };
    }
    async getPinnedMessages(conversationId) {
        return this.prisma.message.findMany({
            where: { conversationId: conversationId, isPinned: true },
            orderBy: { updatedAt: 'desc' },
            include: { sender: { select: { id: true, name: true, avatar: true } } }
        });
    }
    async togglePinMessage(messageId, conversationId, userId) {
        const message = await this.prisma.message.findUnique({ where: { id: messageId } });
        if (!message)
            throw new Error('Tin nhắn không tồn tại');
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
    async toggleReaction(messageId, userId, emoji) {
        const existingReaction = await this.prisma.messageReaction.findUnique({
            where: {
                messageId_userId: { messageId, userId }
            }
        });
        if (existingReaction) {
            if (existingReaction.emoji === emoji) {
                await this.prisma.messageReaction.delete({
                    where: { id: existingReaction.id }
                });
                return { action: 'removed', messageId, userId };
            }
            else {
                const updated = await this.prisma.messageReaction.update({
                    where: { id: existingReaction.id },
                    data: { emoji: emoji }
                });
                return { action: 'updated', messageId, userId, emoji: updated.emoji };
            }
        }
        else {
            const newReaction = await this.prisma.messageReaction.create({
                data: { messageId, userId, emoji }
            });
            return { action: 'added', messageId, userId, emoji: newReaction.emoji };
        }
    }
};
exports.ChatService = ChatService;
exports.ChatService = ChatService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ChatService);
//# sourceMappingURL=chat.service.js.map
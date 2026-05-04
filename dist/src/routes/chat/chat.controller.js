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
exports.ChatController = exports.UpdateGroupInfoDto = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const chat_service_1 = require("./chat.service");
const access_token_guard_1 = require("../../shared/guards/access-token.guard");
const active_user_decorator_1 = require("../../shared/decorators/active-user.decorator");
const class_validator_1 = require("class-validator");
class UpdateGroupInfoDto {
}
exports.UpdateGroupInfoDto = UpdateGroupInfoDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateGroupInfoDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateGroupInfoDto.prototype, "avatar", void 0);
let ChatController = class ChatController {
    constructor(chatService) {
        this.chatService = chatService;
    }
    async getChatHistory(conversationId, user, limit, offset) {
        const userId = Number(user?.sub || user?.userId || user?.id);
        const take = limit ? parseInt(limit, 10) : 50;
        const skip = offset ? parseInt(offset, 10) : 0;
        const messages = await this.chatService.getMessages(conversationId, userId, take, skip);
        return messages.reverse();
    }
    async getOrCreateConversation(user, friendId) {
        console.log('--- DEBUG API TẠO PHÒNG CHAT ---');
        console.log('Dữ liệu user từ Token:', user);
        console.log('ID người bạn (friendId):', friendId);
        let userId;
        if (typeof user === 'number') {
            userId = user;
        }
        else {
            userId = Number(user?.sub || user?.userId || user?.id);
        }
        console.log('UserId chốt để tạo:', userId);
        console.log('---------------------------------');
        if (!userId || isNaN(userId)) {
            throw new common_1.BadRequestException('Không thể xác định ID của bạn từ Token');
        }
        return this.chatService.getOrCreateOneToOneConversation(userId, friendId);
    }
    async getConversationInfo(id, user) {
        const userId = Number(user?.sub || user?.userId || user?.id);
        return this.chatService.getConversationInfo(id, userId);
    }
    async getConversations(user) {
        const userId = Number(user?.sub || user?.userId || user?.id);
        return this.chatService.getRecentConversations(userId);
    }
    async uploadChatFile(file) {
        if (!file) {
            throw new common_1.BadRequestException('Không tìm thấy file tải lên');
        }
        try {
            const fileUrl = await this.chatService.uploadToS3(file);
            const type = file.mimetype.startsWith('image/') ? 'IMAGE' : 'FILE';
            return {
                status: 'success',
                fileUrl: fileUrl,
                type: type,
                fileName: file.originalname
            };
        }
        catch (error) {
            console.error('Lỗi upload S3:', error);
            throw new common_1.BadRequestException('Lỗi khi tải file lên hệ thống');
        }
    }
    async createGroup(user, name, memberIds) {
        const userId = Number(user?.sub || user?.userId || user?.id);
        if (!name || name.trim() === '') {
            throw new common_1.BadRequestException('Tên nhóm không được để trống');
        }
        if (!Array.isArray(memberIds) || memberIds.length === 0) {
            throw new common_1.BadRequestException('Vui lòng chọn ít nhất 1 thành viên khác để tạo nhóm');
        }
        try {
            return await this.chatService.createGroupConversation(userId, name, memberIds);
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async requestAddMembers(conversationId, user, memberIds) {
        try {
            const userId = Number(user?.sub || user?.userId || user?.id);
            return await this.chatService.requestAddMembers(conversationId, userId, memberIds);
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async getPendingRequests(conversationId, user) {
        try {
            const userId = Number(user?.sub || user?.userId || user?.id);
            return await this.chatService.getPendingJoinRequests(conversationId, userId);
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async approveRequest(requestId, user) {
        try {
            const userId = Number(user?.sub || user?.userId || user?.id);
            await this.chatService.approveJoinRequest(requestId, userId);
            return { status: 'success', message: 'Đã phê duyệt thành viên' };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async rejectRequest(requestId, user) {
        try {
            const userId = Number(user?.sub || user?.userId || user?.id);
            await this.chatService.rejectJoinRequest(requestId, userId);
            return { status: 'success', message: 'Đã từ chối thành viên' };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async kickMember(conversationId, user, targetUserId) {
        try {
            const userId = Number(user?.sub || user?.userId || user?.id);
            await this.chatService.kickMember(conversationId, userId, targetUserId);
            return { status: 'success', message: 'Đã xóa thành viên khỏi nhóm' };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async assignRole(conversationId, user, targetUserId, role) {
        try {
            const userId = Number(user?.sub || user?.userId || user?.id);
            await this.chatService.assignRole(conversationId, userId, targetUserId, role);
            return { status: 'success', message: 'Cập nhật quyền thành công' };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async disbandGroup(conversationId, user) {
        try {
            const userId = Number(user?.sub || user?.userId || user?.id);
            await this.chatService.disbandGroup(conversationId, userId);
            return { status: 'success', message: 'Đã giải tán nhóm' };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async updateGroupInfo(conversationId, user, body) {
        try {
            const userId = Number(user?.sub || user?.userId || user?.id);
            if (!body.name && !body.avatar) {
                throw new Error('Không có dữ liệu hợp lệ để cập nhật');
            }
            await this.chatService.updateGroupInfo(conversationId, userId, body);
            return { status: 'success', message: 'Cập nhật thông tin nhóm thành công' };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async clearHistory(conversationId, req) {
        const userId = req.user?.userId || req.user?.id;
        await this.chatService.clearConversationHistory(Number(conversationId), userId);
        return {
            status: 'success',
            message: 'Đã xóa toàn bộ lịch sử cuộc trò chuyện'
        };
    }
    async leaveGroup(conversationId, req, newAdminId) {
        const userId = req.user?.userId || req.user?.id;
        return await this.chatService.leaveGroup(Number(conversationId), userId, newAdminId);
    }
    async getPinnedMessages(conversationId) {
        return await this.chatService.getPinnedMessages(Number(conversationId));
    }
};
exports.ChatController = ChatController;
__decorate([
    (0, common_1.Get)(':conversationId/messages'),
    __param(0, (0, common_1.Param)('conversationId', common_1.ParseIntPipe)),
    __param(1, (0, active_user_decorator_1.ActiveUser)()),
    __param(2, (0, common_1.Query)('limit')),
    __param(3, (0, common_1.Query)('offset')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, String, String]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "getChatHistory", null);
__decorate([
    (0, common_1.Post)('conversation/1v1'),
    __param(0, (0, active_user_decorator_1.ActiveUser)()),
    __param(1, (0, common_1.Body)('friendId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "getOrCreateConversation", null);
__decorate([
    (0, common_1.Get)('conversation/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, active_user_decorator_1.ActiveUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "getConversationInfo", null);
__decorate([
    (0, common_1.Get)('conversations'),
    __param(0, (0, active_user_decorator_1.ActiveUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "getConversations", null);
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "uploadChatFile", null);
__decorate([
    (0, common_1.Post)('conversation/group'),
    __param(0, (0, active_user_decorator_1.ActiveUser)()),
    __param(1, (0, common_1.Body)('name')),
    __param(2, (0, common_1.Body)('memberIds')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Array]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "createGroup", null);
__decorate([
    (0, common_1.Post)('group/:id/add-members'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, active_user_decorator_1.ActiveUser)()),
    __param(2, (0, common_1.Body)('memberIds')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Array]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "requestAddMembers", null);
__decorate([
    (0, common_1.Get)('group/:id/pending-requests'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, active_user_decorator_1.ActiveUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "getPendingRequests", null);
__decorate([
    (0, common_1.Post)('group/request/:requestId/approve'),
    __param(0, (0, common_1.Param)('requestId', common_1.ParseIntPipe)),
    __param(1, (0, active_user_decorator_1.ActiveUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "approveRequest", null);
__decorate([
    (0, common_1.Post)('group/request/:requestId/reject'),
    __param(0, (0, common_1.Param)('requestId', common_1.ParseIntPipe)),
    __param(1, (0, active_user_decorator_1.ActiveUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "rejectRequest", null);
__decorate([
    (0, common_1.Post)('group/:id/kick'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, active_user_decorator_1.ActiveUser)()),
    __param(2, (0, common_1.Body)('targetUserId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Number]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "kickMember", null);
__decorate([
    (0, common_1.Post)('group/:id/role'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, active_user_decorator_1.ActiveUser)()),
    __param(2, (0, common_1.Body)('targetUserId')),
    __param(3, (0, common_1.Body)('role')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Number, String]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "assignRole", null);
__decorate([
    (0, common_1.Delete)('group/:id/disband'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, active_user_decorator_1.ActiveUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "disbandGroup", null);
__decorate([
    (0, common_1.Patch)('group/:id/info'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, active_user_decorator_1.ActiveUser)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, UpdateGroupInfoDto]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "updateGroupInfo", null);
__decorate([
    (0, common_1.Delete)('conversation/:id/history'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "clearHistory", null);
__decorate([
    (0, common_1.Post)('group/:id/leave'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)('newAdminId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Number]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "leaveGroup", null);
__decorate([
    (0, common_1.Get)('conversation/:id/pins'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "getPinnedMessages", null);
exports.ChatController = ChatController = __decorate([
    (0, common_1.Controller)('chat'),
    (0, common_1.UseGuards)(access_token_guard_1.AccessTokenGuard),
    __metadata("design:paramtypes", [chat_service_1.ChatService])
], ChatController);
//# sourceMappingURL=chat.controller.js.map
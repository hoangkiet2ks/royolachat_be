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
exports.FriendService = void 0;
const common_1 = require("@nestjs/common");
const friend_repo_1 = require("./friend.repo");
const chat_gateway_1 = require("../chat/chat.gateway");
let FriendService = class FriendService {
    constructor(friendRepo, chatGateway) {
        this.friendRepo = friendRepo;
        this.chatGateway = chatGateway;
    }
    async searchUser(userId, body) {
        const user = await this.friendRepo.findUserByPhoneNumber(body.phoneNumber);
        if (!user) {
            throw new common_1.NotFoundException('Không tìm thấy người dùng với số điện thoại này');
        }
        if (user.id === userId) {
            throw new common_1.BadRequestException('Không thể kết bạn với chính mình');
        }
        const existing = await this.friendRepo.checkFriendshipStatus(userId, user.id);
        if (existing) {
            if (existing.status === 'ACCEPTED') {
                throw new common_1.BadRequestException('Đã là bạn với người dùng này rồi');
            }
            if (existing.status === 'PENDING') {
                throw new common_1.BadRequestException('Đã gửi lời mời kết bạn cho người dùng này');
            }
        }
        return user;
    }
    async addFriend(userId, body) {
        if (userId === body.receiverId) {
            throw new common_1.BadRequestException('Không thể kết bạn với chính mình');
        }
        const receiver = await this.friendRepo.findUserById(body.receiverId);
        if (!receiver) {
            throw new common_1.NotFoundException('Người nhận không tồn tại');
        }
        const existing = await this.friendRepo.checkFriendshipStatus(userId, body.receiverId);
        if (existing) {
            if (existing.status === 'ACCEPTED') {
                throw new common_1.BadRequestException('Đã là bạn rồi');
            }
            if (existing.status === 'PENDING') {
                throw new common_1.BadRequestException('Đã gửi lời mời rồi');
            }
        }
        const friendship = await this.friendRepo.createFriendRequest(userId, body.receiverId);
        const requester = await this.friendRepo.findUserById(userId);
        if (requester) {
            this.chatGateway.notifyFriendRequest(body.receiverId, {
                id: requester.id,
                name: requester.name,
                avatar: requester.avatar,
            });
        }
        return friendship;
    }
    async acceptFriend(userId, body) {
        const friendship = await this.friendRepo.checkFriendshipStatus(body.requesterId, userId);
        if (!friendship) {
            throw new common_1.NotFoundException('Không tìm thấy lời mời kết bạn');
        }
        if (friendship.status !== 'PENDING') {
            throw new common_1.BadRequestException(`Không thể chấp nhận. Trạng thái hiện tại: ${friendship.status}`);
        }
        return this.friendRepo.acceptFriendRequest(body.requesterId, userId);
    }
    async getFriendList(userId) {
        return this.friendRepo.getFriendList(userId);
    }
    async getPendingRequests(userId) {
        return this.friendRepo.getPendingRequests(userId);
    }
    async rejectFriend(userId, body) {
        const friendship = await this.friendRepo.checkFriendshipStatus(body.requesterId, userId);
        if (!friendship) {
            throw new common_1.NotFoundException('Không tìm thấy lời mời kết bạn');
        }
        if (friendship.status !== 'PENDING') {
            throw new common_1.BadRequestException(`Không thể từ chối. Trạng thái hiện tại: ${friendship.status}`);
        }
        return this.friendRepo.rejectFriendRequest(body.requesterId, userId);
    }
    async removeFriend(userId, friendId) {
        if (userId === friendId) {
            throw new common_1.BadRequestException('Không thể xóa chính mình');
        }
        const friendship = await this.friendRepo.checkFriendshipStatus(userId, friendId);
        if (!friendship) {
            throw new common_1.NotFoundException('Không tìm thấy mối quan hệ bạn bè');
        }
        if (friendship.status !== 'ACCEPTED') {
            throw new common_1.BadRequestException('Chỉ có thể xóa người đã là bạn');
        }
        await this.friendRepo.deleteFriendship(userId, friendId);
        return { message: 'Đã xóa bạn bè thành công' };
    }
};
exports.FriendService = FriendService;
exports.FriendService = FriendService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => chat_gateway_1.ChatGateway))),
    __metadata("design:paramtypes", [friend_repo_1.FriendRepository,
        chat_gateway_1.ChatGateway])
], FriendService);
//# sourceMappingURL=friend.service.js.map
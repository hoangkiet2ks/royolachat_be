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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FriendController = void 0;
const common_1 = require("@nestjs/common");
const friend_service_1 = require("./friend.service");
const access_token_guard_1 = require("../../shared/guards/access-token.guard");
const active_user_decorator_1 = require("../../shared/decorators/active-user.decorator");
const custom_zod_validation_pipe_1 = __importDefault(require("../../shared/pipes/custom-zod-validation.pipe"));
const friend_model_1 = require("./friend.model");
let FriendController = class FriendController {
    constructor(friendService) {
        this.friendService = friendService;
    }
    async searchUser(activeUser, body) {
        const user = await this.friendService.searchUser(activeUser.userId, body);
        return {
            success: true,
            data: user,
            error: null,
        };
    }
    async addFriend(activeUser, body) {
        const friendship = await this.friendService.addFriend(activeUser.userId, body);
        return {
            success: true,
            data: friendship,
            error: null,
        };
    }
    async acceptFriend(activeUser, body) {
        const friendship = await this.friendService.acceptFriend(activeUser.userId, body);
        return {
            success: true,
            data: friendship,
            error: null,
        };
    }
    async rejectFriend(activeUser, body) {
        await this.friendService.rejectFriend(activeUser.userId, body);
        return {
            success: true,
            data: null,
            error: null,
        };
    }
    async getFriendList(activeUser) {
        const friends = await this.friendService.getFriendList(activeUser.userId);
        return {
            success: true,
            data: friends,
            error: null,
        };
    }
    async getPendingRequests(activeUser) {
        const requests = await this.friendService.getPendingRequests(activeUser.userId);
        return {
            success: true,
            data: requests,
            error: null,
        };
    }
    async removeFriend(activeUser, body) {
        const result = await this.friendService.removeFriend(activeUser.userId, body.friendId);
        return {
            success: true,
            data: result,
            error: null,
        };
    }
};
exports.FriendController = FriendController;
__decorate([
    (0, common_1.Post)('search'),
    __param(0, (0, active_user_decorator_1.ActiveUser)()),
    __param(1, (0, common_1.Body)(new custom_zod_validation_pipe_1.default(friend_model_1.SearchUserSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FriendController.prototype, "searchUser", null);
__decorate([
    (0, common_1.Post)('add'),
    __param(0, (0, active_user_decorator_1.ActiveUser)()),
    __param(1, (0, common_1.Body)(new custom_zod_validation_pipe_1.default(friend_model_1.AddFriendSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FriendController.prototype, "addFriend", null);
__decorate([
    (0, common_1.Post)('accept'),
    __param(0, (0, active_user_decorator_1.ActiveUser)()),
    __param(1, (0, common_1.Body)(new custom_zod_validation_pipe_1.default(friend_model_1.AcceptFriendSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FriendController.prototype, "acceptFriend", null);
__decorate([
    (0, common_1.Post)('reject'),
    __param(0, (0, active_user_decorator_1.ActiveUser)()),
    __param(1, (0, common_1.Body)(new custom_zod_validation_pipe_1.default(friend_model_1.AcceptFriendSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FriendController.prototype, "rejectFriend", null);
__decorate([
    (0, common_1.Get)('list'),
    __param(0, (0, active_user_decorator_1.ActiveUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FriendController.prototype, "getFriendList", null);
__decorate([
    (0, common_1.Get)('pending'),
    __param(0, (0, active_user_decorator_1.ActiveUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FriendController.prototype, "getPendingRequests", null);
__decorate([
    (0, common_1.Post)('remove'),
    __param(0, (0, active_user_decorator_1.ActiveUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FriendController.prototype, "removeFriend", null);
exports.FriendController = FriendController = __decorate([
    (0, common_1.Controller)('friend'),
    (0, common_1.UseGuards)(access_token_guard_1.AccessTokenGuard),
    __metadata("design:paramtypes", [friend_service_1.FriendService])
], FriendController);
//# sourceMappingURL=friend.controller.js.map
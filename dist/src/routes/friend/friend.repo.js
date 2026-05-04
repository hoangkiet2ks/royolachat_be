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
exports.FriendRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../shared/services/prisma.service");
let FriendRepository = class FriendRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findUserById(id) {
        return this.prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                phoneNumber: true,
                avatar: true,
                email: true,
            },
        });
    }
    async findUserByPhoneNumber(phoneNumber) {
        return this.prisma.user.findFirst({
            where: { phoneNumber },
            select: {
                id: true,
                name: true,
                phoneNumber: true,
                avatar: true,
                email: true,
            },
        });
    }
    async checkFriendshipStatus(requesterId, receiverId) {
        return this.prisma.friendship.findFirst({
            where: {
                OR: [
                    { requesterId, receiverId },
                    { requesterId: receiverId, receiverId: requesterId },
                ],
            },
            select: { id: true, status: true },
        });
    }
    async createFriendRequest(requesterId, receiverId) {
        return this.prisma.friendship.create({
            data: {
                requesterId,
                receiverId,
                status: 'PENDING',
            },
            include: {
                requester: {
                    select: { id: true, name: true, phoneNumber: true, avatar: true, email: true },
                },
                receiver: {
                    select: { id: true, name: true, phoneNumber: true, avatar: true, email: true },
                },
            },
        });
    }
    async acceptFriendRequest(requesterId, receiverId) {
        return this.prisma.friendship.update({
            where: {
                requesterId_receiverId: { requesterId, receiverId },
            },
            data: { status: 'ACCEPTED' },
            include: {
                requester: {
                    select: { id: true, name: true, phoneNumber: true, avatar: true, email: true },
                },
                receiver: {
                    select: { id: true, name: true, phoneNumber: true, avatar: true, email: true },
                },
            },
        });
    }
    async getFriendList(userId) {
        const friendships = await this.prisma.friendship.findMany({
            where: {
                AND: [
                    { status: 'ACCEPTED' },
                    {
                        OR: [{ requesterId: userId }, { receiverId: userId }],
                    },
                ],
            },
            include: {
                requester: {
                    select: { id: true, name: true, phoneNumber: true, avatar: true, email: true },
                },
                receiver: {
                    select: { id: true, name: true, phoneNumber: true, avatar: true, email: true },
                },
            },
        });
        return friendships.map((f) => (f.requesterId === userId ? f.receiver : f.requester));
    }
    async getPendingRequests(userId) {
        return this.prisma.friendship.findMany({
            where: {
                receiverId: userId,
                status: 'PENDING',
            },
            include: {
                requester: {
                    select: { id: true, name: true, phoneNumber: true, avatar: true, email: true },
                },
            },
        });
    }
    async rejectFriendRequest(requesterId, receiverId) {
        return this.prisma.friendship.delete({
            where: {
                requesterId_receiverId: { requesterId, receiverId },
            },
        });
    }
    async deleteFriendship(userId, friendId) {
        const friendship = await this.prisma.friendship.findFirst({
            where: {
                OR: [
                    { requesterId: userId, receiverId: friendId },
                    { requesterId: friendId, receiverId: userId },
                ],
                status: 'ACCEPTED',
            },
        });
        if (!friendship) {
            throw new Error('Không tìm thấy mối quan hệ bạn bè');
        }
        return this.prisma.friendship.delete({
            where: {
                requesterId_receiverId: {
                    requesterId: friendship.requesterId,
                    receiverId: friendship.receiverId,
                },
            },
        });
    }
};
exports.FriendRepository = FriendRepository;
exports.FriendRepository = FriendRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FriendRepository);
//# sourceMappingURL=friend.repo.js.map
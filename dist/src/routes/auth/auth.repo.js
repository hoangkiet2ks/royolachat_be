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
exports.AuthRepository = void 0;
const prisma_service_1 = require("../../shared/services/prisma.service");
const common_1 = require("@nestjs/common");
const safeUserSelect = {
    id: true,
    email: true,
    name: true,
    phoneNumber: true,
    avatar: true,
    banner: true,
    birthday: true,
    appRole: true,
    status: true,
    lastSeenAt: true,
    createdAt: true,
    updatedAt: true,
};
let AuthRepository = class AuthRepository {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    createUser(data) {
        return this.prismaService.user.create({
            data,
            select: safeUserSelect,
        });
    }
    findUniqueUser(where) {
        return this.prismaService.user.findUnique({
            where,
        });
    }
    findUniqueSafeUser(where) {
        return this.prismaService.user.findUnique({
            where,
            select: safeUserSelect,
        });
    }
    createVerificationCode(payload) {
        return this.prismaService.verificationCode.upsert({
            where: {
                email_type: {
                    email: payload.email,
                    type: payload.type,
                },
            },
            create: payload,
            update: {
                code: payload.code,
                expiresAt: payload.expiresAt,
            },
        });
    }
    findUniqueVerificationCode(where) {
        return this.prismaService.verificationCode.findUnique({
            where,
        });
    }
    deleteVerificationCode(where) {
        return this.prismaService.verificationCode.delete({
            where,
        });
    }
    createRefreshToken(data) {
        return this.prismaService.refreshToken.create({
            data,
        });
    }
    findUniqueRefreshTokenIncludeUser(where) {
        return this.prismaService.refreshToken.findUnique({
            where,
            include: {
                user: true,
                device: true,
            },
        });
    }
    deleteRefreshToken(where) {
        return this.prismaService.refreshToken.delete({
            where,
        });
    }
    deleteRefreshTokensByUserId(userId) {
        return this.prismaService.refreshToken.deleteMany({
            where: { userId },
        });
    }
    createDevice(data) {
        return this.prismaService.device.create({
            data,
        });
    }
    updateDevice(deviceId, data) {
        return this.prismaService.device.update({
            where: { id: deviceId },
            data,
        });
    }
    deactivateDevicesByUserId(userId) {
        return this.prismaService.device.updateMany({
            where: { userId, isActive: true },
            data: { isActive: false },
        });
    }
    updateUser(where, data) {
        return this.prismaService.user.update({
            where,
            data,
            select: safeUserSelect,
        });
    }
    findUnique(where) {
        return this.prismaService.user.findUnique({
            where,
        });
    }
    update(where, data) {
        return this.prismaService.user.update({
            where,
            data,
        });
    }
};
exports.AuthRepository = AuthRepository;
exports.AuthRepository = AuthRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AuthRepository);
//# sourceMappingURL=auth.repo.js.map
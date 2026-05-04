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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const nestjs_zod_1 = require("nestjs-zod");
const config_1 = __importDefault(require("../../shared/config"));
const auth_decorator_1 = require("../../shared/decorators/auth.decorator");
const active_user_decorator_1 = require("../../shared/decorators/active-user.decorator");
const user_agent_decorator_1 = require("../../shared/decorators/user.agent.decorator");
const response_dto_1 = require("../../shared/dtos/response.dto");
const auth_service_1 = require("./auth.service");
const google_service_1 = require("./google.service");
const auth_dto_1 = require("./auth.dto");
let AuthController = class AuthController {
    constructor(authService, googleService) {
        this.authService = authService;
        this.googleService = googleService;
    }
    register(body) {
        return this.authService.register(body);
    }
    login(body, userAgent, ip) {
        return this.authService.login({ ...body, userAgent, ip });
    }
    sendOTP(body) {
        return this.authService.sendOTP(body);
    }
    forgotPassword(body) {
        return this.authService.forgotPassword(body);
    }
    refreshToken(body, userAgent, ip) {
        return this.authService.refreshToken({ refreshToken: body.refreshToken, userAgent, ip });
    }
    logout(body) {
        return this.authService.logout(body.refreshToken);
    }
    getAuthorizationUrl(userAgent, ip) {
        return this.googleService.getAuthorizationUrl({ userAgent, ip });
    }
    async googleCallback(code, state, res) {
        try {
            const data = await this.googleService.googleCallback({ code, state });
            return res.redirect(`${config_1.default.GOOGLE_CLIENT_REDIRECT_URI}?accessToken=${data.accessToken}&refreshToken=${data.refreshToken}&userId=${data.userId}`);
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Lỗi Google Callback';
            return res.redirect(`${config_1.default.GOOGLE_CLIENT_REDIRECT_URI}?error=${encodeURIComponent(message)}`);
        }
    }
    updateAvatar(userId, file) {
        return this.authService.updateAvatar(userId, file);
    }
    updateBanner(userId, file) {
        return this.authService.updateBanner(userId, file);
    }
    updatePhone(userId, body) {
        return this.authService.updatePhoneNumber(userId, body.phoneNumber);
    }
    updateProfile(userId, body) {
        return this.authService.updateProfile(userId, body.name);
    }
    updateBirthday(userId, body) {
        return this.authService.updateBirthday(userId, body.birthday);
    }
    changePassword(userId, body) {
        return this.authService.changePassword(userId, body.oldPassword, body.newPassword);
    }
    getCurrentUser(userId) {
        return this.authService.getCurrentUser(userId);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('register'),
    (0, auth_decorator_1.IsPublic)(),
    (0, nestjs_zod_1.ZodSerializerDto)(auth_dto_1.RegisterResDTO),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.RegisterBodyDTO]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('login'),
    (0, auth_decorator_1.IsPublic)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, nestjs_zod_1.ZodSerializerDto)(auth_dto_1.LoginResDTO),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_agent_decorator_1.UserAgent)()),
    __param(2, (0, common_1.Ip)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.LoginBodyDTO, String, String]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('send-otp'),
    (0, auth_decorator_1.IsPublic)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, nestjs_zod_1.ZodSerializerDto)(response_dto_1.MessageResDTO),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.SendOTPBodyDTO]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "sendOTP", null);
__decorate([
    (0, common_1.Post)('forgot-password'),
    (0, auth_decorator_1.IsPublic)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, nestjs_zod_1.ZodSerializerDto)(response_dto_1.MessageResDTO),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.ForgotPasswordBodyDTO]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "forgotPassword", null);
__decorate([
    (0, common_1.Post)('refresh-token'),
    (0, auth_decorator_1.IsPublic)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, nestjs_zod_1.ZodSerializerDto)(auth_dto_1.RefreshTokenResDTO),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_agent_decorator_1.UserAgent)()),
    __param(2, (0, common_1.Ip)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.RefreshTokenBodyDTO, String, String]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "refreshToken", null);
__decorate([
    (0, common_1.Post)('logout'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, nestjs_zod_1.ZodSerializerDto)(response_dto_1.MessageResDTO),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.LogoutBodyDTO]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "logout", null);
__decorate([
    (0, common_1.Get)('google-link'),
    (0, auth_decorator_1.IsPublic)(),
    (0, nestjs_zod_1.ZodSerializerDto)(auth_dto_1.GetAuthorizationUrlResDTO),
    __param(0, (0, user_agent_decorator_1.UserAgent)()),
    __param(1, (0, common_1.Ip)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getAuthorizationUrl", null);
__decorate([
    (0, common_1.Get)('google/callback'),
    (0, auth_decorator_1.IsPublic)(),
    __param(0, (0, common_1.Query)('code')),
    __param(1, (0, common_1.Query)('state')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleCallback", null);
__decorate([
    (0, common_1.Patch)('me/avatar'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, active_user_decorator_1.ActiveUser)('userId')),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "updateAvatar", null);
__decorate([
    (0, common_1.Patch)('me/banner'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, active_user_decorator_1.ActiveUser)('userId')),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "updateBanner", null);
__decorate([
    (0, common_1.Patch)('me/phone'),
    __param(0, (0, active_user_decorator_1.ActiveUser)('userId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, auth_dto_1.UpdatePhoneBodyDTO]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "updatePhone", null);
__decorate([
    (0, common_1.Patch)('me/profile'),
    __param(0, (0, active_user_decorator_1.ActiveUser)('userId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.Patch)('me/birthday'),
    __param(0, (0, active_user_decorator_1.ActiveUser)('userId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "updateBirthday", null);
__decorate([
    (0, common_1.Patch)('me/password'),
    __param(0, (0, active_user_decorator_1.ActiveUser)('userId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "changePassword", null);
__decorate([
    (0, common_1.Get)('me'),
    __param(0, (0, active_user_decorator_1.ActiveUser)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getCurrentUser", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        google_service_1.GoogleService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map
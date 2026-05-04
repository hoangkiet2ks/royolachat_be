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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const date_fns_1 = require("date-fns");
const ms_1 = __importDefault(require("ms"));
const common_1 = require("@nestjs/common");
require("multer");
const config_1 = __importDefault(require("../../shared/config"));
const auth_constant_1 = require("../../shared/constants/auth.constant");
const helper_1 = require("../../shared/helper");
const hashing_service_1 = require("../../shared/services/hashing.service");
const token_service_1 = require("../../shared/services/token.service");
const email_service_1 = require("../../shared/services/email.service");
const s3_service_1 = require("../../shared/services/s3.service");
const auth_repo_1 = require("./auth.repo");
const auth_error_1 = require("./auth.error");
let AuthService = class AuthService {
    constructor(hashingService, authRepository, emailService, tokenService, s3Service) {
        this.hashingService = hashingService;
        this.authRepository = authRepository;
        this.emailService = emailService;
        this.tokenService = tokenService;
        this.s3Service = s3Service;
    }
    ensureUserCanLogin(status) {
        if (status === auth_constant_1.UserStatus.BLOCKED) {
            throw auth_error_1.AccountBlockedException;
        }
        if (status === auth_constant_1.UserStatus.INACTIVE) {
            throw auth_error_1.AccountInactiveException;
        }
    }
    async validateVerificationCode({ email, code, type, }) {
        const verificationCode = await this.authRepository.findUniqueVerificationCode({
            email_type: {
                email,
                type,
            },
        });
        if (!verificationCode)
            throw auth_error_1.InvalidOTPException;
        if (verificationCode.code !== code)
            throw auth_error_1.InvalidOTPException;
        if (verificationCode.expiresAt < new Date())
            throw auth_error_1.ExpiredOTPException;
        return verificationCode;
    }
    async register(body) {
        try {
            await this.validateVerificationCode({
                email: body.email,
                code: body.code,
                type: auth_constant_1.TypeOfVerificationCode.REGISTER,
            });
            const hashedPassword = await this.hashingService.hash(body.password);
            const [user] = await Promise.all([
                this.authRepository.createUser({
                    email: body.email,
                    name: body.name,
                    phoneNumber: body.phoneNumber,
                    password: hashedPassword,
                    appRole: auth_constant_1.AppRole.USER,
                    status: auth_constant_1.UserStatus.ACTIVE,
                }),
                this.authRepository.deleteVerificationCode({
                    email_type: {
                        email: body.email,
                        type: auth_constant_1.TypeOfVerificationCode.REGISTER,
                    },
                }),
            ]);
            return user;
        }
        catch (error) {
            if ((0, helper_1.isUniqueConstraintPrismaError)(error))
                throw auth_error_1.EmailAlreadyExistsException;
            throw error;
        }
    }
    async sendOTP(body) {
        const user = await this.authRepository.findUnique({ email: body.email });
        if (body.type === auth_constant_1.TypeOfVerificationCode.REGISTER && user)
            throw auth_error_1.EmailAlreadyExistsException;
        if (body.type === auth_constant_1.TypeOfVerificationCode.FORGOT_PASSWORD && !user)
            throw auth_error_1.EmailNotFoundException;
        const code = (0, helper_1.generateOTP)();
        await this.authRepository.createVerificationCode({
            email: body.email,
            code,
            type: body.type,
            expiresAt: (0, date_fns_1.addMilliseconds)(new Date(), (0, ms_1.default)(config_1.default.OTP_EXPIRES_IN)),
        });
        const { error } = await this.emailService.sendOTP({ email: body.email, code });
        if (error)
            throw auth_error_1.FailedToSendOTPException;
        return { message: 'Gửi mã OTP thành công' };
    }
    async login(body) {
        const user = await this.authRepository.findUniqueUser({ email: body.email });
        if (!user)
            throw auth_error_1.EmailNotFoundException;
        this.ensureUserCanLogin(user.status);
        const isPasswordMatch = await this.hashingService.compare(body.password, user.password);
        if (!isPasswordMatch)
            throw auth_error_1.InvalidPasswordException;
        const device = await this.authRepository.createDevice({
            userId: user.id,
            userAgent: body.userAgent,
            ip: body.ip,
            isActive: true,
        });
        await this.authRepository.updateUser({ id: user.id }, { lastSeenAt: new Date() });
        const tokens = await this.generateTokens({
            userId: user.id,
            deviceId: device.id,
            appRole: user.appRole,
        });
        return {
            ...tokens,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            phoneNumber: user.phoneNumber,
            appRole: user.appRole,
        };
    }
    async refreshToken({ refreshToken, userAgent, ip }) {
        try {
            const { userId } = await this.tokenService.verifyRefreshToken(refreshToken);
            const refreshTokenInDb = await this.authRepository.findUniqueRefreshTokenIncludeUser({
                token: refreshToken,
            });
            if (!refreshTokenInDb)
                throw auth_error_1.RefreshTokenAlreadyUsedException;
            this.ensureUserCanLogin(refreshTokenInDb.user.status);
            await Promise.all([
                this.authRepository.updateDevice(refreshTokenInDb.deviceId, { ip, userAgent, isActive: true }),
                this.authRepository.deleteRefreshToken({ token: refreshToken }),
                this.authRepository.updateUser({ id: userId }, { lastSeenAt: new Date() }),
            ]);
            const tokens = await this.generateTokens({
                userId,
                deviceId: refreshTokenInDb.deviceId,
                appRole: refreshTokenInDb.user.appRole,
            });
            return {
                ...tokens,
                name: refreshTokenInDb.user.name,
                email: refreshTokenInDb.user.email,
                avatar: refreshTokenInDb.user.avatar,
                phoneNumber: refreshTokenInDb.user.phoneNumber,
                appRole: refreshTokenInDb.user.appRole,
            };
        }
        catch (error) {
            if (error instanceof common_1.HttpException)
                throw error;
            throw auth_error_1.UnauthorizedAccessException;
        }
    }
    async generateTokens({ userId, deviceId, appRole }) {
        const [accessToken, refreshToken] = await Promise.all([
            this.tokenService.signAccessToken({ userId, deviceId, appRole }),
            this.tokenService.signRefreshToken({ userId }),
        ]);
        const decodedRefreshToken = await this.tokenService.verifyRefreshToken(refreshToken);
        await this.authRepository.createRefreshToken({
            token: refreshToken,
            userId,
            expiresAt: new Date(decodedRefreshToken.exp * 1000),
            deviceId,
        });
        return { accessToken, refreshToken, userId };
    }
    async logout(refreshToken) {
        try {
            await this.tokenService.verifyRefreshToken(refreshToken);
            const deletedRefreshToken = await this.authRepository.deleteRefreshToken({
                token: refreshToken,
            });
            await this.authRepository.updateDevice(deletedRefreshToken.deviceId, {
                isActive: false,
            });
            return { message: 'Đăng xuất thành công' };
        }
        catch (error) {
            if ((0, helper_1.isNotFoundPrismaError)(error)) {
                throw auth_error_1.RefreshTokenAlreadyUsedException;
            }
            throw auth_error_1.UnauthorizedAccessException;
        }
    }
    async forgotPassword(body) {
        const { email, code, newPassword } = body;
        const user = await this.authRepository.findUnique({
            email,
        });
        if (!user) {
            throw auth_error_1.EmailNotFoundException;
        }
        await this.validateVerificationCode({
            email,
            code,
            type: auth_constant_1.TypeOfVerificationCode.FORGOT_PASSWORD,
        });
        const hashedPassword = await this.hashingService.hash(newPassword);
        await Promise.all([
            this.authRepository.updateUser({ id: user.id }, {
                password: hashedPassword,
            }),
            this.authRepository.deleteVerificationCode({
                email_type: {
                    email,
                    type: auth_constant_1.TypeOfVerificationCode.FORGOT_PASSWORD,
                },
            }),
            this.authRepository.deleteRefreshTokensByUserId(user.id),
            this.authRepository.deactivateDevicesByUserId(user.id),
        ]);
        return { message: 'Cập nhật mật khẩu mới thành công' };
    }
    async updateAvatar(userId, file) {
        const user = await this.authRepository.findUniqueUser({ id: userId });
        if (!user)
            throw auth_error_1.EmailNotFoundException;
        const avatarUrl = await this.s3Service.uploadImage(file, 'avatars');
        if (user.avatar) {
            await this.s3Service.deleteFile(user.avatar);
        }
        const updatedUser = await this.authRepository.updateUser({ id: userId }, { avatar: avatarUrl });
        return {
            avatar: updatedUser.avatar,
            email: updatedUser.email,
            name: updatedUser.name,
            phoneNumber: updatedUser.phoneNumber,
            id: updatedUser.id,
        };
    }
    async updateBanner(userId, file) {
        if (!file) {
            throw new common_1.HttpException('File không hợp lệ', 400);
        }
        const user = await this.authRepository.findUniqueUser({ id: userId });
        if (!user)
            throw auth_error_1.EmailNotFoundException;
        const bannerUrl = await this.s3Service.uploadImage(file, 'banners');
        const updatedUser = await this.authRepository.updateUser({ id: userId }, { banner: bannerUrl });
        return {
            banner: updatedUser.banner,
            message: 'Cập nhật ảnh bìa thành công',
        };
    }
    async updatePhoneNumber(userId, phoneNumber) {
        const updatedUser = await this.authRepository.updateUser({ id: userId }, { phoneNumber });
        return {
            phoneNumber: updatedUser.phoneNumber,
            email: updatedUser.email,
            name: updatedUser.name,
            avatar: updatedUser.avatar,
            id: updatedUser.id,
        };
    }
    async getCurrentUser(userId) {
        const user = await this.authRepository.findUniqueUser({ id: userId });
        if (!user)
            throw auth_error_1.EmailNotFoundException;
        return {
            id: user.id,
            email: user.email,
            name: user.name,
            avatar: user.avatar,
            banner: user.banner,
            phoneNumber: user.phoneNumber,
            appRole: user.appRole,
            createdAt: user.createdAt,
            birthday: user.birthday,
        };
    }
    async updateProfile(userId, name) {
        if (!name || name.trim().length === 0) {
            throw new common_1.HttpException('Tên không được để trống', 400);
        }
        if (name.trim().length > 100) {
            throw new common_1.HttpException('Tên không được quá 100 ký tự', 400);
        }
        const updatedUser = await this.authRepository.updateUser({ id: userId }, { name: name.trim() });
        return {
            message: 'Cập nhật tên thành công',
            name: updatedUser.name,
        };
    }
    async updateBirthday(userId, birthday) {
        const date = new Date(birthday);
        if (isNaN(date.getTime())) {
            throw new common_1.HttpException('Ngày sinh không hợp lệ', 400);
        }
        const updatedUser = await this.authRepository.updateUser({ id: userId }, { birthday: date });
        return {
            message: 'Cập nhật ngày sinh thành công',
            birthday: updatedUser.birthday,
        };
    }
    async changePassword(userId, oldPassword, newPassword) {
        const user = await this.authRepository.findUniqueUser({ id: userId });
        if (!user)
            throw auth_error_1.EmailNotFoundException;
        const isPasswordValid = await this.hashingService.compare(oldPassword, user.password);
        if (!isPasswordValid) {
            throw new common_1.HttpException('Mật khẩu cũ không đúng', 400);
        }
        const hashedPassword = await this.hashingService.hash(newPassword);
        await this.authRepository.updateUser({ id: userId }, { password: hashedPassword });
        return {
            message: 'Đổi mật khẩu thành công',
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [hashing_service_1.HashingService,
        auth_repo_1.AuthRepository,
        email_service_1.EmailService,
        token_service_1.TokenService,
        s3_service_1.S3Service])
], AuthService);
//# sourceMappingURL=auth.service.js.map
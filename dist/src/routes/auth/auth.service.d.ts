import 'multer';
import { TypeOfVerificationCodeType } from '@/shared/constants/auth.constant';
import { HashingService } from '@/shared/services/hashing.service';
import { TokenService } from '@/shared/services/token.service';
import { EmailService } from '@/shared/services/email.service';
import { S3Service } from '@/shared/services/s3.service';
import { AccessTokenPayloadCreate } from '@/shared/types/jwt.type';
import { ForgotPasswordBodyType, LoginBodyType, RefreshTokenBodyType, RegisterBodyType, SendOTPBodyType } from './auth.model';
import { AuthRepository } from './auth.repo';
export declare class AuthService {
    private readonly hashingService;
    private readonly authRepository;
    private readonly emailService;
    private readonly tokenService;
    private readonly s3Service;
    constructor(hashingService: HashingService, authRepository: AuthRepository, emailService: EmailService, tokenService: TokenService, s3Service: S3Service);
    private ensureUserCanLogin;
    validateVerificationCode({ email, code, type, }: {
        email: string;
        code: string;
        type: TypeOfVerificationCodeType;
    }): Promise<{
        id: number;
        email: string;
        createdAt: Date;
        code: string;
        type: import("../../generated/prisma/enums").VerificationCodeType;
        expiresAt: Date;
    }>;
    register(body: RegisterBodyType): Promise<{
        id: number;
        email: string;
        name: string;
        phoneNumber: string;
        avatar: string | null;
        banner: string | null;
        birthday: Date | null;
        appRole: import("../../generated/prisma/enums").AppRole;
        status: import("../../generated/prisma/enums").UserStatus;
        lastSeenAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    sendOTP(body: SendOTPBodyType): Promise<{
        message: string;
    }>;
    login(body: LoginBodyType & {
        userAgent: string;
        ip: string;
    }): Promise<{
        name: string;
        email: string;
        avatar: string | null;
        phoneNumber: string;
        appRole: import("../../generated/prisma/enums").AppRole;
        accessToken: string;
        refreshToken: string;
        userId: number;
    }>;
    refreshToken({ refreshToken, userAgent, ip }: RefreshTokenBodyType & {
        userAgent: string;
        ip: string;
    }): Promise<{
        name: string;
        email: string;
        avatar: string | null;
        phoneNumber: string;
        appRole: import("../../generated/prisma/enums").AppRole;
        accessToken: string;
        refreshToken: string;
        userId: number;
    }>;
    generateTokens({ userId, deviceId, appRole }: AccessTokenPayloadCreate): Promise<{
        accessToken: string;
        refreshToken: string;
        userId: number;
    }>;
    logout(refreshToken: string): Promise<{
        message: string;
    }>;
    forgotPassword(body: ForgotPasswordBodyType): Promise<{
        message: string;
    }>;
    updateAvatar(userId: number, file: Express.Multer.File): Promise<{
        avatar: string | null;
        email: string;
        name: string;
        phoneNumber: string;
        id: number;
    }>;
    updateBanner(userId: number, file: Express.Multer.File): Promise<{
        banner: string | null;
        message: string;
    }>;
    updatePhoneNumber(userId: number, phoneNumber: string): Promise<{
        phoneNumber: string;
        email: string;
        name: string;
        avatar: string | null;
        id: number;
    }>;
    getCurrentUser(userId: number): Promise<{
        id: number;
        email: string;
        name: string;
        avatar: string | null;
        banner: string | null;
        phoneNumber: string;
        appRole: import("../../generated/prisma/enums").AppRole;
        createdAt: Date;
        birthday: Date | null;
    }>;
    updateProfile(userId: number, name: string): Promise<{
        message: string;
        name: string;
    }>;
    updateBirthday(userId: number, birthday: string): Promise<{
        message: string;
        birthday: Date | null;
    }>;
    changePassword(userId: number, oldPassword: string, newPassword: string): Promise<{
        message: string;
    }>;
}

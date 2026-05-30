import { Response } from 'express';
import { AuthService } from './auth.service';
import { GoogleService } from './google.service';
import { DisableTwoFactorBodyDTO, ForgotPasswordBodyDTO, LoginBodyDTO, LogoutBodyDTO, RefreshTokenBodyDTO, RegisterBodyDTO, SendOTPBodyDTO, UpdatePhoneBodyDTO } from './auth.dto';
import { EmptyBodyDTO } from '@/shared/dtos/request.dto';
export declare class AuthController {
    private readonly authService;
    private readonly googleService;
    constructor(authService: AuthService, googleService: GoogleService);
    register(body: RegisterBodyDTO): Promise<{
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
    login(body: LoginBodyDTO, userAgent: string, ip: string): Promise<{
        require2FA: boolean;
    } | {
        name: string;
        email: string;
        avatar: string | null;
        phoneNumber: string;
        appRole: import("../../generated/prisma/enums").AppRole;
        is2FAEnabled: boolean;
        accessToken: string;
        refreshToken: string;
        userId: number;
        require2FA?: undefined;
    }>;
    sendOTP(body: SendOTPBodyDTO): Promise<{
        message: string;
    }>;
    forgotPassword(body: ForgotPasswordBodyDTO): Promise<{
        message: string;
    }>;
    refreshToken(body: RefreshTokenBodyDTO, userAgent: string, ip: string): Promise<{
        name: string;
        email: string;
        avatar: string | null;
        phoneNumber: string;
        appRole: import("../../generated/prisma/enums").AppRole;
        is2FAEnabled: boolean;
        accessToken: string;
        refreshToken: string;
        userId: number;
    }>;
    logout(body: LogoutBodyDTO): Promise<{
        message: string;
    }>;
    getAuthorizationUrl(userAgent: string, ip: string): Promise<{
        url: string;
    }>;
    googleCallback(code: string, state: string, res: Response): Promise<void>;
    setupTwoFactorAuth(_: EmptyBodyDTO, userId: number): Promise<{
        secret: string;
        uri: string;
    }>;
    disableTwoFactorAuth(body: DisableTwoFactorBodyDTO, userId: number): Promise<{
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
    updatePhone(userId: number, body: UpdatePhoneBodyDTO): Promise<{
        phoneNumber: string;
        email: string;
        name: string;
        avatar: string | null;
        id: number;
    }>;
    updateProfile(userId: number, body: {
        name: string;
    }): Promise<{
        message: string;
        name: string;
    }>;
    updateBirthday(userId: number, body: {
        birthday: string;
    }): Promise<{
        message: string;
        birthday: Date | null;
    }>;
    changePassword(userId: number, body: {
        oldPassword: string;
        newPassword: string;
    }): Promise<{
        message: string;
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
        is2FAEnabled: boolean;
    }>;
}

import z from 'zod';
export declare const UserSchema: z.ZodObject<{
    id: z.ZodNumber;
    email: z.ZodString;
    password: z.ZodString;
    name: z.ZodString;
    phoneNumber: z.ZodString;
    avatar: z.ZodNullable<z.ZodString>;
    appRole: z.ZodEnum<{
        USER: "USER";
        ADMIN: "ADMIN";
    }>;
    totpSecret: z.ZodNullable<z.ZodString>;
    status: z.ZodEnum<{
        BLOCKED: "BLOCKED";
        ACTIVE: "ACTIVE";
        INACTIVE: "INACTIVE";
    }>;
    lastSeenAt: z.ZodNullable<z.ZodDate>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, z.core.$strip>;
export declare const SafeUserSchema: z.ZodObject<{
    id: z.ZodNumber;
    email: z.ZodString;
    name: z.ZodString;
    phoneNumber: z.ZodString;
    avatar: z.ZodNullable<z.ZodString>;
    appRole: z.ZodEnum<{
        USER: "USER";
        ADMIN: "ADMIN";
    }>;
    status: z.ZodEnum<{
        BLOCKED: "BLOCKED";
        ACTIVE: "ACTIVE";
        INACTIVE: "INACTIVE";
    }>;
    lastSeenAt: z.ZodNullable<z.ZodDate>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, z.core.$strip>;
export declare const RegisterBodySchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    name: z.ZodString;
    phoneNumber: z.ZodString;
    confirmPassword: z.ZodString;
    code: z.ZodString;
}, z.core.$strict>;
export declare const RegisterResSchema: z.ZodObject<{
    id: z.ZodNumber;
    email: z.ZodString;
    name: z.ZodString;
    phoneNumber: z.ZodString;
    avatar: z.ZodNullable<z.ZodString>;
    appRole: z.ZodEnum<{
        USER: "USER";
        ADMIN: "ADMIN";
    }>;
    status: z.ZodEnum<{
        BLOCKED: "BLOCKED";
        ACTIVE: "ACTIVE";
        INACTIVE: "INACTIVE";
    }>;
    lastSeenAt: z.ZodNullable<z.ZodDate>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, z.core.$strip>;
export declare const VerificationCodeSchema: z.ZodObject<{
    id: z.ZodNumber;
    email: z.ZodString;
    code: z.ZodString;
    type: z.ZodEnum<{
        REGISTER: "REGISTER";
        FORGOT_PASSWORD: "FORGOT_PASSWORD";
    }>;
    expiresAt: z.ZodDate;
    createdAt: z.ZodDate;
}, z.core.$strip>;
export declare const SendOTPBodySchema: z.ZodObject<{
    email: z.ZodString;
    type: z.ZodEnum<{
        REGISTER: "REGISTER";
        FORGOT_PASSWORD: "FORGOT_PASSWORD";
    }>;
}, z.core.$strict>;
export declare const LoginBodySchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, z.core.$strict>;
export declare const LoginResSchema: z.ZodObject<{
    accessToken: z.ZodString;
    refreshToken: z.ZodString;
    userId: z.ZodNumber;
    name: z.ZodString;
    email: z.ZodString;
    avatar: z.ZodNullable<z.ZodString>;
    phoneNumber: z.ZodString;
    appRole: z.ZodEnum<{
        USER: "USER";
        ADMIN: "ADMIN";
    }>;
}, z.core.$strip>;
export declare const RefreshTokenBodySchema: z.ZodObject<{
    refreshToken: z.ZodString;
}, z.core.$strict>;
export declare const RefreshTokenResSchema: z.ZodObject<{
    accessToken: z.ZodString;
    refreshToken: z.ZodString;
    userId: z.ZodNumber;
    name: z.ZodString;
    email: z.ZodString;
    avatar: z.ZodNullable<z.ZodString>;
    phoneNumber: z.ZodString;
    appRole: z.ZodEnum<{
        USER: "USER";
        ADMIN: "ADMIN";
    }>;
}, z.core.$strip>;
export declare const DeviceSchema: z.ZodObject<{
    id: z.ZodNumber;
    userId: z.ZodNumber;
    userAgent: z.ZodString;
    ip: z.ZodString;
    isActive: z.ZodBoolean;
    lastActive: z.ZodDate;
    createdAt: z.ZodDate;
}, z.core.$strip>;
export declare const RefreshTokenSchema: z.ZodObject<{
    token: z.ZodString;
    userId: z.ZodNumber;
    deviceId: z.ZodNumber;
    expiresAt: z.ZodDate;
    createdAt: z.ZodDate;
}, z.core.$strip>;
export declare const LogoutBodySchema: z.ZodObject<{
    refreshToken: z.ZodString;
}, z.core.$strict>;
export declare const GoogleAuthStateSchema: z.ZodObject<{
    userAgent: z.ZodString;
    ip: z.ZodString;
}, z.core.$strip>;
export declare const GetAuthorizationUrlResSchema: z.ZodObject<{
    url: z.ZodString;
}, z.core.$strip>;
export declare const ForgotPasswordBodySchema: z.ZodObject<{
    email: z.ZodString;
    code: z.ZodString;
    newPassword: z.ZodString;
    confirmNewPassword: z.ZodString;
}, z.core.$strict>;
export type UserType = z.infer<typeof UserSchema>;
export type RegisterBodyType = z.infer<typeof RegisterBodySchema>;
export type RegisterResType = z.infer<typeof RegisterResSchema>;
export type VerificationCodeType = z.infer<typeof VerificationCodeSchema>;
export type SendOTPBodyType = z.infer<typeof SendOTPBodySchema>;
export type LoginBodyType = z.infer<typeof LoginBodySchema>;
export type LoginResType = z.infer<typeof LoginResSchema>;
export type RefreshTokenType = z.infer<typeof RefreshTokenSchema>;
export type RefreshTokenBodyType = z.infer<typeof RefreshTokenBodySchema>;
export type RefreshTokenResType = z.infer<typeof RefreshTokenResSchema>;
export type DeviceType = z.infer<typeof DeviceSchema>;
export declare const UpdatePhoneBodySchema: z.ZodObject<{
    phoneNumber: z.ZodString;
}, z.core.$strict>;
export type UpdatePhoneBodyType = z.infer<typeof UpdatePhoneBodySchema>;
export type LogoutBodyType = z.infer<typeof LogoutBodySchema>;
export type GoogleAuthStateType = z.infer<typeof GoogleAuthStateSchema>;
export type GetAuthorizationUrlResType = z.infer<typeof GetAuthorizationUrlResSchema>;
export type ForgotPasswordBodyType = z.infer<typeof ForgotPasswordBodySchema>;

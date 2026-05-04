declare const RegisterBodyDTO_base: import("nestjs-zod").ZodDto<import("zod").ZodObject<{
    email: import("zod").ZodString;
    password: import("zod").ZodString;
    name: import("zod").ZodString;
    phoneNumber: import("zod").ZodString;
    confirmPassword: import("zod").ZodString;
    code: import("zod").ZodString;
}, import("zod/v4/core").$strict>, false>;
export declare class RegisterBodyDTO extends RegisterBodyDTO_base {
}
declare const RegisterResDTO_base: import("nestjs-zod").ZodDto<import("zod").ZodObject<{
    id: import("zod").ZodNumber;
    email: import("zod").ZodString;
    name: import("zod").ZodString;
    phoneNumber: import("zod").ZodString;
    avatar: import("zod").ZodNullable<import("zod").ZodString>;
    appRole: import("zod").ZodEnum<{
        USER: "USER";
        ADMIN: "ADMIN";
    }>;
    status: import("zod").ZodEnum<{
        BLOCKED: "BLOCKED";
        ACTIVE: "ACTIVE";
        INACTIVE: "INACTIVE";
    }>;
    lastSeenAt: import("zod").ZodNullable<import("zod").ZodDate>;
    createdAt: import("zod").ZodDate;
    updatedAt: import("zod").ZodDate;
}, import("zod/v4/core").$strip>, false>;
export declare class RegisterResDTO extends RegisterResDTO_base {
}
declare const SendOTPBodyDTO_base: import("nestjs-zod").ZodDto<import("zod").ZodObject<{
    email: import("zod").ZodString;
    type: import("zod").ZodEnum<{
        REGISTER: "REGISTER";
        FORGOT_PASSWORD: "FORGOT_PASSWORD";
    }>;
}, import("zod/v4/core").$strict>, false>;
export declare class SendOTPBodyDTO extends SendOTPBodyDTO_base {
}
declare const LoginBodyDTO_base: import("nestjs-zod").ZodDto<import("zod").ZodObject<{
    email: import("zod").ZodString;
    password: import("zod").ZodString;
}, import("zod/v4/core").$strict>, false>;
export declare class LoginBodyDTO extends LoginBodyDTO_base {
}
declare const LoginResDTO_base: import("nestjs-zod").ZodDto<import("zod").ZodObject<{
    accessToken: import("zod").ZodString;
    refreshToken: import("zod").ZodString;
    userId: import("zod").ZodNumber;
    name: import("zod").ZodString;
    email: import("zod").ZodString;
    avatar: import("zod").ZodNullable<import("zod").ZodString>;
    phoneNumber: import("zod").ZodString;
    appRole: import("zod").ZodEnum<{
        USER: "USER";
        ADMIN: "ADMIN";
    }>;
}, import("zod/v4/core").$strip>, false>;
export declare class LoginResDTO extends LoginResDTO_base {
}
declare const RefreshTokenDTO_base: import("nestjs-zod").ZodDto<import("zod").ZodObject<{
    token: import("zod").ZodString;
    userId: import("zod").ZodNumber;
    deviceId: import("zod").ZodNumber;
    expiresAt: import("zod").ZodDate;
    createdAt: import("zod").ZodDate;
}, import("zod/v4/core").$strip>, false>;
export declare class RefreshTokenDTO extends RefreshTokenDTO_base {
}
declare const RefreshTokenBodyDTO_base: import("nestjs-zod").ZodDto<import("zod").ZodObject<{
    refreshToken: import("zod").ZodString;
}, import("zod/v4/core").$strict>, false>;
export declare class RefreshTokenBodyDTO extends RefreshTokenBodyDTO_base {
}
declare const RefreshTokenResDTO_base: import("nestjs-zod").ZodDto<import("zod").ZodObject<{
    accessToken: import("zod").ZodString;
    refreshToken: import("zod").ZodString;
    userId: import("zod").ZodNumber;
    name: import("zod").ZodString;
    email: import("zod").ZodString;
    avatar: import("zod").ZodNullable<import("zod").ZodString>;
    phoneNumber: import("zod").ZodString;
    appRole: import("zod").ZodEnum<{
        USER: "USER";
        ADMIN: "ADMIN";
    }>;
}, import("zod/v4/core").$strip>, false>;
export declare class RefreshTokenResDTO extends RefreshTokenResDTO_base {
}
declare const LogoutBodyDTO_base: import("nestjs-zod").ZodDto<import("zod").ZodObject<{
    refreshToken: import("zod").ZodString;
}, import("zod/v4/core").$strict>, false>;
export declare class LogoutBodyDTO extends LogoutBodyDTO_base {
}
declare const GetAuthorizationUrlResDTO_base: import("nestjs-zod").ZodDto<import("zod").ZodObject<{
    url: import("zod").ZodString;
}, import("zod/v4/core").$strip>, false>;
export declare class GetAuthorizationUrlResDTO extends GetAuthorizationUrlResDTO_base {
}
declare const ForgotPasswordBodyDTO_base: import("nestjs-zod").ZodDto<import("zod").ZodObject<{
    email: import("zod").ZodString;
    code: import("zod").ZodString;
    newPassword: import("zod").ZodString;
    confirmNewPassword: import("zod").ZodString;
}, import("zod/v4/core").$strict>, false>;
export declare class ForgotPasswordBodyDTO extends ForgotPasswordBodyDTO_base {
}
declare const UpdatePhoneBodyDTO_base: import("nestjs-zod").ZodDto<import("zod").ZodObject<{
    phoneNumber: import("zod").ZodString;
}, import("zod/v4/core").$strict>, false>;
export declare class UpdatePhoneBodyDTO extends UpdatePhoneBodyDTO_base {
}
export {};

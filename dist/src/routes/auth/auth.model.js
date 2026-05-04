"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePhoneBodySchema = exports.ForgotPasswordBodySchema = exports.GetAuthorizationUrlResSchema = exports.GoogleAuthStateSchema = exports.LogoutBodySchema = exports.RefreshTokenSchema = exports.DeviceSchema = exports.RefreshTokenResSchema = exports.RefreshTokenBodySchema = exports.LoginResSchema = exports.LoginBodySchema = exports.SendOTPBodySchema = exports.VerificationCodeSchema = exports.RegisterResSchema = exports.RegisterBodySchema = exports.SafeUserSchema = exports.UserSchema = void 0;
const auth_constant_1 = require("../../shared/constants/auth.constant");
const zod_1 = __importDefault(require("zod"));
exports.UserSchema = zod_1.default.object({
    id: zod_1.default.number(),
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(6).max(500),
    name: zod_1.default.string().max(500),
    phoneNumber: zod_1.default.string().max(50),
    avatar: zod_1.default.string().max(1000).nullable(),
    appRole: zod_1.default.enum([auth_constant_1.AppRole.USER, auth_constant_1.AppRole.ADMIN]),
    totpSecret: zod_1.default.string().max(1000).nullable(),
    status: zod_1.default.enum([auth_constant_1.UserStatus.ACTIVE, auth_constant_1.UserStatus.INACTIVE, auth_constant_1.UserStatus.BLOCKED]),
    lastSeenAt: zod_1.default.date().nullable(),
    createdAt: zod_1.default.date(),
    updatedAt: zod_1.default.date(),
});
exports.SafeUserSchema = exports.UserSchema.omit({
    password: true,
    totpSecret: true,
});
exports.RegisterBodySchema = exports.UserSchema.pick({
    email: true,
    password: true,
    name: true,
    phoneNumber: true,
})
    .extend({
    password: zod_1.default.string().min(6).max(500),
    name: zod_1.default.string().min(1).max(500),
    phoneNumber: zod_1.default.string().min(1).max(50),
    confirmPassword: zod_1.default.string().min(6).max(500),
    code: zod_1.default.string().length(6),
})
    .strict()
    .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
        ctx.addIssue({
            code: 'custom',
            message: 'Password and confirm password must match',
            path: ['confirmPassword'],
        });
    }
});
exports.RegisterResSchema = exports.SafeUserSchema;
exports.VerificationCodeSchema = zod_1.default.object({
    id: zod_1.default.number(),
    email: zod_1.default.string().email(),
    code: zod_1.default.string().length(6),
    type: zod_1.default.enum([auth_constant_1.TypeOfVerificationCode.FORGOT_PASSWORD, auth_constant_1.TypeOfVerificationCode.REGISTER]),
    expiresAt: zod_1.default.date(),
    createdAt: zod_1.default.date(),
});
exports.SendOTPBodySchema = exports.VerificationCodeSchema.pick({
    email: true,
    type: true,
}).strict();
exports.LoginBodySchema = zod_1.default
    .object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(6).max(500),
})
    .strict();
exports.LoginResSchema = zod_1.default.object({
    accessToken: zod_1.default.string(),
    refreshToken: zod_1.default.string(),
    userId: zod_1.default.number(),
    name: zod_1.default.string(),
    email: zod_1.default.string(),
    avatar: zod_1.default.string().nullable(),
    phoneNumber: zod_1.default.string(),
    appRole: zod_1.default.enum([auth_constant_1.AppRole.USER, auth_constant_1.AppRole.ADMIN]),
});
exports.RefreshTokenBodySchema = zod_1.default
    .object({
    refreshToken: zod_1.default.string(),
})
    .strict();
exports.RefreshTokenResSchema = exports.LoginResSchema;
exports.DeviceSchema = zod_1.default.object({
    id: zod_1.default.number(),
    userId: zod_1.default.number(),
    userAgent: zod_1.default.string(),
    ip: zod_1.default.string(),
    isActive: zod_1.default.boolean(),
    lastActive: zod_1.default.date(),
    createdAt: zod_1.default.date(),
});
exports.RefreshTokenSchema = zod_1.default.object({
    token: zod_1.default.string(),
    userId: zod_1.default.number(),
    deviceId: zod_1.default.number(),
    expiresAt: zod_1.default.date(),
    createdAt: zod_1.default.date(),
});
exports.LogoutBodySchema = exports.RefreshTokenBodySchema;
exports.GoogleAuthStateSchema = exports.DeviceSchema.pick({
    userAgent: true,
    ip: true,
});
exports.GetAuthorizationUrlResSchema = zod_1.default.object({
    url: zod_1.default.string().url(),
});
exports.ForgotPasswordBodySchema = zod_1.default
    .object({
    email: zod_1.default.string().email(),
    code: zod_1.default.string().length(6),
    newPassword: zod_1.default.string().min(6).max(500),
    confirmNewPassword: zod_1.default.string().min(6).max(500),
})
    .strict()
    .superRefine(({ confirmNewPassword, newPassword }, ctx) => {
    if (confirmNewPassword !== newPassword) {
        ctx.addIssue({
            code: 'custom',
            message: 'Mật khẩu và mật khẩu xác nhận phải giống nhau',
            path: ['confirmNewPassword'],
        });
    }
});
exports.UpdatePhoneBodySchema = zod_1.default.object({
    phoneNumber: zod_1.default.string().min(1).max(50),
}).strict();
//# sourceMappingURL=auth.model.js.map
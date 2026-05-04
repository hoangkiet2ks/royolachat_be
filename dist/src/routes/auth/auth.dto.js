"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePhoneBodyDTO = exports.ForgotPasswordBodyDTO = exports.GetAuthorizationUrlResDTO = exports.LogoutBodyDTO = exports.RefreshTokenResDTO = exports.RefreshTokenBodyDTO = exports.RefreshTokenDTO = exports.LoginResDTO = exports.LoginBodyDTO = exports.SendOTPBodyDTO = exports.RegisterResDTO = exports.RegisterBodyDTO = void 0;
const nestjs_zod_1 = require("nestjs-zod");
const auth_model_1 = require("./auth.model");
class RegisterBodyDTO extends (0, nestjs_zod_1.createZodDto)(auth_model_1.RegisterBodySchema) {
}
exports.RegisterBodyDTO = RegisterBodyDTO;
class RegisterResDTO extends (0, nestjs_zod_1.createZodDto)(auth_model_1.RegisterResSchema) {
}
exports.RegisterResDTO = RegisterResDTO;
class SendOTPBodyDTO extends (0, nestjs_zod_1.createZodDto)(auth_model_1.SendOTPBodySchema) {
}
exports.SendOTPBodyDTO = SendOTPBodyDTO;
class LoginBodyDTO extends (0, nestjs_zod_1.createZodDto)(auth_model_1.LoginBodySchema) {
}
exports.LoginBodyDTO = LoginBodyDTO;
class LoginResDTO extends (0, nestjs_zod_1.createZodDto)(auth_model_1.LoginResSchema) {
}
exports.LoginResDTO = LoginResDTO;
class RefreshTokenDTO extends (0, nestjs_zod_1.createZodDto)(auth_model_1.RefreshTokenSchema) {
}
exports.RefreshTokenDTO = RefreshTokenDTO;
class RefreshTokenBodyDTO extends (0, nestjs_zod_1.createZodDto)(auth_model_1.RefreshTokenBodySchema) {
}
exports.RefreshTokenBodyDTO = RefreshTokenBodyDTO;
class RefreshTokenResDTO extends (0, nestjs_zod_1.createZodDto)(auth_model_1.RefreshTokenResSchema) {
}
exports.RefreshTokenResDTO = RefreshTokenResDTO;
class LogoutBodyDTO extends (0, nestjs_zod_1.createZodDto)(auth_model_1.LogoutBodySchema) {
}
exports.LogoutBodyDTO = LogoutBodyDTO;
class GetAuthorizationUrlResDTO extends (0, nestjs_zod_1.createZodDto)(auth_model_1.GetAuthorizationUrlResSchema) {
}
exports.GetAuthorizationUrlResDTO = GetAuthorizationUrlResDTO;
class ForgotPasswordBodyDTO extends (0, nestjs_zod_1.createZodDto)(auth_model_1.ForgotPasswordBodySchema) {
}
exports.ForgotPasswordBodyDTO = ForgotPasswordBodyDTO;
class UpdatePhoneBodyDTO extends (0, nestjs_zod_1.createZodDto)(auth_model_1.UpdatePhoneBodySchema) {
}
exports.UpdatePhoneBodyDTO = UpdatePhoneBodyDTO;
//# sourceMappingURL=auth.dto.js.map
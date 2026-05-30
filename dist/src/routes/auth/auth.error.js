"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountBlockedException = exports.AccountInactiveException = exports.GoogleUserInfoError = exports.UnauthorizedAccessException = exports.RefreshTokenAlreadyUsedException = exports.InvalidTOTPException = exports.TOTPNotEnabledException = exports.TOTPAlreadyEnabledException = exports.InvalidPasswordException = exports.EmailNotFoundException = exports.EmailAlreadyExistsException = exports.FailedToSendOTPException = exports.ExpiredOTPException = exports.InvalidOTPException = void 0;
const common_1 = require("@nestjs/common");
exports.InvalidOTPException = new common_1.UnprocessableEntityException([
    {
        message: 'Error.InvalidOTP',
        path: 'code',
    },
]);
exports.ExpiredOTPException = new common_1.UnprocessableEntityException([
    {
        message: 'Error.ExpiredOTP',
        path: 'code',
    },
]);
exports.FailedToSendOTPException = new common_1.UnprocessableEntityException([
    {
        message: 'Error.FailedToSendOTP',
        path: 'code',
    },
]);
exports.EmailAlreadyExistsException = new common_1.UnprocessableEntityException([
    {
        message: 'Error.EmailAlreadyExists',
        path: 'email',
    },
]);
exports.EmailNotFoundException = new common_1.UnprocessableEntityException([
    {
        message: 'Error.EmailNotFound',
        path: 'email',
    },
]);
exports.InvalidPasswordException = new common_1.UnprocessableEntityException([
    {
        message: 'Error.InvalidPassword',
        path: 'password',
    },
]);
exports.TOTPAlreadyEnabledException = new common_1.UnprocessableEntityException([
    {
        message: 'Error.TOTPAlreadyEnabled',
        path: 'totpCode',
    },
]);
exports.TOTPNotEnabledException = new common_1.UnprocessableEntityException([
    {
        message: 'Error.TOTPNotEnabled',
        path: 'totpCode',
    },
]);
exports.InvalidTOTPException = new common_1.UnprocessableEntityException([
    {
        message: 'Error.InvalidTOTP',
        path: 'totpCode',
    },
]);
exports.RefreshTokenAlreadyUsedException = new common_1.UnauthorizedException('Error.RefreshTokenAlreadyUsed');
exports.UnauthorizedAccessException = new common_1.UnauthorizedException('Error.UnauthorizedAccess');
exports.GoogleUserInfoError = new Error('Error.FailedToGetGoogleUserInfo');
exports.AccountInactiveException = new common_1.UnauthorizedException('Error.AccountInactive');
exports.AccountBlockedException = new common_1.UnauthorizedException('Error.AccountBlocked');
//# sourceMappingURL=auth.error.js.map
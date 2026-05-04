"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeOfVerificationCode = exports.AppRole = exports.UserStatus = exports.AuthType = exports.REQUEST_USER_KEY = void 0;
exports.REQUEST_USER_KEY = 'user';
exports.AuthType = {
    Bearer: 'Bearer',
    None: 'None',
};
exports.UserStatus = {
    ACTIVE: 'ACTIVE',
    INACTIVE: 'INACTIVE',
    BLOCKED: 'BLOCKED',
};
exports.AppRole = {
    USER: 'USER',
    ADMIN: 'ADMIN',
};
exports.TypeOfVerificationCode = {
    REGISTER: 'REGISTER',
    FORGOT_PASSWORD: 'FORGOT_PASSWORD',
};
//# sourceMappingURL=auth.constant.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStatus = exports.VerificationCodeType = exports.FriendshipStatus = exports.MessageType = exports.MemberRole = exports.AppRole = void 0;
exports.AppRole = {
    USER: 'USER',
    ADMIN: 'ADMIN'
};
exports.MemberRole = {
    MEMBER: 'MEMBER',
    ADMIN: 'ADMIN',
    DEPUTY: 'DEPUTY'
};
exports.MessageType = {
    TEXT: 'TEXT',
    IMAGE: 'IMAGE',
    FILE: 'FILE',
    SYSTEM: 'SYSTEM',
    CALL_LOG: 'CALL_LOG'
};
exports.FriendshipStatus = {
    PENDING: 'PENDING',
    ACCEPTED: 'ACCEPTED',
    BLOCKED: 'BLOCKED'
};
exports.VerificationCodeType = {
    REGISTER: 'REGISTER',
    FORGOT_PASSWORD: 'FORGOT_PASSWORD'
};
exports.UserStatus = {
    ACTIVE: 'ACTIVE',
    INACTIVE: 'INACTIVE',
    BLOCKED: 'BLOCKED'
};
//# sourceMappingURL=enums.js.map
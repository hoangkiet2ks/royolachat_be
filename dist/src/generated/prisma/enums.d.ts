export declare const AppRole: {
    readonly USER: "USER";
    readonly ADMIN: "ADMIN";
};
export type AppRole = (typeof AppRole)[keyof typeof AppRole];
export declare const MemberRole: {
    readonly MEMBER: "MEMBER";
    readonly ADMIN: "ADMIN";
    readonly DEPUTY: "DEPUTY";
};
export type MemberRole = (typeof MemberRole)[keyof typeof MemberRole];
export declare const MessageType: {
    readonly TEXT: "TEXT";
    readonly IMAGE: "IMAGE";
    readonly FILE: "FILE";
    readonly SYSTEM: "SYSTEM";
    readonly CALL_LOG: "CALL_LOG";
};
export type MessageType = (typeof MessageType)[keyof typeof MessageType];
export declare const FriendshipStatus: {
    readonly PENDING: "PENDING";
    readonly ACCEPTED: "ACCEPTED";
    readonly BLOCKED: "BLOCKED";
};
export type FriendshipStatus = (typeof FriendshipStatus)[keyof typeof FriendshipStatus];
export declare const VerificationCodeType: {
    readonly REGISTER: "REGISTER";
    readonly FORGOT_PASSWORD: "FORGOT_PASSWORD";
};
export type VerificationCodeType = (typeof VerificationCodeType)[keyof typeof VerificationCodeType];
export declare const UserStatus: {
    readonly ACTIVE: "ACTIVE";
    readonly INACTIVE: "INACTIVE";
    readonly BLOCKED: "BLOCKED";
};
export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus];

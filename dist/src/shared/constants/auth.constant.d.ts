export declare const REQUEST_USER_KEY = "user";
export declare const AuthType: {
    readonly Bearer: "Bearer";
    readonly None: "None";
};
export type AuthTypeType = (typeof AuthType)[keyof typeof AuthType];
export declare const UserStatus: {
    readonly ACTIVE: "ACTIVE";
    readonly INACTIVE: "INACTIVE";
    readonly BLOCKED: "BLOCKED";
};
export declare const AppRole: {
    readonly USER: "USER";
    readonly ADMIN: "ADMIN";
};
export type AppRoleType = (typeof AppRole)[keyof typeof AppRole];
export declare const TypeOfVerificationCode: {
    readonly REGISTER: "REGISTER";
    readonly FORGOT_PASSWORD: "FORGOT_PASSWORD";
};
export type TypeOfVerificationCodeType = (typeof TypeOfVerificationCode)[keyof typeof TypeOfVerificationCode];

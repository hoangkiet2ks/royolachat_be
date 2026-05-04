import { AuthTypeType } from 'src/shared/constants/auth.constant';
export declare const AUTH_TYPE_KEY = "authType";
export declare const Auth: (authType?: AuthTypeType) => import("@nestjs/common").CustomDecorator<string>;
export declare const IsPublic: () => import("@nestjs/common").CustomDecorator<string>;

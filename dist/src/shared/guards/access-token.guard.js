"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessTokenGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const auth_constant_1 = require("../constants/auth.constant");
const auth_decorator_1 = require("../decorators/auth.decorator");
const token_service_1 = require("../services/token.service");
let AccessTokenGuard = class AccessTokenGuard {
    constructor(tokenService, reflector) {
        this.tokenService = tokenService;
        this.reflector = reflector;
    }
    async canActivate(context) {
        const authType = this.reflector.getAllAndOverride(auth_decorator_1.AUTH_TYPE_KEY, [context.getHandler(), context.getClass()]) ??
            auth_constant_1.AuthType.Bearer;
        if (authType === auth_constant_1.AuthType.None) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const accessToken = this.extractTokenFromHeader(request);
        try {
            const decodedAccessToken = await this.tokenService.verifyAccessToken(accessToken);
            request[auth_constant_1.REQUEST_USER_KEY] = decodedAccessToken;
            return true;
        }
        catch {
            throw new common_1.UnauthorizedException('Error.InvalidAccessToken');
        }
    }
    extractTokenFromHeader(request) {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        if (type !== 'Bearer' || !token) {
            throw new common_1.UnauthorizedException('Error.MissingAccessToken');
        }
        return token;
    }
};
exports.AccessTokenGuard = AccessTokenGuard;
exports.AccessTokenGuard = AccessTokenGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [token_service_1.TokenService,
        core_1.Reflector])
], AccessTokenGuard);
//# sourceMappingURL=access-token.guard.js.map
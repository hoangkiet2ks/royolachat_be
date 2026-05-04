import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { TokenService } from '../services/token.service';
export declare class AccessTokenGuard implements CanActivate {
    private readonly tokenService;
    private readonly reflector;
    constructor(tokenService: TokenService, reflector: Reflector);
    canActivate(context: ExecutionContext): Promise<boolean>;
    private extractTokenFromHeader;
}

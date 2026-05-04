import { JwtService } from '@nestjs/jwt';
import { AccessTokenPayload, AccessTokenPayloadCreate, RefreshTokenPayload, RefreshTokenPayloadCreate } from '../types/jwt.type';
export declare class TokenService {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    signAccessToken(payload: AccessTokenPayloadCreate): string;
    signRefreshToken(payload: RefreshTokenPayloadCreate): string;
    verifyAccessToken(token: string): Promise<AccessTokenPayload>;
    verifyRefreshToken(token: string): Promise<RefreshTokenPayload>;
}

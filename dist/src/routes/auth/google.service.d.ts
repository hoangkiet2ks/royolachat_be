import { GoogleAuthStateType } from './auth.model';
import { AuthRepository } from './auth.repo';
import { AuthService } from './auth.service';
import { HashingService } from '@/shared/services/hashing.service';
export declare class GoogleService {
    private readonly authRepository;
    private readonly hashingService;
    private readonly authService;
    private oauth2Client;
    constructor(authRepository: AuthRepository, hashingService: HashingService, authService: AuthService);
    getAuthorizationUrl({ userAgent, ip }: GoogleAuthStateType): Promise<{
        url: string;
    }>;
    googleCallback({ code, state }: {
        code: string;
        state: string;
    }): Promise<{
        accessToken: string;
        refreshToken: string;
        userId: number;
    }>;
}

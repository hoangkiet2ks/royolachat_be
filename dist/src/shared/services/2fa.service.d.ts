export declare class TwoFactorService {
    private createTOTP;
    generateTOTPSecret(email: string): {
        secret: string;
        uri: string;
    };
    verifyTOTP({ email, token, secret }: {
        email: string;
        secret: string;
        token: string;
    }): boolean;
}

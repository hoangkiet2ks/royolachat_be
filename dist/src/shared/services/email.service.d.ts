export declare class EmailService {
    private transporter;
    constructor();
    sendOTP(payload: {
        email: string;
        code: string;
    }): Promise<{
        success: boolean;
        messageId: any;
        error: null;
    } | {
        success: boolean;
        error: string;
        messageId: null;
    }>;
}

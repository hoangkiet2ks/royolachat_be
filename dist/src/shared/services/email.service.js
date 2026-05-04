"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const nodemailer_1 = __importDefault(require("nodemailer"));
const render_1 = require("@react-email/render");
const config_1 = __importDefault(require("../config"));
const otp_1 = require("../../../emails/otp");
class EmailService {
    constructor() {
        this.transporter = nodemailer_1.default.createTransport({
            service: 'gmail',
            auth: {
                user: config_1.default.GMAIL_EMAIL,
                pass: config_1.default.GMAIL_APP_PASSWORD,
            },
        });
    }
    async sendOTP(payload) {
        const subject = 'Mã OTP xác thực đăng ký';
        try {
            const html = await (0, render_1.render)((0, jsx_runtime_1.jsx)(otp_1.OTPEmail, { otpCode: payload.code, title: subject }));
            const result = await this.transporter.sendMail({
                from: `"Ecommerce" <${config_1.default.GMAIL_EMAIL}>`,
                to: payload.email,
                subject,
                html,
            });
            return { success: true, messageId: result.messageId, error: null };
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to send email';
            console.error('Email send error:', errorMessage);
            return { success: false, error: errorMessage, messageId: null };
        }
    }
}
exports.EmailService = EmailService;
//# sourceMappingURL=email.service.js.map
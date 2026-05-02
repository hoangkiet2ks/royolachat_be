import nodemailer from 'nodemailer'
import { render } from '@react-email/render'
import envConfig from '../config'
import { OTPEmail } from 'emails/otp'

export class EmailService {
  private transporter: nodemailer.Transporter

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: envConfig.GMAIL_EMAIL,
        pass: envConfig.GMAIL_APP_PASSWORD,
      },
    })
  }

  async sendOTP(payload: { email: string; code: string }) {
    const subject = 'Mã OTP xác thực đăng ký'

    try {
      // Render React component to HTML string
      const html = await render(
        <OTPEmail otpCode={payload.code} title={subject} />,
      )

      const result = await this.transporter.sendMail({
        from: `"Ecommerce" <${envConfig.GMAIL_EMAIL}>`,
        to: payload.email,
        subject,
        html,
      })

      return { success: true, messageId: result.messageId, error: null }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to send email'
      console.error('Email send error:', errorMessage)
      return { success: false, error: errorMessage, messageId: null }
    }
  }
}

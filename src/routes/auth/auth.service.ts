import { addMilliseconds } from 'date-fns'
import ms, { StringValue } from 'ms'
import { HttpException, Injectable } from '@nestjs/common'
import 'multer'

import envConfig from '@/shared/config'
import {
  AppRole,
  TypeOfVerificationCode,
  TypeOfVerificationCodeType,
  UserStatus,
} from '@/shared/constants/auth.constant'
import { generateOTP, isNotFoundPrismaError, isUniqueConstraintPrismaError } from '@/shared/helper'
import { HashingService } from '@/shared/services/hashing.service'
import { TokenService } from '@/shared/services/token.service'
import { EmailService } from '@/shared/services/email.service'
import { S3Service } from '@/shared/services/s3.service'
import { AccessTokenPayloadCreate } from '@/shared/types/jwt.type'

import {
  ForgotPasswordBodyType,
  LoginBodyType,
  RefreshTokenBodyType,
  RegisterBodyType,
  SendOTPBodyType,
} from './auth.model'
import { AuthRepository } from './auth.repo'
import {
  AccountBlockedException,
  AccountInactiveException,
  EmailAlreadyExistsException,
  EmailNotFoundException,
  ExpiredOTPException,
  FailedToSendOTPException,
  InvalidOTPException,
  InvalidPasswordException,
  RefreshTokenAlreadyUsedException,
  UnauthorizedAccessException,
} from './auth.error'

@Injectable()
export class AuthService {
  constructor(
    private readonly hashingService: HashingService,
    private readonly authRepository: AuthRepository,
    private readonly emailService: EmailService,
    private readonly tokenService: TokenService,
    private readonly s3Service: S3Service,
  ) {}

  private ensureUserCanLogin(status: string) {
    if (status === UserStatus.BLOCKED) {
      throw AccountBlockedException
    }
    if (status === UserStatus.INACTIVE) {
      throw AccountInactiveException
    }
  }

  async validateVerificationCode({
    email,
    code,
    type,
  }: {
    email: string
    code: string
    type: TypeOfVerificationCodeType
  }) {
    const verificationCode = await this.authRepository.findUniqueVerificationCode({
      email_type: {
        email,
        type,
      },
    })

    if (!verificationCode) throw InvalidOTPException
    if (verificationCode.code !== code) throw InvalidOTPException
    if (verificationCode.expiresAt < new Date()) throw ExpiredOTPException

    return verificationCode
  }

  async register(body: RegisterBodyType) {
    try {
      await this.validateVerificationCode({
        email: body.email,
        code: body.code,
        type: TypeOfVerificationCode.REGISTER,
      })

      const hashedPassword = await this.hashingService.hash(body.password)

      const [user] = await Promise.all([
        this.authRepository.createUser({
          email: body.email,
          name: body.name,
          phoneNumber: body.phoneNumber,
          password: hashedPassword,
          appRole: AppRole.USER,
          status: UserStatus.ACTIVE,
        }),
        this.authRepository.deleteVerificationCode({
          email_type: {
            email: body.email,
            type: TypeOfVerificationCode.REGISTER,
          },
        }),
      ])

      return user
    } catch (error) {
      if (isUniqueConstraintPrismaError(error)) throw EmailAlreadyExistsException
      throw error
    }
  }

  async sendOTP(body: SendOTPBodyType) {
    const user = await this.authRepository.findUnique({ email: body.email })

    if (body.type === TypeOfVerificationCode.REGISTER && user) throw EmailAlreadyExistsException
    if (body.type === TypeOfVerificationCode.FORGOT_PASSWORD && !user) throw EmailNotFoundException

    const code = generateOTP()

    await this.authRepository.createVerificationCode({
      email: body.email,
      code,
      type: body.type,
      expiresAt: addMilliseconds(new Date(), ms(envConfig.OTP_EXPIRES_IN as StringValue)),
    })

    const { error } = await this.emailService.sendOTP({ email: body.email, code })
    if (error) throw FailedToSendOTPException

    return { message: 'Gửi mã OTP thành công' }
  }

  async login(body: LoginBodyType & { userAgent: string; ip: string }) {
    const user = await this.authRepository.findUniqueUser({ email: body.email })
    if (!user) throw EmailNotFoundException

    this.ensureUserCanLogin(user.status)

    const isPasswordMatch = await this.hashingService.compare(body.password, user.password)
    if (!isPasswordMatch) throw InvalidPasswordException

    const device = await this.authRepository.createDevice({
      userId: user.id,
      userAgent: body.userAgent,
      ip: body.ip,
      isActive: true,
    })

    await this.authRepository.updateUser({ id: user.id }, { lastSeenAt: new Date() })

    const tokens = await this.generateTokens({
      userId: user.id,
      deviceId: device.id,
      appRole: user.appRole,
    })

    return {
      ...tokens,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      phoneNumber: user.phoneNumber,
      appRole: user.appRole,
    }
  }

  async refreshToken({ refreshToken, userAgent, ip }: RefreshTokenBodyType & { userAgent: string; ip: string }) {
    try {
      const { userId } = await this.tokenService.verifyRefreshToken(refreshToken)

      const refreshTokenInDb = await this.authRepository.findUniqueRefreshTokenIncludeUser({
        token: refreshToken,
      })

      if (!refreshTokenInDb) throw RefreshTokenAlreadyUsedException

      this.ensureUserCanLogin(refreshTokenInDb.user.status)

      await Promise.all([
        this.authRepository.updateDevice(refreshTokenInDb.deviceId, { ip, userAgent, isActive: true }),
        this.authRepository.deleteRefreshToken({ token: refreshToken }),
        this.authRepository.updateUser({ id: userId }, { lastSeenAt: new Date() }),
      ])

      const tokens = await this.generateTokens({
        userId,
        deviceId: refreshTokenInDb.deviceId,
        appRole: refreshTokenInDb.user.appRole,
      })

      return {
        ...tokens,
        name: refreshTokenInDb.user.name,
        email: refreshTokenInDb.user.email,
        avatar: refreshTokenInDb.user.avatar,
        phoneNumber: refreshTokenInDb.user.phoneNumber,
        appRole: refreshTokenInDb.user.appRole,
      }
    } catch (error) {
      if (error instanceof HttpException) throw error
      throw UnauthorizedAccessException
    }
  }

  async generateTokens({ userId, deviceId, appRole }: AccessTokenPayloadCreate) {
    const [accessToken, refreshToken] = await Promise.all([
      this.tokenService.signAccessToken({ userId, deviceId, appRole }),
      this.tokenService.signRefreshToken({ userId }),
    ])

    const decodedRefreshToken = await this.tokenService.verifyRefreshToken(refreshToken)

    await this.authRepository.createRefreshToken({
      token: refreshToken,
      userId,
      expiresAt: new Date(decodedRefreshToken.exp * 1000),
      deviceId,
    })

    return { accessToken, refreshToken, userId }
  }

  async logout(refreshToken: string) {
    try {
      await this.tokenService.verifyRefreshToken(refreshToken)

      const deletedRefreshToken = await this.authRepository.deleteRefreshToken({
        token: refreshToken,
      })

      await this.authRepository.updateDevice(deletedRefreshToken.deviceId, {
        isActive: false,
      })

      return { message: 'Đăng xuất thành công' }
    } catch (error) {
      if (isNotFoundPrismaError(error)) {
        throw RefreshTokenAlreadyUsedException
      }
      throw UnauthorizedAccessException
    }
  }

  async forgotPassword(body: ForgotPasswordBodyType) {
    const { email, code, newPassword } = body

    const user = await this.authRepository.findUnique({
      email,
    })
    if (!user) {
      throw EmailNotFoundException
    }

    await this.validateVerificationCode({
      email,
      code,
      type: TypeOfVerificationCode.FORGOT_PASSWORD,
    })

    const hashedPassword = await this.hashingService.hash(newPassword)

    await Promise.all([
      this.authRepository.updateUser(
        { id: user.id },
        {
          password: hashedPassword,
        },
      ),
      this.authRepository.deleteVerificationCode({
        email_type: {
          email,
          type: TypeOfVerificationCode.FORGOT_PASSWORD,
        },
      }),
      this.authRepository.deleteRefreshTokensByUserId(user.id),
      this.authRepository.deactivateDevicesByUserId(user.id),
    ])

    return { message: 'Cập nhật mật khẩu mới thành công' }
  }

  // --- LOGIC CẬP NHẬT ẢNH ĐẠI DIỆN VÀ SỐ ĐIỆN THOẠI ---

  async updateAvatar(userId: number, file: Express.Multer.File) {
    const user = await this.authRepository.findUniqueUser({ id: userId })
    if (!user) throw EmailNotFoundException

    const avatarUrl = await this.s3Service.uploadImage(file, 'avatars')

    if (user.avatar) {
      await this.s3Service.deleteFile(user.avatar)
    }

    const updatedUser = await this.authRepository.updateUser({ id: userId }, { avatar: avatarUrl })

    return {
      avatar: updatedUser.avatar,
      email: updatedUser.email,
      name: updatedUser.name,
      phoneNumber: updatedUser.phoneNumber,
      id: updatedUser.id,
    }
  }

  async updateBanner(userId: number, file: Express.Multer.File) {
    if (!file) {
      throw new HttpException('File không hợp lệ', 400)
    }

    const user = await this.authRepository.findUniqueUser({ id: userId })
    if (!user) throw EmailNotFoundException

    // Upload lên S3
    const bannerUrl = await this.s3Service.uploadImage(file, 'banners')

    // Lưu banner URL vào DB
    const updatedUser = await this.authRepository.updateUser({ id: userId }, { banner: bannerUrl })

    return {
      banner: updatedUser.banner,
      message: 'Cập nhật ảnh bìa thành công',
    }
  }

  async updatePhoneNumber(userId: number, phoneNumber: string) {
    const updatedUser = await this.authRepository.updateUser({ id: userId }, { phoneNumber })

    return {
      phoneNumber: updatedUser.phoneNumber,
      email: updatedUser.email,
      name: updatedUser.name,
      avatar: updatedUser.avatar,
      id: updatedUser.id,
    }
  }

  async getCurrentUser(userId: number) {
    const user = await this.authRepository.findUniqueUser({ id: userId })
    if (!user) throw EmailNotFoundException

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      avatar: user.avatar,
      banner: user.banner,
      phoneNumber: user.phoneNumber,
      appRole: user.appRole,
      createdAt: user.createdAt,
      birthday: user.birthday,
    }
  }

  async updateProfile(userId: number, name: string) {
    if (!name || name.trim().length === 0) {
      throw new HttpException('Tên không được để trống', 400)
    }

    if (name.trim().length > 100) {
      throw new HttpException('Tên không được quá 100 ký tự', 400)
    }

    const updatedUser = await this.authRepository.updateUser({ id: userId }, { name: name.trim() })

    return {
      message: 'Cập nhật tên thành công',
      name: updatedUser.name,
    }
  }

  async updateBirthday(userId: number, birthday: string) {
    // Validate date format
    const date = new Date(birthday)
    if (isNaN(date.getTime())) {
      throw new HttpException('Ngày sinh không hợp lệ', 400)
    }

    // Lưu birthday vào DB
    const updatedUser = await this.authRepository.updateUser({ id: userId }, { birthday: date })

    return {
      message: 'Cập nhật ngày sinh thành công',
      birthday: updatedUser.birthday,
    }
  }

  async changePassword(userId: number, oldPassword: string, newPassword: string) {
    const user = await this.authRepository.findUniqueUser({ id: userId })
    if (!user) throw EmailNotFoundException

    // Verify old password
    const isPasswordValid = await this.hashingService.compare(oldPassword, user.password)
    if (!isPasswordValid) {
      throw new HttpException('Mật khẩu cũ không đúng', 400)
    }

    // Hash new password
    const hashedPassword = await this.hashingService.hash(newPassword)

    // Update password
    await this.authRepository.updateUser({ id: userId }, { password: hashedPassword })

    return {
      message: 'Đổi mật khẩu thành công',
    }
  }
}
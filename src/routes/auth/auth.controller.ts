import { Body, Controller, Get, HttpCode, HttpStatus, Ip, Post, Query, Res, Patch, UseInterceptors, UploadedFile } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { Response } from 'express'
import { ZodSerializerDto } from 'nestjs-zod'

import envConfig from '@/shared/config'
import { IsPublic } from '@/shared/decorators/auth.decorator'
import { ActiveUser } from '@/shared/decorators/active-user.decorator'
import { UserAgent } from '@/shared/decorators/user.agent.decorator'
import { MessageResDTO } from '@/shared/dtos/response.dto'

import { AuthService } from './auth.service'
import { GoogleService } from './google.service'
import {
  ForgotPasswordBodyDTO,
  GetAuthorizationUrlResDTO,
  LoginBodyDTO,
  LoginResDTO,
  LogoutBodyDTO,
  RefreshTokenBodyDTO,
  RefreshTokenResDTO,
  RegisterBodyDTO,
  RegisterResDTO,
  SendOTPBodyDTO,
  UpdatePhoneBodyDTO,
} from './auth.dto'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly googleService: GoogleService,
  ) {}

  @Post('register')
  @IsPublic()
  @ZodSerializerDto(RegisterResDTO)
  register(@Body() body: RegisterBodyDTO) {
    return this.authService.register(body)
  }

  @Post('login')
  @IsPublic()
  @HttpCode(HttpStatus.OK)
  @ZodSerializerDto(LoginResDTO)
  login(@Body() body: LoginBodyDTO, @UserAgent() userAgent: string, @Ip() ip: string) {
    return this.authService.login({ ...body, userAgent, ip })
  }

  @Post('send-otp')
  @IsPublic()
  @HttpCode(HttpStatus.OK)
  @ZodSerializerDto(MessageResDTO)
  sendOTP(@Body() body: SendOTPBodyDTO) {
    return this.authService.sendOTP(body)
  }

  @Post('forgot-password')
  @IsPublic()
  @HttpCode(HttpStatus.OK)
  @ZodSerializerDto(MessageResDTO)
  forgotPassword(@Body() body: ForgotPasswordBodyDTO) {
    return this.authService.forgotPassword(body)
  }

  @Post('refresh-token')
  @IsPublic()
  @HttpCode(HttpStatus.OK)
  @ZodSerializerDto(RefreshTokenResDTO)
  refreshToken(@Body() body: RefreshTokenBodyDTO, @UserAgent() userAgent: string, @Ip() ip: string) {
    return this.authService.refreshToken({ refreshToken: body.refreshToken, userAgent, ip })
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @ZodSerializerDto(MessageResDTO)
  logout(@Body() body: LogoutBodyDTO) {
    return this.authService.logout(body.refreshToken)
  }

  @Get('google-link')
  @IsPublic()
  @ZodSerializerDto(GetAuthorizationUrlResDTO)
  getAuthorizationUrl(@UserAgent() userAgent: string, @Ip() ip: string) {
    return this.googleService.getAuthorizationUrl({ userAgent, ip })
  }

  @Get('google/callback')
  @IsPublic()
  async googleCallback(@Query('code') code: string, @Query('state') state: string, @Res() res: Response) {
    try {
      const data = await this.googleService.googleCallback({ code, state })
      return res.redirect(
        `${envConfig.GOOGLE_CLIENT_REDIRECT_URI}?accessToken=${data.accessToken}&refreshToken=${data.refreshToken}&userId=${data.userId}`,
      )
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Lỗi Google Callback'
      return res.redirect(`${envConfig.GOOGLE_CLIENT_REDIRECT_URI}?error=${encodeURIComponent(message)}`)
    }
  }

  // --- ENDPOINT CẬP NHẬT AVATAR VÀ PHONE ---
  @Patch('me/avatar')
  @UseInterceptors(FileInterceptor('file'))
  updateAvatar(@ActiveUser('userId') userId: number, @UploadedFile() file: Express.Multer.File) {
    return this.authService.updateAvatar(userId, file)
  }

  @Patch('me/banner')
  @UseInterceptors(FileInterceptor('file'))
  updateBanner(@ActiveUser('userId') userId: number, @UploadedFile() file: Express.Multer.File) {
    return this.authService.updateBanner(userId, file)
  }

  @Patch('me/phone')
  updatePhone(@ActiveUser('userId') userId: number, @Body() body: UpdatePhoneBodyDTO) {
    return this.authService.updatePhoneNumber(userId, body.phoneNumber)
  }

  @Patch('me/profile')
  updateProfile(@ActiveUser('userId') userId: number, @Body() body: { name: string }) {
    return this.authService.updateProfile(userId, body.name)
  }

  @Patch('me/birthday')
  updateBirthday(@ActiveUser('userId') userId: number, @Body() body: { birthday: string }) {
    return this.authService.updateBirthday(userId, body.birthday)
  }

  @Patch('me/password')
  changePassword(@ActiveUser('userId') userId: number, @Body() body: { oldPassword: string; newPassword: string }) {
    return this.authService.changePassword(userId, body.oldPassword, body.newPassword)
  }

  @Get('me')
  getCurrentUser(@ActiveUser('userId') userId: number) {
    return this.authService.getCurrentUser(userId)
  }
}
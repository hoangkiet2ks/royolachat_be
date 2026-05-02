import envConfig from '@/shared/config'
import { AppRole, UserStatus } from '@/shared/constants/auth.constant'
import { Injectable } from '@nestjs/common'
import { OAuth2Client } from 'google-auth-library'
import { google } from 'googleapis'
import { v4 as uuidv4 } from 'uuid'

import { GoogleAuthStateType } from './auth.model'
import { AuthRepository } from './auth.repo'
import { AuthService } from './auth.service'
import { HashingService } from '@/shared/services/hashing.service'
import { GoogleUserInfoError } from './auth.error'

@Injectable()
export class GoogleService {
  private oauth2Client: OAuth2Client

  constructor(
    private readonly authRepository: AuthRepository,
    private readonly hashingService: HashingService,
    private readonly authService: AuthService,
  ) {
    this.oauth2Client = new google.auth.OAuth2(
      envConfig.GOOGLE_CLIENT_ID,
      envConfig.GOOGLE_CLIENT_SECRET,
      envConfig.GOOGLE_REDIRECT_URI,
    )
  }

  async getAuthorizationUrl({ userAgent, ip }: GoogleAuthStateType) {
    const scope = [
      'openid',
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ]

    const stateString = Buffer.from(
      JSON.stringify({
        userAgent,
        ip,
      }),
    ).toString('base64')

    const url = this.oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope,
      include_granted_scopes: true,
      state: stateString,
      prompt: 'consent',
    })

    return { url }
  }

  async googleCallback({ code, state }: { code: string; state: string }) {
    try {
      let userAgent = 'Unknown'
      let ip = 'Unknown'

      try {
        if (state) {
          const clientInfo = JSON.parse(Buffer.from(state, 'base64').toString()) as GoogleAuthStateType
          userAgent = clientInfo.userAgent
          ip = clientInfo.ip
        }
      } catch (error) {
        console.error('Error parsing state', error)
      }

      const { tokens } = await this.oauth2Client.getToken(code)
      this.oauth2Client.setCredentials(tokens)

      const oauth2 = google.oauth2({
        auth: this.oauth2Client,
        version: 'v2',
      })

      const { data } = await oauth2.userinfo.get()

      if (!data.email) {
        throw GoogleUserInfoError
      }

      let user = await this.authRepository.findUniqueUser({
        email: data.email,
      })

      if (!user) {
        const randomPassword = uuidv4()
        const hashedPassword = await this.hashingService.hash(randomPassword)

        user = await this.authRepository.findUniqueUser({
          email: (
            await this.authRepository.createUser({
              email: data.email,
              name: data.name ?? '',
              password: hashedPassword,
              phoneNumber: '',
              avatar: data.picture ?? null,
              appRole: AppRole.USER,
              status: UserStatus.ACTIVE,
            })
          ).email,
        })
      }

      if (!user) {
        throw GoogleUserInfoError
      }

      const device = await this.authRepository.createDevice({
        userId: user.id,
        userAgent,
        ip,
        isActive: true,
      })

      await this.authRepository.updateUser(
        { id: user.id },
        {
          lastSeenAt: new Date(),
        },
      )

      return this.authService.generateTokens({
        userId: user.id,
        deviceId: device.id,
        appRole: user.appRole,
      })
    } catch (error) {
      console.error('Error in googleCallback', error)
      throw error
    }
  }
}

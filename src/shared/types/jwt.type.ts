import { AppRoleType } from '../constants/auth.constant'

export interface AccessTokenPayloadCreate {
  userId: number
  deviceId: number
  appRole: AppRoleType
}

export interface AccessTokenPayload extends AccessTokenPayloadCreate {
  exp: number
  iat: number
}

export interface RefreshTokenPayloadCreate {
  userId: number
}

export interface RefreshTokenPayload extends RefreshTokenPayloadCreate {
  exp: number
  iat: number
}

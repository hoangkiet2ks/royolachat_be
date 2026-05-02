export const REQUEST_USER_KEY = 'user'
export const AuthType = {
  Bearer: 'Bearer',
  None: 'None',
} as const

export type AuthTypeType = (typeof AuthType)[keyof typeof AuthType]

export const UserStatus = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  BLOCKED: 'BLOCKED',
} as const

export const AppRole = {
  USER: 'USER',
  ADMIN: 'ADMIN',
} as const
export type AppRoleType = (typeof AppRole)[keyof typeof AppRole]

export const TypeOfVerificationCode = {
  REGISTER: 'REGISTER',
  FORGOT_PASSWORD: 'FORGOT_PASSWORD',
} as const

export type TypeOfVerificationCodeType = (typeof TypeOfVerificationCode)[keyof typeof TypeOfVerificationCode]

import { SetMetadata } from '@nestjs/common'
import { AuthType, AuthTypeType } from 'src/shared/constants/auth.constant'

export const AUTH_TYPE_KEY = 'authType'

// Truyền thẳng 1 giá trị AuthType, mặc định là Bearer
export const Auth = (authType: AuthTypeType = AuthType.Bearer) => {
  return SetMetadata(AUTH_TYPE_KEY, authType)
}

// Gọi IsPublic sẽ set AuthType là None
export const IsPublic = () => Auth(AuthType.None)

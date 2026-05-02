import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthType, AuthTypeType, REQUEST_USER_KEY } from '../constants/auth.constant'
import { AUTH_TYPE_KEY } from '../decorators/auth.decorator' // Import key từ file decorator
import { TokenService } from '../services/token.service'

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(
    private readonly tokenService: TokenService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // 1. Lấy AuthType từ metadata, mặc định là Bearer nếu không gắn Decorator nào
    const authType =
      this.reflector.getAllAndOverride<AuthTypeType>(AUTH_TYPE_KEY, [context.getHandler(), context.getClass()]) ??
      AuthType.Bearer

    // 2. Nếu route là Public (AuthType.None), cho qua luôn
    if (authType === AuthType.None) {
      return true
    }

    // 3. Nếu không phải Public, tiến hành kiểm tra Bearer Token
    const request = context.switchToHttp().getRequest()
    const accessToken = this.extractTokenFromHeader(request)

    try {
      // Decode và kiểm tra tính hợp lệ của token
      const decodedAccessToken = await this.tokenService.verifyAccessToken(accessToken)

      // Gắn payload vào request để sử dụng ở Controller (qua @ActiveUser)
      request[REQUEST_USER_KEY] = decodedAccessToken

      return true
    } catch {
      throw new UnauthorizedException('Error.InvalidAccessToken')
    }
  }

  private extractTokenFromHeader(request: any): string {
    // Tách chuỗi "Bearer <token>"
    const [type, token] = request.headers.authorization?.split(' ') ?? []

    // Nếu không có token hoặc không phải kiểu Bearer thì chặn lại
    if (type !== 'Bearer' || !token) {
      throw new UnauthorizedException('Error.MissingAccessToken')
    }

    return token
  }
}

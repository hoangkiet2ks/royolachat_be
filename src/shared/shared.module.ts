import { Global, Module } from '@nestjs/common'
import { PrismaService } from './services/prisma.service'
import { HashingService } from './services/hashing.service'
import { TokenService } from './services/token.service'
import { JwtModule } from '@nestjs/jwt'
import { EmailService } from './services/email.service'
import { AccessTokenGuard } from './guards/access-token.guard'
import { S3Service } from './services/s3.service'
import { APP_GUARD } from '@nestjs/core'

// Thêm S3Service vào danh sách dùng chung
const sharedServices = [
  PrismaService, 
  HashingService, 
  TokenService, 
  EmailService, 
  S3Service,
]

const sharedProviders = [
  ...sharedServices,
  {
    provide: APP_GUARD,
    useClass: AccessTokenGuard,
  },
]

@Global()
@Module({
  providers: sharedProviders,
  exports: sharedServices,
  imports: [JwtModule],
})
export class SharedModule {}
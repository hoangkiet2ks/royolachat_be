import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors({
    // Đổi toàn bộ danh sách origin thành true để mở khóa cho mọi thiết bị trong mạng LAN và App Mobile
    origin: true,
    credentials: true,
  })

  await app.listen(3000, '0.0.0.0');
}
bootstrap()
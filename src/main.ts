import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // TẮT HOÀN TOÀN CORS để test xem duplicate header có biến mất không
  // app.enableCors({
  //   origin: (origin, callback) => {
  //     // Cho phép tất cả origin
  //     callback(null, true);
  //   },
  //   credentials: true,
  //   methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  //   allowedHeaders: ['Authorization', 'Content-Type'],
  // });

  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0');
  console.log(`Application is running on port: ${port}`);
}
bootstrap();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Bật CORS với function để tránh duplicate header
  app.enableCors({
    origin: (origin, callback) => {
      // Luôn cho phép, không quan tâm origin là gì
      callback(null, origin || '*');
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Authorization', 'Content-Type', 'Accept'],
  });

  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0');
  console.log(`Application is running on port: ${port}`);
}
bootstrap();
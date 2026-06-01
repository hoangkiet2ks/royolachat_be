import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Merge CORS: giữ cả EC2 IP gốc và Capacitor mobile origins
  const allowedOrigins = [
    'https://royolachat.netlify.app',
    'http://localhost:3300',
    'http://localhost:5173',
    'http://localhost:8081',
    'https://app',           // Capacitor Android
    'capacitor://localhost', // Capacitor iOS
    /\.netlify\.app$/,
    /\.nip\.io$/,
  ];

  app.enableCors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      const isAllowed = allowedOrigins.some((o) =>
        typeof o === 'string' ? o === origin : o.test(origin),
      );
      callback(null, isAllowed ? origin : false);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Authorization', 'Content-Type'],
  });

  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0');
  console.log(`Application is running on port: ${port}`);
}
bootstrap();

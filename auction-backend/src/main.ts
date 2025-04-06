// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Sửa lại CORS để cho phép PATCH + tất cả headers
  app.enableCors({
    origin: ['https://vietdaugia-frontend.onrender.com'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // thêm PATCH
    allowedHeaders: ['Content-Type', 'Authorization'],  // cho phép header Authorization
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(process.env.PORT || 3000);
}
bootstrap();

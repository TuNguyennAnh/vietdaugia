// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Bật CORS đúng cách, cho phép tất cả origin (hoặc bạn có thể giới hạn sau)
  app.enableCors({
    origin: ['https://vietdaugia-frontend.onrender.com'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, // nếu bạn dùng cookie / xác thực
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  await app.listen(process.env.PORT || 3000);
}
bootstrap();

// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Bật CORS đúng cách, cho phép tất cả origin (hoặc bạn có thể giới hạn sau)
  app.enableCors({
    origin: '*', // cho phép mọi domain gọi API
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, // nếu bạn dùng cookie / xác thực
  });

  await app.listen(3000);
}
bootstrap();

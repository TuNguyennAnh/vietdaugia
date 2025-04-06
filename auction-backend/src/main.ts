import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as bodyParser from 'body-parser';
import * as express from 'express';
import { join } from 'path';
import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['https://vietdaugia-frontend.onrender.com'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // ✅ Đảm bảo thư mục uploads tồn tại TRƯỚC khi phục vụ tĩnh
  const uploadsPath = join(__dirname, '..', 'uploads');
  if (!fs.existsSync(uploadsPath)) {
    fs.mkdirSync(uploadsPath, { recursive: true });
  }

  app.use('/uploads', express.static(uploadsPath));

  app.use(bodyParser.json({ limit: '10mb' }));
  app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

  await app.listen(process.env.PORT || 3000);
}
bootstrap();

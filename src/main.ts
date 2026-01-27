import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Глобальная валидация
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // удаляет лишние поля
      transform: true, // автоматически преобразует типы
    }),
  );

  // Разрешаем CORS (для фронтенда)
  app.enableCors();

  const port = process.env.PORT || 3005;
  await app.listen(port);

  console.log(`📧 Email service started on http://localhost:${port}`);
  console.log(`🚀 Environment: ${process.env.NODE_ENV || 'development'}`);
}
bootstrap();

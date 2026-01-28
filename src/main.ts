import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Глобальная валидация
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
  }));
  
  // Разрешаем CORS
  app.enableCors();
  
  // Настройка Swagger документации
  const config = new DocumentBuilder()
    .setTitle('SkillSwap Email Service API')
    .setDescription('Микросервис для отправки email для SkillSwap проекта')
    .setVersion('1.0')
    .addTag('mail')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  const port = process.env.PORT || 3005;
  await app.listen(port);
  
  console.log(`📧 Email service started on http://localhost:${port}`);
  console.log(`📚 Swagger docs: http://localhost:${port}/api`);
  console.log(`🚀 Environment: ${process.env.NODE_ENV || 'development'}`);
}

bootstrap();

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MailModule } from './mail/mail.module';
import { HealthController } from './health/health.controller';

@Module({
  imports: [
    // Глобальная конфигурация .env файлов
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    
    // Наш модуль для отправки email
    MailModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}

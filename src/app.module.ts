import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MailModule } from './mail/mail.module';

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
})
export class AppModule {}

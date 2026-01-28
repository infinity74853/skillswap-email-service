import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    // ConfigModule нужен для доступа к переменным окружения
    ConfigModule.forRoot({
      isGlobal: false, // Локальный для модуля, но можно сделать true если нужно глобально
    }),
  ],
  controllers: [MailController],
  providers: [MailService],
  exports: [MailService], // Экспортируем сервис, если будем использовать в других модулях
})
export class MailModule {}
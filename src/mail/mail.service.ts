import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { SendEmailDto } from './dto/send-email.dto';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    this.initializeTransporter();
  }

  private initializeTransporter(): void {
    const nodeEnv = this.configService.get<string>('NODE_ENV', 'development');
    const isTestMode = nodeEnv === 'test' || nodeEnv === 'development';
    
    if (isTestMode) {
      // Тестовый транспортер - не отправляет реальные письма
      this.transporter = nodemailer.createTransport({
        jsonTransport: true, // Режим JSON - письма не отправляются, только логируются
      });
      this.logger.log('📧 Using JSON transport (emails are not actually sent)');
      this.logger.log('📧 To use real SMTP, set NODE_ENV=production in .env file');
    } else {
      // Реальный SMTP транспортер для production
      const host = this.configService.get<string>('SMTP_HOST', 'smtp.gmail.com');
      const port = this.configService.get<number>('SMTP_PORT', 587);
      const user = this.configService.get<string>('SMTP_USER', '');
      const pass = this.configService.get<string>('SMTP_PASSWORD', '');
      const secure = port === 465;

      this.logger.log(`📧 Initializing REAL SMTP transporter to ${host}:${port}`);
      
      this.transporter = nodemailer.createTransport({
        host,
        port,
        secure,
        auth: {
          user,
          pass,
        },
      });
    }
  }

  async sendEmail(dto: SendEmailDto): Promise<boolean> {
    const { to, subject, text, html } = dto;
    
    const from = this.configService.get<string>('SMTP_FROM') || 
                 this.configService.get<string>('SMTP_USER', 'noreply@skillswap.com');
    
    const mailOptions: nodemailer.SendMailOptions = {
      from,
      to,
      subject,
    };

    if (html) {
      mailOptions.html = html;
    } else if (text) {
      mailOptions.text = text;
    } else {
      throw new Error('Either text or html content must be provided');
    }

    this.logger.log(`📧 Attempting to send email to: ${to}, subject: "${subject}"`);
    
    try {
      const info: nodemailer.SentMessageInfo = await this.transporter.sendMail(mailOptions);
      
      // В режиме jsonTransport info будет JSON строкой
      if (typeof info === 'string') {
        this.logger.log(`✅ Email would be sent in production mode`);
        this.logger.log(`   JSON data: ${info}`);
      } else {
        const messageId = info.messageId || 'stub-message-id';
        this.logger.log(`✅ Email sent successfully`);
        this.logger.log(`   Message ID: ${messageId}`);
      }
      
      return true;
      
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(`❌ Failed to send email to ${to}: ${errorMessage}`);
      throw error instanceof Error ? error : new Error(String(error));
    }
  }

  async testConnection(): Promise<boolean> {
    try {
      await this.transporter.verify();
      this.logger.log('✅ SMTP connection verified successfully');
      return true;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(`❌ SMTP connection failed: ${errorMessage}`);
      return false;
    }
  }
}
import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { MailService } from './mail.service';
import { SendEmailDto } from './dto/send-email.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('mail') // Группировка в Swagger
@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('send')
  @HttpCode(HttpStatus.OK) // Возвращаем 200 OK вместо 201 Created
  @ApiOperation({ summary: 'Отправить email' })
  @ApiResponse({ 
    status: 200, 
    description: 'Email успешно отправлен',
    schema: {
      example: { success: true, message: 'Email sent successfully' }
    }
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Неверные данные запроса' 
  })
  @ApiResponse({ 
    status: 500, 
    description: 'Ошибка при отправке email' 
  })
  async sendEmail(@Body() sendEmailDto: SendEmailDto): Promise<{ success: boolean; message?: string }> {
    try {
      await this.mailService.sendEmail(sendEmailDto);
      return { 
        success: true, 
        message: 'Email sent successfully' 
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to send email'
      };
    }
  }

  @Post('test')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Тестирование соединения с SMTP' })
  @ApiResponse({ 
    status: 200, 
    description: 'Результат тестирования',
    schema: {
      example: { success: true, message: 'SMTP connection verified' }
    }
  })
  async testConnection(): Promise<{ success: boolean; message: string }> {
    const isConnected = await this.mailService.testConnection();
    
    if (isConnected) {
      return { 
        success: true, 
        message: 'SMTP connection verified successfully' 
      };
    } else {
      return { 
        success: false, 
        message: 'Failed to connect to SMTP server' 
      };
    }
  }
}
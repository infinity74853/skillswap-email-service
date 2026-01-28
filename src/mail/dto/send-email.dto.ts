import { IsEmail, IsString, IsOptional, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SendEmailDto {
  @ApiProperty({
    description: 'Email получателя',
    example: 'user@example.com',
  })
  @IsEmail()
  to: string;

  @ApiProperty({
    description: 'Тема письма',
    example: 'Добро пожаловать в SkillSwap!',
  })
  @IsString()
  @MinLength(1)
  subject: string;

  @ApiProperty({
    description: 'Текст письма (plain text)',
    example: 'Привет! Добро пожаловать в наше приложение.',
    required: false,
  })
  @IsOptional()
  @IsString()
  text?: string;

  @ApiProperty({
    description: 'HTML содержимое письма',
    example: '<h1>Привет!</h1><p>Добро пожаловать в наше приложение.</p>',
    required: false,
  })
  @IsOptional()
  @IsString()
  html?: string;

  @ApiProperty({
    description: 'Идентификатор группы (group1 или group2)',
    example: 'group1',
    required: false,
  })
  @IsOptional()
  @IsString()
  group?: string;
}

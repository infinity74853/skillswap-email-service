import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('health')
@Controller()
export class HealthController {
  @Get()
  @ApiOperation({ summary: 'Health check' })
  @ApiResponse({ 
    status: 200, 
    description: 'Service is healthy',
  })
  healthCheck() {
    return {
      status: 'ok',
      service: 'skillswap-email-service',
      timestamp: new Date().toISOString(),
      mode: process.env.NODE_ENV || 'development',
      version: '1.0.0',
      endpoints: {
        sendEmail: 'POST /mail/send',
        testConnection: 'POST /mail/test',
        apiDocs: 'GET /api'
      }
    };
  }

  @Get('ping')
  @ApiOperation({ summary: 'Simple ping endpoint' })
  ping() {
    return {
      message: 'pong',
      timestamp: new Date().toISOString()
    };
  }
}
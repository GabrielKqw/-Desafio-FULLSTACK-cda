import { Controller, Get, Req } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AppService } from './app.service';

@ApiTags('status')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({
    summary: 'Verificar status da API',
    description:
      'Retorna o status da aplicação e link para a documentação Swagger',
  })
  @ApiResponse({
    status: 200,
    description: 'Status da API',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: 'Server is running! 🚀' },
        version: { type: 'string', example: '1.0.0' },
        docs: { type: 'string', example: 'http://localhost:3200/api' },
        timestamp: { type: 'string', example: '2024-06-15T10:30:00.000Z' },
      },
    },
  })
  getAppStatus(@Req() req: Request) {
    const baseUrl = req.protocol + '://' + req.get('host');
    return this.appService.getAppStatus(baseUrl);
  }

  @Get('health')
  @ApiOperation({
    summary: 'Health check',
    description: 'Endpoint para verificar se o servidor está respondendo',
  })
  @ApiResponse({
    status: 200,
    description: 'Servidor saudável',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: 'ok' },
        uptime: { type: 'number', example: 123456 },
      },
    },
  })
  healthCheck() {
    return this.appService.healthCheck();
  }
}

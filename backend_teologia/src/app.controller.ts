import { Controller, Get, Version } from '@nestjs/common';
import { AppService, StatusPayload } from './app.service';
import { ApiTags, ApiOperation, ApiOkResponse } from '@nestjs/swagger';

@ApiTags('App')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * GET /v1
   * Retorna um status rápido da API (usado como verificação simples).
   */
  @Get()
  @Version('1')
  @ApiOperation({ summary: 'Status resumido da API (v1)' })
  @ApiOkResponse({ schema: { example: { status: 'ok' } } })
  getRoot(): { status: 'ok' } {
    return { status: 'ok' };
  }

  /**
   * GET /v1/status
   * Retorna informações detalhadas da aplicação (versão, ambiente, memória, etc.).
   */
  @Get('status')
  @Version('1')
  @ApiOperation({ summary: 'Health-check detalhado da API' })
  @ApiOkResponse({
    description: 'Informações detalhadas da API, ambiente e uso de recursos.',
    schema: {
      example: {
        status: 'ok',
        message: 'API do Projeto Teologia FATEAL funcionando!',
        version: '1.0.0',
        environment: 'production',
        port: 3000,
        uptime: 123,
        startedAt: '2025-06-23T17:14:32.123Z',
        timestamp: '2025-06-23T17:16:55.000Z',
        node: 'v20.18.3',
        memoryUsage: {
          rss: 12345678,
          heapTotal: 4567890,
          heapUsed: 2345678,
          external: 987654,
        },
      },
    },
  })
  getStatus(): StatusPayload {
    return this.appService.getStatus();
  }
}
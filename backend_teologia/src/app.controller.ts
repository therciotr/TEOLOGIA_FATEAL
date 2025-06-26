import {
  Controller,
  Get,
  Res,
  Version,
  HttpCode,
} from '@nestjs/common';
import { Response } from 'express';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiExcludeEndpoint,
} from '@nestjs/swagger';
import { AppService, StatusPayload } from './app.service';

@ApiTags('App')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * Endpoint raiz resumido da API
   * Ex: GET /api/v1
   */
  @Get()
  @Version('1')
  @HttpCode(200)
  @ApiOperation({ summary: 'Status resumido da API (v1)' })
  @ApiOkResponse({ schema: { example: { status: 'ok' } } })
  getRoot(): { status: 'ok' } {
    return { status: 'ok' };
  }

  /**
   * Status detalhado da API com informações do sistema
   * Ex: GET /api/v1/status
   */
  @Get('status')
  @Version('1')
  @HttpCode(200)
  @ApiOperation({ summary: 'Health-check detalhado da API' })
  @ApiOkResponse({
    description: 'Informações detalhadas da API',
    schema: {
      example: {
        status: 'ok',
        message: 'API funcionando!',
        version: '1.0.0',
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

  /**
   * Healthcheck simples da API para verificação externa
   * Ex: GET /api/v1/health
   */
  @Get('health')
  @Version('1')
  @HttpCode(200)
  @ApiOperation({ summary: 'Healthcheck externo (simples)' })
  @ApiOkResponse({ schema: { example: { status: 'ok' } } })
  getHealth(): { status: string } {
    return { status: 'ok' };
  }

  /**
   * Redireciona requisições diretas para /metrics → /api/v1/metrics
   * Evita erros 404 nos logs de monitoramento de infraestrutura
   * Ex: GET /metrics
   */
  @Get('metrics')
  @ApiExcludeEndpoint()
  redirectMetrics(@Res() res: Response) {
    // Redireciona com 302 para rota com versionamento
    res.redirect(302, '/api/v1/metrics');
  }
}

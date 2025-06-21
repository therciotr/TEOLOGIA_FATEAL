import { Controller, Get } from '@nestjs/common';
import { AppService, StatusPayload } from './app.service';
import { ApiTags, ApiOperation, ApiOkResponse } from '@nestjs/swagger';

@ApiTags('App')
@Controller({ path: '', version: '1' })
export class AppController {
  constructor(private readonly appService: AppService) {}

  /** GET /v1 ─ status simples */
  @Get()
  @ApiOperation({ summary: 'Status resumido da API (root)' })
  @ApiOkResponse({ schema: { example: { status: 'ok' } } })
  getRoot(): { status: 'ok' } {
    return { status: 'ok' };
  }

  /** GET /v1/status ─ health-check completo */
  @Get('status')
  @ApiOperation({ summary: 'Health-check detalhado' })
  @ApiOkResponse({
    schema: {
      example: {
        status: 'ok',
        message: 'API do Projeto Teologia FATEAL funcionando!',
        version: '1.0.0',
        environment: 'production',
        port: 3000,
        uptime: 123,
        startedAt: '2025-06-19T17:14:32.123Z',
        timestamp: '2025-06-19T17:16:55.000Z',
        node: 'v20.18.3',
      },
    },
  })
  getStatus(): StatusPayload {
    return this.appService.getStatus();
  }
}
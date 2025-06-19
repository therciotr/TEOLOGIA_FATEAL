// src/app.controller.ts
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
} from '@nestjs/swagger';

/**
 * Controlador principal – status e health-check.
 *
 * NOTA:
 * • `path: ''` ➜ NÃO há “v1” aqui; o Nest acrescenta via versionamento URI.
 * • `version: '1'` ➜ rotas expostas em /v1/...
 */
@ApiTags('App')
@Controller({ path: '', version: '1' })
export class AppController {
  constructor(private readonly appService: AppService) {}

  /** GET /v1  ── status resumido (usado em landing pages ou verificações simples). */
  @Get()
  @ApiOperation({ summary: 'Status da API (root)' })
  @ApiOkResponse({
    description: 'API online',
    schema: {
      example: { status: 'ok' },
    },
  })
  getRoot() {
    return { status: 'ok' };
  }

  /** GET /v1/status ── health-check completo. */
  @Get('status')
  @ApiOperation({ summary: 'Health-check detalhado' })
  @ApiOkResponse({
    description: 'Informações de saúde da aplicação',
    schema: {
      example: {
        status: 'ok',
        uptime: 123.45,
        timestamp: '2025-06-19T17:14:32.123Z',
        version: '1.0.0',
      },
    },
  })
  getStatus() {
    return this.appService.getStatus();
  }
}
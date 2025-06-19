import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

/**
 * 📁 app.controller.ts
 * Controlador principal da aplicação. Fornece endpoints públicos como status/saudação.
 */
@ApiTags('App')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * 🔹 Endpoint GET raiz ("/") — exibe o status resumido da API.
   */
  @Get()
  @ApiOperation({ summary: 'Status da API (rota raiz)' })
  getRoot(): object {
    return this.appService.getStatus();
  }

  /**
   * 🔹 Endpoint GET "/status" — rota alternativa para monitoramento e healthcheck.
   */
  @Get('/status')
  @ApiOperation({ summary: 'Verifica status e informações do servidor' })
  getStatus(): object {
    return this.appService.getStatus();
  }
}
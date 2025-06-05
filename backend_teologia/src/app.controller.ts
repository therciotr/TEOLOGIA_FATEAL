import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

/**
 * 📁 app.controller.ts
 * 
 * Controlador principal da aplicação, responsável por lidar com a rota raiz ("/").
 */
@Controller()
export class AppController {
  /**
   * Injeção de dependência do AppService para fornecer o status da aplicação.
   */
  constructor(private readonly appService: AppService) {}

  /**
   * 🔹 Endpoint GET raiz ("/") que retorna o status da API.
   * @returns Um objeto contendo status, mensagem, versão e timestamp.
   */
  @Get()
  getStatus(): object {
    return this.appService.getStatus();
  }
}
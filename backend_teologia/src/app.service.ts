import { Injectable } from '@nestjs/common';
import { version } from '../package.json';

/**
 * 📁 app.service.ts
 * Serviço responsável por retornar o status básico da API.
 */
@Injectable()
export class AppService {
  /**
   * Retorna informações úteis para verificação da aplicação.
   */
  getStatus(): Record<string, string> {
    const env = process.env.NODE_ENV ?? 'development';

    return {
      status: 'OK', // API está funcional
      message: 'API do Projeto Teologia FATEAL funcionando!',
      version: version, // Versão vinda do package.json
      environment: env,
      timestamp: new Date().toISOString(),
    };
  }
}
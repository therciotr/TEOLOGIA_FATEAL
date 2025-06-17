import { Injectable } from '@nestjs/common';

/**
 * 📁 app.service.ts
 * 
 * Serviço simples que fornece informações básicas sobre o status da API.
 */
@Injectable()
export class AppService {
  /**
   * 🔹 Retorna informações básicas de status da aplicação.
   */
  getStatus(): Record<string, string> {
    return {
      status: 'OK',                                  // Status geral da API
      message: 'API do Projeto Teologia FATEAL funcionando!', // Mensagem de status
      version: '1.0.0',                              // Versão da API
      timestamp: new Date().toISOString(),           // Timestamp atual (ISO format)
    };
  }
}
// src/common/filters/all-exceptions.filter.ts

import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

/**
 * 🔹 Filtro global de exceções do NestJS.
 * 📁 src/common/filters/all-exceptions.filter.ts
 * 
 * Este filtro captura qualquer exceção lançada em toda a aplicação,
 * garantindo uma resposta consistente ao cliente e logs detalhados no console.
 */
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  // Instância do Logger do NestJS para exibir erros de forma padronizada
  private readonly logger = new Logger(AllExceptionsFilter.name);

  /**
   * Método principal que lida com exceções capturadas.
   * @param exception - Exceção lançada
   * @param host - Contexto do NestJS
   */
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp(); // Contexto HTTP
    const response = ctx.getResponse(); // Resposta ao cliente
    const request = ctx.getRequest(); // Requisição do cliente

    // 🔹 Determina o status da resposta
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    // 🔹 Obtém a mensagem de erro (padrão ou da exceção)
    let message: string | object =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal server error';

    // 🔹 Se a mensagem for um objeto, converte para string ou extrai a chave "message"
    if (typeof message === 'object' && message !== null) {
      message = (message as any).message || JSON.stringify(message);
    }

    // 🔹 Estrutura padronizada para resposta de erro ao cliente
    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
    };

    // 🔹 Log detalhado para o console (útil para debugging e monitoramento)
    this.logger.error(
      `🚨 Status ${status} | Erro: ${JSON.stringify(errorResponse)}`,
      (exception as any).stack,
    );

    // 🔹 Retorna a resposta JSON ao cliente
    response.status(status).json(errorResponse);
  }
}
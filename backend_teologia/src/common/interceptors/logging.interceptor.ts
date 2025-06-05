import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

/**
 * 🔹 Interceptor global para logar requisições HTTP no NestJS.
 * 📁 src/common/interceptors/logging.interceptor.ts
 * 
 * Esse interceptor intercepta todas as requisições HTTP e loga
 * informações úteis como método, URL e tempo de execução da requisição.
 */
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  // Instância do Logger do NestJS para padronizar logs
  private readonly logger = new Logger(LoggingInterceptor.name);

  /**
   * Método que intercepta a requisição e adiciona o log.
   * @param context - Contexto de execução da requisição
   * @param next - Próximo manipulador (controller ou outro interceptor)
   * @returns Observable com a resposta da requisição
   */
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // 🔹 Obtém informações da requisição HTTP
    const request = context.switchToHttp().getRequest();
    const method = request.method;
    const url = request.url;

    const startTime = Date.now();

    // 🔹 Processa a requisição e mede o tempo de execução
    return next.handle().pipe(
      tap(() => {
        const endTime = Date.now() - startTime;
        // 🔹 Log do método, URL e tempo gasto
        this.logger.log(
          `🟢 [${method}] ${url} - ${endTime}ms`,
        );
      }),
    );
  }
}
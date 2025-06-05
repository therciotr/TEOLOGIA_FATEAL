import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import * as compression from 'compression'; // 👉 Adicione essa linha!

/**
 * Função principal (bootstrap) que inicia a aplicação NestJS.
 */
async function bootstrap() {
  // Criação da aplicação NestJS com CORS habilitado
  const app = await NestFactory.create(AppModule, { cors: true });

   // 👉 Middleware de compressão para respostas
  app.use(compression());

  // Logger global para inicialização
  const logger = new Logger('NestApplication');

  // Validação global de DTOs com whitelist (aceita apenas propriedades esperadas)
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
  }));

  // Filtro global para tratamento de todas as exceções (centralizado)
  app.useGlobalFilters(new AllExceptionsFilter());

  // Interceptor global para logs (tempo de requisição, método, etc.)
  app.useGlobalInterceptors(new LoggingInterceptor());

  // Configuração e inicialização do Swagger (Documentação da API)
  const swaggerConfig = new DocumentBuilder()
    .setTitle('API Teologia FATEAL')
    .setDescription('Documentação oficial da API do Projeto Teologia FATEAL.')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  // Definição da porta (usando variáveis de ambiente, padrão 3000)
  const port = process.env.PORT || 3000;
  await app.listen(port);

  // Logs de inicialização
  logger.log(`🚀 Aplicação iniciada em: http://localhost:${port}`);
  logger.log(`📚 Swagger disponível em: http://localhost:${port}/api`);
}

bootstrap();
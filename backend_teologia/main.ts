import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import * as compression from 'compression';

/**
 * Função principal (bootstrap) que inicia a aplicação NestJS.
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  // 👉 Middleware de compressão para respostas
  app.use(compression());

  // Logger global para inicialização
  const logger = new Logger('NestApplication');

  // Validação global de DTOs com whitelist
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Filtro global para tratamento de todas as exceções
  app.useGlobalFilters(new AllExceptionsFilter());

  // Interceptor global para logs
  app.useGlobalInterceptors(new LoggingInterceptor());

  // Habilita shutdown hooks para encerrar conexões ativas (ex: Prisma)
  app.enableShutdownHooks();

  // Configuração e inicialização do Swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('API Teologia FATEAL')
    .setDescription('Documentação oficial da API do Projeto Teologia FATEAL.')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  // Definição da porta
  const port = process.env.PORT || 3000;
  await app.listen(port);

  // Logs de inicialização
  logger.log(`🚀 Aplicação iniciada em: http://localhost:${port}`);
  logger.log(`📚 Swagger disponível em: http://localhost:${port}/api`);
}

bootstrap();
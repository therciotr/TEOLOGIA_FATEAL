import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';

/**
 * 📁 main.ts
 * 
 * Arquivo de inicialização da aplicação NestJS.
 * Aqui configuramos: validações, filtros globais, interceptores e Swagger.
 */
async function bootstrap() {
  // Criação da aplicação com CORS habilitado
  const app = await NestFactory.create(AppModule, { cors: true });

  // 🔹 Logger global
  const logger = new Logger('NestApp');

  // 🔹 Validação global para DTOs (com whitelisting e bloqueio de propriedades extras)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove propriedades não declaradas nos DTOs
      forbidNonWhitelisted: true, // Bloqueia propriedades não permitidas
      transform: true, // Transforma payloads para os tipos esperados nos DTOs
    }),
  );

  // 🔹 Filtro global para capturar e tratar exceções de forma unificada
  app.useGlobalFilters(new AllExceptionsFilter());

  // 🔹 Interceptor global para logar requisições e respostas
  app.useGlobalInterceptors(new LoggingInterceptor());

  // 🔹 Configuração do Swagger para documentação da API
  const config = new DocumentBuilder()
    .setTitle('API Teologia FATEAL')
    .setDescription(
      'Documentação da API para gestão de alunos, mensalidades, pagamentos e relatórios.',
    )
    .setVersion('1.0.0')
    .addBearerAuth() // Adiciona o suporte a autenticação via Bearer Token
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // 🔹 Porta configurada via variável de ambiente ou padrão 3000
  const port = process.env.PORT || 3000;

  // Inicia o servidor
  await app.listen(port);
  logger.log(`🚀 Aplicação rodando em: http://localhost:${port}`);
  logger.log(`📚 Swagger disponível em: http://localhost:${port}/api`);
}

// Inicializa a aplicação
bootstrap();
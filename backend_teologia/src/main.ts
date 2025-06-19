// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  ValidationPipe,
  Logger,
  VersioningType,
} from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import helmet from 'helmet';
import compression from 'compression';
import { json, urlencoded } from 'express';
import { PrismaService } from '@/prisma/prisma.service';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config(); // 🔹 Garante leitura de .env antes de tudo

  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  const logger = new Logger('NestBootstrap');

  /* ───────────── Segurança & Performance ───────────── */
  app.use(helmet());
  app.use(compression());

  app.enableCors({
    origin: process.env.CORS_ORIGIN?.split(',') ?? '*',
    credentials: true,
  });

  app.use(json({ limit: '5mb' }));
  app.use(urlencoded({ extended: true }));

  /* ───────────── Versão & Prefixo ───────────── */
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  app.setGlobalPrefix('v1');

  /* ───────────── Validação global ───────────── */
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  /* ───────────── Filtros & Interceptores ───────────── */
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new LoggingInterceptor());

  /* ───────────── Swagger ───────────── */
  const swaggerConfig = new DocumentBuilder()
    .setTitle('API Teologia FATEAL')
    .setDescription(
      'Documentação da API para gestão de alunos, mensalidades, pagamentos, planos, turmas e usuários.',
    )
    .setVersion(process.env.npm_package_version ?? '1.0.0')
    .addBearerAuth()
    .build();

  const swaggerDoc = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, swaggerDoc);

  /* ───────────── Shutdown graceful ───────────── */
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  /* ───────────── Inicialização ───────────── */
  const port = parseInt(process.env.PORT ?? '3000', 10);
  await app.listen(port);

  logger.log(`✅ Servidor rodando: http://localhost:${port}`);
  logger.log(`📘 Swagger disponível em: http://localhost:${port}/api`);
}

bootstrap();
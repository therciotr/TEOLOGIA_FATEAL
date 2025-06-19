import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  ValidationPipe,
  Logger,
  VersioningType,
} from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import compression from 'compression';
import { json, urlencoded } from 'express';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { PrismaService } from './prisma/prisma.service';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();                    // carrega .env

  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  /* ─── Segurança & performance ─── */
  app.use(helmet());
  app.use(compression());
  app.enableCors({
    origin: (process.env.CORS_ORIGIN ?? '*').split(','),
    credentials: true,
  });
  app.use(json({ limit: '10mb' }));
  app.use(urlencoded({ extended: true }));

  /* ─── SOMENTE versionamento URI ─── */
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
  // ❌ REMOVIDO: app.setGlobalPrefix('v1');

  /* ─── Validação, filtros, logs ─── */
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new LoggingInterceptor());

  /* ─── Swagger ─── */
  const swaggerCfg = new DocumentBuilder()
    .setTitle('API Teologia FATEAL')
    .setDescription('Documentação da API')
    .setVersion(process.env.npm_package_version ?? '1.0.0')
    .addBearerAuth()
    .build();
  SwaggerModule.setup('api',
    app,
    SwaggerModule.createDocument(app, swaggerCfg),
  );

  /* ─── Prisma shutdown graceful ─── */
  const prisma = app.get(PrismaService);
  await prisma.enableShutdownHooks(app);

  /* ─── Start ─── */
  const port = Number(process.env.PORT) || 3000;
  await app.listen(port, '0.0.0.0');
  logger.log(`🚀  API on http://localhost:${port}/v1/status`);
  logger.log(`📘  Swagger on http://localhost:${port}/api`);
}

bootstrap();
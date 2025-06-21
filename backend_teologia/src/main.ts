import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import compression from 'compression';
import { json, urlencoded } from 'express';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { PrismaService } from './prisma/prisma.service';
import { HttpAdapterHost } from '@nestjs/core';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();

  const app = await NestFactory.create(AppModule);
  const log = new Logger('Bootstrap');
  const port = Number(process.env.PORT) || 3000;
  const hostUrl = process.env.APP_URL ?? `http://localhost:${port}`;

  
  app.use(helmet({ contentSecurityPolicy: false }));
  app.use(compression());
  
  const { httpAdapter } = app.get(HttpAdapterHost);
  if ('getInstance' in httpAdapter) {
    (httpAdapter.getInstance() as any).set('trust proxy', true);
  }

  
  app.use(json({ limit: '10mb' }));
  app.use(urlencoded({ extended: true, limit: '10mb' }));

 
  const corsOrigins = (process.env.CORS_ORIGIN ?? '*')
    .split(',')
    .map(o => o.trim())
    .filter(Boolean);
  app.enableCors({ origin: corsOrigins.length ? corsOrigins : '*', credentials: true });

  
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });

 
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new LoggingInterceptor());

 
  const cfg = new DocumentBuilder()
    .setTitle('API Teologia FATEAL')
    .setVersion(process.env.npm_package_version ?? '1.0.0')
    .addBearerAuth()
    .build();
  SwaggerModule.setup('api', app, SwaggerModule.createDocument(app, cfg));

 
  await app.get(PrismaService).enableShutdownHooks(app);

  await app.listen(port, '0.0.0.0');
  log.log(`🚀  API:     ${hostUrl}/v1/status`);
  log.log(`📘  Swagger: ${hostUrl}/api`);
}

bootstrap();
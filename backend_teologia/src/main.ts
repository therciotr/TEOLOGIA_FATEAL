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
  const logger = new Logger('Bootstrap');

  const port = Number(process.env.PORT) || 3000;
  const appUrl = process.env.APP_URL ?? `http://localhost:${port}`;

  // 🌐 Prefixo base fixo (/api)
  const globalPrefix = 'api';
  const versionPrefix = 'v1';
  app.setGlobalPrefix(globalPrefix); // 🔁 CORRIGIDO: sem duplicar versão

  // 🔐 Segurança e performance
  app.use(helmet({ contentSecurityPolicy: false }));
  app.use(compression());

  // 💡 Confiança no proxy reverso
  const { httpAdapter } = app.get(HttpAdapterHost);
  if ('getInstance' in httpAdapter) {
    (httpAdapter.getInstance() as any).set('trust proxy', true);
  }

  // 📦 Body parsers com limite estendido
  app.use(json({ limit: '10mb' }));
  app.use(urlencoded({ extended: true, limit: '10mb' }));

  // 🌍 CORS com origem múltipla
  const corsOrigins = (process.env.CORS_ORIGIN ?? '*')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean);
  app.enableCors({
    origin: corsOrigins.length ? corsOrigins : '*',
    credentials: true,
  });

  // 🧬 Versionamento URI (/v1/...)
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: versionPrefix,
  });

  // 🛡️ Validações e interceptadores globais
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new LoggingInterceptor());

  // 📘 Swagger com rota e base correta
  const swaggerConfig = new DocumentBuilder()
    .setTitle('API Teologia FATEAL')
    .setDescription('Documentação oficial da API FATEAL')
    .setVersion(process.env.npm_package_version ?? '1.0.0')
    .addBearerAuth()
    .addServer(`${appUrl}/${globalPrefix}/${versionPrefix}`) // Ex: https://api.fateal.trsystemas.com.br/api/v1
    .setContact('TR Tecnologias', 'https://trsystemas.com.br', 'suporte@trsystemas.com.br')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup(`${globalPrefix}/docs`, app, document); // /api/docs

  // 🧠 Prisma shutdown hook
  await app.get(PrismaService).enableShutdownHooks(app);

  // 🚀 Inicialização
  await app.listen(port, '0.0.0.0');
  logger.log(`🚀 API online: ${appUrl}/${globalPrefix}/${versionPrefix}/status`);
  logger.log(`📘 Swagger:   ${appUrl}/${globalPrefix}/docs`);
}

bootstrap();

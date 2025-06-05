import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

import { PrismaModule } from './prisma/prisma.module';
import { AlunosModule } from './alunos/alunos.module';
import { MensalidadesModule } from './mensalidades/mensalidades.module';
import { PagamentosModule } from './pagamentos/pagamentos.module';
import { DocumentosModule } from './alunos/uploads/documentos/documentos.module';

import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';

import { ThrottlerModule } from '@nestjs/throttler'; // 👉 Adicione essa linha!

/**
 * 📁 app.module.ts
 * 
 * Módulo raiz da aplicação NestJS, que centraliza e organiza:
 * - Módulos da aplicação
 * - Configurações globais
 * - Filtros e interceptadores globais
 */
@Module({
  imports: [
    // 🔹 Módulo de configuração para variáveis de ambiente (.env) - global
    ConfigModule.forRoot({
      isGlobal: true, // Torna o ConfigModule disponível em toda a aplicação
    }),

    // 👉 Módulo de rate limiting para evitar DoS e limitar acessos
    ThrottlerModule.forRoot({
      ttl: 60, // Tempo de janela em segundos
      limit: 100, // Limite de requisições por IP
    }),

    // 🔹 Módulos principais da aplicação
    PrismaModule,          // Integração com o Prisma (banco de dados)
    AlunosModule,          // Gestão de alunos
    MensalidadesModule,    // Gestão de mensalidades
    PagamentosModule,      // Gestão de pagamentos
    DocumentosModule,      // Uploads de documentos de alunos
  ],
  providers: [
    // 🔹 Interceptor global para log de requisições/respostas
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    // 🔹 Filtro global para capturar e tratar exceções
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
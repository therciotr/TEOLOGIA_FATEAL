// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

import { PrismaModule } from '@/prisma/prisma.module';
import { AlunosModule } from './alunos/alunos.module';
import { MensalidadesModule } from './mensalidades/mensalidades.module';
import { PagamentosModule } from './pagamentos/pagamentos.module';
import { DocumentosModule } from './alunos/uploads/documentos/documentos.module';

import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';

import { FirebaseModule } from './firebase/firebase.module';
// ⚠️ Se for usar o Throttler, descomente as linhas abaixo e garante a dependência
// import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    // ThrottlerModule.forRoot({ ttl: 60, limit: 100 }), // opcional
    FirebaseModule,            // disponível globalmente
    PrismaModule,

    // Feature-modules
    AlunosModule,
    MensalidadesModule,
    PagamentosModule,
    DocumentosModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
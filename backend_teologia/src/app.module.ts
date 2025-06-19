import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

import { PrismaModule } from '@/prisma/prisma.module';
import { FirebaseModule } from '@firebase/firebase.module';

// Feature modules
import { AlunosModule } from './alunos/alunos.module';
import { MensalidadesModule } from './mensalidades/mensalidades.module';
import { PagamentosModule } from './pagamentos/pagamentos.module';
import { DocumentosModule } from './alunos/uploads/documentos/documentos.module';

// Infra
import { AppService } from './app.service';
import { AppController } from './app.controller';

// Globais
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';

// Rate limiter opcional
// import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    // ThrottlerModule.forRoot({ ttl: 60, limit: 100 }), // proteção básica contra abusos

    FirebaseModule, // módulo global
    PrismaModule,

    // Módulos funcionais
    AlunosModule,
    MensalidadesModule,
    PagamentosModule,
    DocumentosModule,
  ],

  controllers: [AppController], // Adicionado
  providers: [
    AppService,                 // Adicionado
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
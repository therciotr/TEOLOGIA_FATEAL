import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

// Módulos principais
import { PrismaModule } from './prisma/prisma.module';
import { FirebaseModule } from './firebase/firebase.module';

// Módulos de domínio
import { AlunosModule } from './alunos/alunos.module';
import { MensalidadesModule } from './mensalidades/mensalidades.module';
import { PagamentosModule } from './pagamentos/pagamentos.module';
import { DocumentosModule } from './alunos/uploads/documentos/documentos.module';

// Controllers globais
import { AppController } from './app.controller';
import { HealthController } from './health/health.controller';
import { MetricsController } from './metrics/metrics.controller';
import { StatusController } from './controllers/status.controller';

// Serviços
import { AppService } from './app.service';

// Filtros e interceptadores globais
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    FirebaseModule,

    // Módulos de domínio
    AlunosModule,
    MensalidadesModule,
    PagamentosModule,
    DocumentosModule,
  ],
  controllers: [
    AppController,
    HealthController,
    MetricsController,
    StatusController,
  ],
  providers: [
    AppService,

    // Log de requisições e respostas
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },

    // Tratamento global de exceções
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}

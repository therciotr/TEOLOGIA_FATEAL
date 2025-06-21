import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

import { PrismaModule } from '@/prisma/prisma.module';
import { FirebaseModule } from '@firebase/firebase.module';


import { AlunosModule } from './alunos/alunos.module';
import { MensalidadesModule } from './mensalidades/mensalidades.module';
import { PagamentosModule } from './pagamentos/pagamentos.module';
import { DocumentosModule } from './alunos/uploads/documentos/documentos.module';


import { AppService } from './app.service';
import { AppController } from './app.controller';


import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';



@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    

    FirebaseModule, 
    PrismaModule,

    
    AlunosModule,
    MensalidadesModule,
    PagamentosModule,
    DocumentosModule,
  ],

  controllers: [AppController], 
  providers: [
    AppService,                 
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
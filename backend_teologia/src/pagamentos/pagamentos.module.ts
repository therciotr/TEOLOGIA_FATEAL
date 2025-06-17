// src/pagamentos/pagamentos.module.ts
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';              // opcional
import { PrismaModule } from '@/prisma/prisma.module';

import { PagamentosController } from './pagamentos.controller';
import { PagamentosService } from './pagamentos.service';
import { PagamentosBancosService } from './pagamentos-bancos.service';

@Module({
  imports: [
    PrismaModule,
    // Se você usa variáveis .env nos serviços
    // ConfigModule.forRoot({ isGlobal: true }),

    HttpModule.register({
      timeout: 8000,
      maxRedirects: 5,
      headers: {
        'Content-Type': 'application/json',
      },
    }),
  ],
  controllers: [PagamentosController],
  providers: [PagamentosService, PagamentosBancosService],
  exports: [PagamentosService, PagamentosBancosService],     // 👈 agora exporta ambos
})
export class PagamentosModule {}
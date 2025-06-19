import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from '@/prisma/prisma.module';

import { PagamentosController } from './pagamentos.controller';
import { PagamentosService } from './pagamentos.service';
import { PagamentosBancosService } from './pagamentos-bancos.service';

/**
 * 📦 PagamentosModule
 * Responsável pelo controle de pagamentos, integração com bancos
 * (ex: Banco do Brasil, Asaas, etc.) e marcação de mensalidades.
 */
@Module({
  imports: [
    PrismaModule,

    // Configurações globais (.env)
    ConfigModule.forRoot({ isGlobal: true }),

    // HTTP client usado para integração com PSPs externos
    HttpModule.register({
      timeout: 8000,
      maxRedirects: 5,
      headers: {
        'Content-Type': 'application/json',
      },
    }),
  ],

  controllers: [PagamentosController],

  providers: [
    PagamentosService,
    PagamentosBancosService,
  ],

  exports: [
    PagamentosService,
    PagamentosBancosService, // exportado para uso externo (ex: outros módulos)
  ],
})
export class PagamentosModule {}
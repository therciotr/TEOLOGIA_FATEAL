// src/comprovantes/comprovantes.module.ts

import { Module } from '@nestjs/common';
import { ComprovantesService } from './comprovantes.service';
import { ComprovantesController } from './comprovantes.controller';
import { PrismaModule } from '@/prisma/prisma.module'; // ✅ Usando alias @ para padronização

/**
 * 📦 ComprovantesModule
 * Módulo responsável pelo gerenciamento de comprovantes de pagamento.
 */
@Module({
  imports: [PrismaModule],                 // ✅ Prisma injetado corretamente
  controllers: [ComprovantesController],   // ✅ Controller de rotas HTTP
  providers: [ComprovantesService],        // ✅ Service com a lógica de negócios
  exports: [ComprovantesService],          // ✅ Disponível para outros módulos
})
export class ComprovantesModule {}
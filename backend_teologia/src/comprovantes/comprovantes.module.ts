// src/comprovantes/comprovantes.module.ts

import { Module } from '@nestjs/common';
import { ComprovantesService } from './comprovantes.service';
import { ComprovantesController } from './comprovantes.controller';
import { PrismaModule } from '@/prisma/prisma.module'; // ✅ Usando alias @ para padronização

/**
 * 📦 ComprovantesModule
 * Módulo responsável pelo gerenciamento de comprovantes.
 */
@Module({
  imports: [PrismaModule], // 🔹 Importa PrismaModule para injetar PrismaService
  controllers: [ComprovantesController], // 🔹 Controlador para rotas HTTP de comprovantes
  providers: [ComprovantesService], // 🔹 Serviço que contém a lógica de negócios
  exports: [ComprovantesService], // 🔹 Exporta para uso em outros módulos, se necessário
})
export class ComprovantesModule {}
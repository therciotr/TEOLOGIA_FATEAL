// src/planos/planos.module.ts

import { Module } from '@nestjs/common';
import { PlanosService } from './planos.service';
import { PlanosController } from './planos.controller';
import { PrismaModule } from '@/prisma/prisma.module';

/**
 * 📦 PlanosModule
 * Módulo responsável pelo gerenciamento de planos.
 * Controla criação, atualização e exclusão de planos financeiros.
 */
@Module({
  imports: [
    PrismaModule, // 🔹 Serviço de acesso ao banco de dados via Prisma
  ],
  controllers: [
    PlanosController, // 🔹 Rotas públicas expostas
  ],
  providers: [
    PlanosService, // 🔹 Lógica de negócio centralizada
  ],
  exports: [
    PlanosService, // 🔹 Disponibiliza para outros módulos se necessário
  ],
})
export class PlanosModule {}
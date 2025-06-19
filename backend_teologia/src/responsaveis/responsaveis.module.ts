// src/responsaveis/responsaveis.module.ts
import { Module } from '@nestjs/common';
import { PrismaModule } from '@/prisma/prisma.module';
import { ResponsaveisService } from './responsaveis.service';
import { ResponsaveisController } from './responsaveis.controller';

/**
 * 📦 ResponsaveisModule
 * Módulo responsável por gerenciar os responsáveis vinculados a alunos.
 */
@Module({
  imports: [
    PrismaModule, // ✅ Importa PrismaModule (global)
    // AuthModule, // ⬅️ futuro: autenticação/guards
  ],
  controllers: [ResponsaveisController],
  providers: [ResponsaveisService],
  exports: [ResponsaveisService], // ✅ Exporta para outros módulos que usem responsável (como Alunos)
})
export class ResponsaveisModule {}
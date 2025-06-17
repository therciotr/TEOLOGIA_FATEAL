// src/planos/planos.module.ts

import { Module } from '@nestjs/common';
import { PlanosService } from './planos.service';
import { PlanosController } from './planos.controller';
import { PrismaModule } from '@/prisma/prisma.module';

/**
 * 📦 PlanosModule
 * Módulo responsável pelo gerenciamento de planos.
 */
@Module({
  imports: [PrismaModule],
  controllers: [PlanosController],
  providers: [PlanosService],
  exports: [PlanosService], // ✅ Exporta o serviço para outros módulos
})
export class PlanosModule {}
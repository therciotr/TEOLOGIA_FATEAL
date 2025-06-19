// src/turmas/turmas.module.ts

import { Module } from '@nestjs/common';
import { TurmasController } from './turmas.controller';
import { TurmasService } from './turmas.service';
import { PrismaModule } from '@/prisma/prisma.module';
import { PlanosModule } from '@/planos/planos.module'; // caso queira usar dados de plano diretamente

/**
 * 📦 TurmasModule
 * Módulo responsável pelo gerenciamento de turmas.
 */
@Module({
  imports: [
    PrismaModule,
    // PlanosModule, // descomente se for utilizar dependência cruzada (ex: associar plano a turma via validação)
  ],
  controllers: [TurmasController],
  providers: [TurmasService],
  exports: [TurmasService], // permite que outros módulos usem o serviço
})
export class TurmasModule {}
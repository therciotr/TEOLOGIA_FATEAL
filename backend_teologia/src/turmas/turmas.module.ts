// src/turmas/turmas.module.ts
import { Module } from '@nestjs/common';
import { TurmasController } from './turmas.controller';
import { TurmasService } from './turmas.service';
import { PrismaModule } from '@/prisma/prisma.module'; // ✅ Importa PrismaService para acesso ao banco

@Module({
  imports: [PrismaModule], // ✅ Necessário se o service usar Prisma
  controllers: [TurmasController],
  providers: [TurmasService],
  exports: [TurmasService], // ✅ Exporta se outros módulos forem usar esse service
})
export class TurmasModule {}
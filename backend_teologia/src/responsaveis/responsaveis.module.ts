// src/responsaveis/responsaveis.module.ts
import { Module } from '@nestjs/common';
import { ResponsaveisService } from './responsaveis.service';
import { ResponsaveisController } from './responsaveis.controller';
import { PrismaModule } from '@/prisma/prisma.module';

@Module({
  imports: [PrismaModule], // ✅ Prisma centralizado e reaproveitável
  controllers: [ResponsaveisController], // ✅ Controller REST
  providers: [ResponsaveisService],      // ✅ Service com regras de negócio
  exports: [ResponsaveisService],        // ✅ Exportável para uso em outros módulos (ex: Alunos)
})
export class ResponsaveisModule {}
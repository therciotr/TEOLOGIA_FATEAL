// src/mensalidades/mensalidades.module.ts

import { Module } from '@nestjs/common';
import { MensalidadesService } from './mensalidades.service';
import { MensalidadesController } from './mensalidades.controller';
import { PrismaModule } from '@/prisma/prisma.module'; // ✅ Usando alias @ para consistência

/**
 * 📦 MensalidadesModule
 * Módulo responsável pelas mensalidades dos alunos.
 */
@Module({
  imports: [PrismaModule], // ✅ Importa PrismaModule para acessar PrismaService
  controllers: [MensalidadesController], // ✅ Controlador de rotas
  providers: [MensalidadesService],      // ✅ Serviço que contém as regras de negócio
  exports: [MensalidadesService],        // ✅ Exporta caso outro módulo precise usar o serviço
})
export class MensalidadesModule {}
// src/alunos/uploads/documentos/documentos.module.ts

import { Module } from '@nestjs/common';
import { DocumentosService } from './documentos.service';
import { DocumentosController } from './documentos.controller';
import { PrismaModule } from '@/prisma/prisma.module'; // ✅ Usando alias @

/**
 * 📦 DocumentosModule
 * Módulo responsável pelo upload e gerenciamento dos documentos dos alunos.
 */
@Module({
  imports: [PrismaModule],         // ✅ Importa o módulo Prisma para usar PrismaService
  controllers: [DocumentosController], // ✅ Controlador que lida com rotas HTTP
  providers: [DocumentosService],      // ✅ Serviço que lida com regras de negócio
  exports: [DocumentosService],        // ✅ Exporta para uso em outros módulos
})
export class DocumentosModule {}
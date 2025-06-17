import { Module } from '@nestjs/common';
import { DocumentosService } from './documentos.service';
import { DocumentosController } from './documentos.controller';
import { PrismaModule } from '@/prisma/prisma.module'; // ✅ Usando alias @

/**
 * 📦 DocumentosModule
 * Módulo responsável pelo upload e gerenciamento dos documentos dos alunos.
 */
@Module({
  imports: [PrismaModule],                 // ✅ Prisma injetado corretamente
  controllers: [DocumentosController],     // ✅ Controller exposto
  providers: [DocumentosService],          // ✅ Service injetado
  exports: [DocumentosService],            // ✅ Exporta o serviço para uso externo
})
export class DocumentosModule {}
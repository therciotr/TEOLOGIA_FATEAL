import { Module } from '@nestjs/common';
import { AlunosController } from './alunos.controller';
import { AlunosService } from './alunos.service';
import { PrismaModule } from '@/prisma/prisma.module'; // ✅ Importa o PrismaModule

/**
 * Módulo responsável por agrupar as funcionalidades de "Alunos":
 * - Controller (rotas e handlers HTTP)
 * - Service (lógica de negócio e integração com banco via Prisma)
 */
@Module({
  imports: [PrismaModule],         // ✅ Garante acesso ao banco de dados
  controllers: [AlunosController], // Registra o Controller
  providers: [AlunosService],      // Registra o Service
})
export class AlunosModule {}
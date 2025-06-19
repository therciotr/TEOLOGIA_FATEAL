// src/alunos/alunos.module.ts
import { Module } from '@nestjs/common';
import { AlunosController } from './alunos.controller';
import { AlunosService } from './alunos.service';

// ✅ Módulo para conexão com banco de dados via Prisma
import { PrismaModule } from '@/prisma/prisma.module';

// ✅ FirebaseModule fora de src/, acessado via alias "@firebase"
import { FirebaseModule } from '@firebase/firebase.module';

/**
 * Módulo responsável por agrupar as funcionalidades de "Alunos":
 * - Controller (rotas e handlers HTTP)
 * - Service (lógica de negócio e integração com banco e Firebase)
 */
@Module({
  imports: [
    PrismaModule,     // 🔗 Integração com banco via Prisma
    FirebaseModule,   // 🔥 Permite injeção de FirestoreProvider no Service
  ],
  controllers: [AlunosController],
  providers: [AlunosService],
  exports: [AlunosService], // ✅ Permite que outros módulos reutilizem o serviço
})
export class AlunosModule {}
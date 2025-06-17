// src/usuarios/usuarios.module.ts

import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { PrismaModule } from '@/prisma/prisma.module';

/**
 * 📦 UsuariosModule
 * Módulo responsável por gerenciar os usuários do sistema.
 */
@Module({
  imports: [PrismaModule],           // ✅ Importa PrismaModule para acesso ao banco
  controllers: [UsuariosController], // ✅ Define o controller com as rotas
  providers: [UsuariosService],      // ✅ Serviço com as regras de negócio
})
export class UsuariosModule {}
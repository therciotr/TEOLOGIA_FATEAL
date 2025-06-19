// src/usuarios/usuarios.module.ts

import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { PrismaModule } from '@/prisma/prisma.module';

/**
 * 📦 UsuariosModule
 * Módulo responsável pela gestão dos usuários do sistema.
 * 
 * ✅ Integração com o PrismaService via PrismaModule.
 * ✅ Registro do controller e service.
 * 🔄 Preparado para exportar o service (caso outros módulos precisem usá-lo).
 * 🔐 Pronto para futura integração com AuthModule, JWT e Guardiões.
 */
@Module({
  imports: [PrismaModule],
  controllers: [UsuariosController],
  providers: [UsuariosService],
  exports: [UsuariosService], // 👈 permite que outros módulos utilizem o serviço (ex: AuthModule)
})
export class UsuariosModule {}
// src/prisma/prisma.module.ts

import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service'; // 🔹 Corrigido para relativo

/**
 * ✅ PrismaModule
 * Módulo global que disponibiliza o PrismaService para toda a aplicação.
 *
 * 🟦 Por ser um módulo "Global", ao importar PrismaModule uma única vez
 * no AppModule (ou em outro ponto de entrada), ele estará acessível em
 * todos os outros módulos automaticamente (sem necessidade de reimportar).
 *
 * 🔥 Isso facilita o acesso ao PrismaService em qualquer parte do projeto.
 */
@Global() // 🔹 Marca o módulo como global (não precisa importar em cada módulo)
@Module({
  providers: [PrismaService], // 🔹 PrismaService fornecido como provider
  exports: [PrismaService],   // 🔹 Exporta PrismaService para uso externo
})
export class PrismaModule {}
// src/prisma/prisma.service.ts

import { Injectable, OnModuleInit, INestApplication } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

/**
 * ✅ PrismaService
 * Serviço que gerencia a conexão com o banco de dados usando Prisma Client.
 *
 * 🟦 Este serviço estende o PrismaClient nativo e adiciona recursos de:
 *  - Conexão inicial ao iniciar o módulo (onModuleInit)
 *  - Fechamento automático ao desligar o app (enableShutdownHooks)
 *
 * 🔹 Para usá-lo, injete em qualquer módulo que precise acessar o banco:
 *   constructor(private readonly prisma: PrismaService) {}
 */
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  /**
   * 🔹 Executado quando o módulo é inicializado (start da aplicação)
   * Conecta ao banco.
   */
  async onModuleInit() {
    await this.$connect();
  }

  /**
   * 🔹 Permite ao PrismaService ouvir eventos de encerramento da aplicação
   * e fechar a conexão de forma segura.
   *
   * @param app Instância da aplicação NestJS
   */
  async enableShutdownHooks(app: INestApplication) {
    // 👇 Ajuste para evitar o erro TS2345: "Argument of type '"beforeExit"' is not assignable..."
    (this as any).$on('beforeExit', async () => {
      await app.close();
    });
  }
}
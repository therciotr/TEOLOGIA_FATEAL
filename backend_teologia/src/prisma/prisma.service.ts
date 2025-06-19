// src/prisma/prisma.service.ts
import {
  Injectable,
  INestApplication,
  OnModuleInit,
  OnModuleDestroy,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

/**
 * PrismaService
 *  ─ Conecta ao banco quando o módulo inicia
 *  ─ Desconecta corretamente quando o app encerra
 *  ─ Trata SIGINT / SIGTERM para produção (PM2, Docker, systemd…)
 */
@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  /** Conecta assim que o módulo sobe */
  async onModuleInit() {
    await this.$connect();
  }

  /** Desconecta ao destruir o módulo (e2e tests, shutdown) */
  async onModuleDestroy() {
    await this.$disconnect();
  }

  /**
   * Garante que o Nest feche o listener HTTP e,
   * em seguida, desconecte do banco antes de sair.
   */
  async enableShutdownHooks(app: INestApplication) {
    // Faz o NestJS ouvir SIGINT / SIGTERM
    app.enableShutdownHooks();

    const shutdown = async () => {
      /* Fechar a aplicação Nest + connections do Prisma */
      await app.close();
      await this.$disconnect();
      process.exit(0);
    };

    process.once('SIGINT', shutdown);  // Ctrl-C
    process.once('SIGTERM', shutdown); // Docker / PM2 / systemd
  }
}
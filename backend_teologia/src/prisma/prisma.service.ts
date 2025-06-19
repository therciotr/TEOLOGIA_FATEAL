// src/prisma/prisma.service.ts
import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  INestApplication,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

/**
 * PrismaService
 * - Conecta ao banco quando o módulo inicia.
 * - Desconecta corretamente quando o app encerra.
 */
@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  /**
   * Garante fechamento correto ao encerrar a aplicação NestJS.
   */
  async enableShutdownHooks(app: INestApplication) {
    // 👇 Cast para evitar erro de tipo no evento `beforeExit`
    (this as unknown as { $on(event: string, cb: () => void): void }).$on(
      'beforeExit',
      async () => {
        await app.close();
      },
    );
  }
}
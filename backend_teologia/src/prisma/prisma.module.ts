// src/prisma/prisma.module.ts

import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

/**
 * ✅ PrismaModule
 * Módulo global que disponibiliza o PrismaService para toda a aplicação.
 */
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
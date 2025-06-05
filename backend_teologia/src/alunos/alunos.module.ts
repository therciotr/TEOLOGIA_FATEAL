// src/alunos/alunos.module.ts

import { Module } from '@nestjs/common';
import { AlunosController } from './alunos.controller';
import { AlunosService } from './alunos.service';

/**
 * Módulo responsável por agrupar as funcionalidades de "Alunos":
 * - Controller (rotas e handlers HTTP)
 * - Service (lógica de negócio e integração com repositórios/banco)
 *
 * Isso permite o NestJS injetar as dependências corretamente e
 * manter o projeto organizado em módulos.
 */
@Module({
  controllers: [AlunosController], // Registra o Controller
  providers: [AlunosService],      // Registra o Service
})
export class AlunosModule {}
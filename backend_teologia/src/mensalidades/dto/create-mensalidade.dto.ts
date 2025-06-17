// src/mensalidades/dto/create-mensalidade.dto.ts

import { IsNotEmpty, IsString, IsNumber, IsDateString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO para criação de mensalidade.
 */
export class CreateMensalidadeDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'f3b1f4e3-4c2d-42d7-91e3-8e3b3b2e7231', description: 'ID do aluno vinculado' })
  alunoId: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 100.50, description: 'Valor da mensalidade' })
  valor: number;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({ example: '2025-06-01', description: 'Data de vencimento (formato ISO)' })
  vencimento: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'pendente', required: false, description: 'Status da mensalidade (default: pendente)' })
  status?: string;
}
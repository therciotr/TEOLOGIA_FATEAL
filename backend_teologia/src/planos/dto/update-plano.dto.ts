// src/planos/dto/update-plano.dto.ts

import { PartialType } from '@nestjs/swagger';
import { CreatePlanoDto } from './create-plano.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber, Min } from 'class-validator';

/**
 * DTO para atualização de um plano financeiro.
 * Todos os campos são opcionais.
 */
export class UpdatePlanoDto extends PartialType(CreatePlanoDto) {
  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'Plano Premium',
    required: false,
    description: 'Nome atualizado do plano (opcional)',
  })
  nome?: string;

  @IsOptional()
  @IsNumber()
  @Min(0.01)
  @ApiProperty({
    example: 250.0,
    required: false,
    description: 'Novo valor do plano (opcional)',
    minimum: 0.01,
  })
  valorPadrao?: number;
}
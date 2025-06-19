// src/planos/dto/create-plano.dto.ts

import { IsNotEmpty, IsString, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO para criação de um plano financeiro.
 */
export class CreatePlanoDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Plano Ouro',
    description: 'Nome identificador do plano',
  })
  nome: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0.01)
  @ApiProperty({
    example: 150.0,
    description: 'Valor padrão do plano em reais (R$)',
    minimum: 0.01,
  })
  valorPadrao: number;
}
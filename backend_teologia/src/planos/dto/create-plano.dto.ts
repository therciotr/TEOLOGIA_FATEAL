// src/planos/dto/create-plano.dto.ts

import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
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
  @ApiProperty({
    example: 150.0,
    description: 'Valor do plano em reais (R$)',
  })
  valor: number;
}
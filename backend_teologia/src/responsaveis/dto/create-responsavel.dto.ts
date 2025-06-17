// src/responsaveis/dto/create-responsavel.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

/**
 * DTO para criação de um responsável.
 */
export class CreateResponsavelDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Maria Silva',
    description: 'Nome completo do responsável',
  })
  nome!: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    example: 'maria@email.com',
    description: 'E-mail único do responsável',
  })
  email!: string;

  @IsOptional()
  @IsString()
  @Matches(/^\+?\d{10,15}$/, {
    message: 'Telefone deve estar no formato +5511999999999',
  })
  @ApiProperty({
    example: '+5582999999999',
    required: false,
    description: 'Telefone de contato (formato internacional)',
  })
  telefone?: string;
}
// src/responsaveis/dto/update-responsavel.dto.ts
import { PartialType } from '@nestjs/swagger';
import { CreateResponsavelDto } from './create-responsavel.dto';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsEmail,
  Matches,
} from 'class-validator';

/**
 * DTO para atualização parcial de um responsável.
 */
export class UpdateResponsavelDto extends PartialType(CreateResponsavelDto) {
  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'Maria de Souza',
    required: false,
    description: 'Nome completo atualizado do responsável',
  })
  nome?: string;

  @IsOptional()
  @IsEmail()
  @ApiProperty({
    example: 'maria@novaempresa.com',
    required: false,
    description: 'Novo e-mail válido do responsável',
  })
  email?: string;

  @IsOptional()
  @IsString()
  @Matches(/^\+?\d{10,15}$/, {
    message: 'Telefone deve estar no formato +5511999999999',
  })
  @ApiProperty({
    example: '+5582988889999',
    required: false,
    description: 'Telefone atualizado (formato internacional)',
  })
  telefone?: string;
}
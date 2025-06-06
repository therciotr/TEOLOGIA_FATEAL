// src/alunos/dto/update-aluno.dto.ts

import { PartialType } from '@nestjs/swagger';
import { CreateAlunoDto } from './create-aluno.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsBoolean } from 'class-validator';

/**
 * DTO para atualização de aluno.
 * 🔥 Herda todos os campos opcionais de CreateAlunoDto (PartialType).
 * 🔥 Inclui comentários e descrições detalhadas para documentação Swagger.
 */
export class UpdateAlunoDto extends PartialType(CreateAlunoDto) {
  /**
   * Endereço atualizado do aluno (opcional).
   */
  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'Rua das Palmeiras, 321',
    description: 'Endereço atualizado do aluno (opcional)',
    required: false,
  })
  endereco?: string;

  /**
   * RG atualizado do aluno (opcional).
   */
  @IsOptional()
  @IsString()
  @ApiProperty({
    example: '98765432',
    description: 'RG atualizado do aluno (opcional)',
    required: false,
  })
  rg?: string;

  /**
   * Status atualizado da matrícula do aluno.
   * true = matrícula paga | false = matrícula não paga.
   */
  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    example: true,
    description: 'Atualização do status de matrícula (opcional)',
    required: false,
  })
  matriculaPaga?: boolean;

  /**
   * 🔥 Importante!
   * Campo `fotoUrl` herdado do CreateAlunoDto (opcional), necessário para o backend
   * pois o controller manipula esse campo após upload da foto (evita erro de build!).
   * Como é herdado do CreateAlunoDto via PartialType, não precisa declarar aqui.
   */
}
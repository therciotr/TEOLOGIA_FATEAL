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
    description: 'Endereço completo do aluno (atualizado)',
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
    description: 'Número do RG do aluno (atualizado)',
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
    description: 'Status de matrícula (true = paga, false = pendente)',
    required: false,
  })
  matriculaPaga?: boolean;

  /**
   * 🔥 Importante!
   * Campo `fotoUrl` herdado do CreateAlunoDto via PartialType.
   * Necessário para o backend salvar a URL da foto após upload.
   */
}
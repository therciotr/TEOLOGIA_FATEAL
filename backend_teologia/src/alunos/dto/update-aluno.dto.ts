// src/alunos/dto/update-aluno.dto.ts
import { PartialType, ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsBoolean,
  Matches,
  ValidateNested,
  ArrayMaxSize,
  IsUrl,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateAlunoDto, DocumentoDto } from './create-aluno.dto';

/**
 * DTO para atualização de aluno.
 * 🔄 Baseado em CreateAlunoDto, com todos os campos opcionais via PartialType.
 */
export class UpdateAlunoDto extends PartialType(CreateAlunoDto) {
  /**
   * Endereço atualizado do aluno (opcional).
   */
  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'Rua das Palmeiras, 321',
    description: 'Endereço atualizado do aluno',
    required: false,
  })
  endereco?: string;

  /**
   * RG atualizado do aluno (opcional).
   */
  @IsOptional()
  @Matches(/^\d{7,14}$/, {
    message: 'RG deve conter apenas números (7-14 dígitos)',
  })
  @ApiProperty({
    example: '98765432',
    description: 'Número do RG atualizado do aluno',
    required: false,
  })
  rg?: string;

  /**
   * CPF atualizado (opcional).
   */
  @IsOptional()
  @Matches(/^\d{11}$/, {
    message: 'CPF deve conter exatamente 11 dígitos',
  })
  @ApiProperty({
    example: '98765432100',
    description: 'Número do CPF (11 dígitos)',
    required: false,
  })
  cpf?: string;

  /**
   * Status da matrícula (opcional).
   */
  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    example: false,
    description: 'Matrícula paga (true) ou pendente (false)',
    required: false,
  })
  matriculaPaga?: boolean;

  /**
   * Arquivo de foto atualizado (opcional).
   */
  @IsOptional()
  @ApiProperty({
    description: 'Novo arquivo da foto 3x4 (multipart/form-data)',
    type: 'string',
    format: 'binary',
    required: false,
  })
  foto3x4?: any;

  /**
   * Lista de documentos atualizados (opcional).
   */
  @IsOptional()
  @ArrayMaxSize(10)
  @ValidateNested({ each: true })
  @Type(() => DocumentoDto)
  @ApiProperty({
    description: 'Lista de documentos atualizados',
    type: [DocumentoDto],
    required: false,
  })
  documentos?: DocumentoDto[];

  /**
   * URL final da nova foto (opcional).
   */
  @IsOptional()
  @IsUrl(undefined, { message: 'URL inválida' })
  @ApiProperty({
    example: '/uploads/fotos/joao_nova.jpg',
    description: 'URL final da nova foto (gerado pelo backend)',
    required: false,
  })
  fotoUrl?: string;
}
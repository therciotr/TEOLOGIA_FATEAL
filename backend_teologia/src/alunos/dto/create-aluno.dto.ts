// src/alunos/dto/create-aluno.dto.ts
import {
  IsEmail,
  IsOptional,
  IsString,
  IsBoolean,
  IsDateString,
  Matches,
  ValidateNested,
  ArrayMaxSize,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

/** DTO auxiliar para cada documento */
class DocumentoDto {
  @ApiProperty({ example: 'Histórico Escolar.pdf' })
  @IsString()
  nome: string;

  @ApiProperty({
    description: 'URL pública ou caminho interno do arquivo',
    example: '/uploads/docs/historico.pdf',
  })
  @IsString()
  url: string;
}

/**
 * DTO para criação de aluno.
 */
export class CreateAlunoDto {
  /* ─────────── Dados pessoais ─────────── */
  @IsString()
  @ApiProperty({ example: 'João da Silva', description: 'Nome completo' })
  nome!: string;

  @IsEmail()
  @ApiProperty({ example: 'joao@email.com', description: 'E-mail único' })
  email!: string;

  @IsOptional()
  @Matches(/^\+?\d{10,15}$/, {
    message: 'Telefone deve estar no formato +5582999999999',
  })
  @ApiProperty({
    example: '+5582988887777',
    required: false,
    description: 'Telefone (formato internacional)',
  })
  telefone?: string;

  @IsOptional()
  @IsDateString()
  @ApiProperty({
    example: '1990-05-10',
    required: false,
    description: 'Data de nascimento (YYYY-MM-DD)',
  })
  dataNascimento?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'Rua das Flores, 123',
    required: false,
    description: 'Endereço completo',
  })
  endereco?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: '12345678',
    required: false,
    description: 'Número do RG',
  })
  rg?: string;

  /* ─────────── Relacionamentos ─────────── */
  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'id-da-turma',
    required: false,
    description: 'ID da turma à qual o aluno pertence',
  })
  turmaId?: string;

  /* ─────────── Uploads / Documentos ─────────── */
  @IsOptional()
  @ApiProperty({
    description: 'Foto 3x4 (campo de upload no multipart/form-data)',
    type: 'string',
    format: 'binary',
    required: false,
  })
  foto3x4?: any;

  @IsOptional()
  @ArrayMaxSize(10)
  @ValidateNested({ each: true })
  @Type(() => DocumentoDto)
  @ApiProperty({
    description: 'Lista de documentos anexos',
    type: [DocumentoDto],
    required: false,
  })
  documentos?: DocumentoDto[];

  /* ─────────── Flags ─────────── */
  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    example: true,
    required: false,
    description: 'Define se a matrícula já está quitada',
  })
  matriculaPaga?: boolean;

  /* ─────────── Gerado pelo backend ─────────── */
  @IsOptional()
  @IsString()
  @ApiProperty({
    example: '/uploads/fotos/foto_joao.jpg',
    required: false,
    description: 'URL final da foto gerada pelo backend',
  })
  fotoUrl?: string;
}
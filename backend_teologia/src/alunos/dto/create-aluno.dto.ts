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
  IsUrl,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

/* ───────────── DTO auxiliar de Documento ───────────── */
export class DocumentoDto {
  @ApiProperty({ example: 'Historico_Escolar.pdf', description: 'Nome do arquivo' })
  @IsString()
  nome: string;

  @ApiProperty({
    description: 'URL pública ou caminho interno onde o arquivo foi salvo',
    example: '/uploads/docs/historico.pdf',
  })
  @IsUrl(undefined, { message: 'URL inválida para documento' })
  url: string;
}

/* ───────────── DTO principal de criação de Aluno ───────────── */
export class CreateAlunoDto {
  /* ─────────── Dados pessoais ─────────── */
  @IsString()
  @ApiProperty({ example: 'João da Silva', description: 'Nome completo do aluno' })
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
    description: 'Telefone em formato internacional',
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
  @Matches(/^\d{7,14}$/, {
    message: 'RG deve conter apenas números (7-14 dígitos)',
  })
  @ApiProperty({
    example: '12345678',
    required: false,
    description: 'Número do RG',
  })
  rg?: string;

  @IsOptional()
  @Matches(/^\d{11}$/, {
    message: 'CPF deve conter exatamente 11 dígitos',
  })
  @ApiProperty({
    example: '12345678901',
    required: false,
    description: 'Número do CPF (11 dígitos)',
  })
  cpf?: string;

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
    description: 'Arquivo da foto 3x4 (campo multipart/form-data)',
    type: 'string',
    format: 'binary',
    required: false,
  })
  foto3x4?: any; // Arquivo recebido via interceptor Multer

  @IsOptional()
  @ArrayMaxSize(10, { message: 'Máximo de 10 documentos permitidos' })
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
    example: false,
    required: false,
    description: 'Define se a matrícula já está quitada',
    default: false,
  })
  matriculaPaga?: boolean = false;

  /* ─────────── Gerado pelo backend ─────────── */
  @IsOptional()
  @IsUrl(undefined, { message: 'URL inválida para foto' })
  @ApiProperty({
    example: '/uploads/fotos/foto_joao.jpg',
    required: false,
    description: 'URL final da foto 3x4 após upload',
  })
  fotoUrl?: string;
}
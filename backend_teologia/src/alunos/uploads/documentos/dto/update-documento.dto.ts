// src/alunos/uploads/documentos/dto/update-documento.dto.ts
import { PartialType } from '@nestjs/swagger';
import { CreateDocumentoDto } from './create-documento.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateDocumentoDto extends PartialType(CreateDocumentoDto) {
  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'Contrato de matrícula', required: false })
  nome?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'https://example.com/documento.pdf', required: false })
  url?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'aluno-id-uuid', required: false })
  alunoId?: string;
}
import { PartialType, ApiProperty } from '@nestjs/swagger';
import { CreateDocumentoDto } from './create-documento.dto';
import { IsOptional, IsString } from 'class-validator';

/**
 * DTO para atualização de documento.
 * Herda todos os campos do CreateDocumentoDto como opcionais.
 */
export class UpdateDocumentoDto extends PartialType(CreateDocumentoDto) {
  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'Contrato de matrícula',
    description: 'Nome atualizado do documento (opcional)',
    required: false,
  })
  nome?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'uploads/documentos/contrato-matricula.pdf',
    description: 'URL atualizada do documento (opcional)',
    required: false,
  })
  url?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'uuid-do-aluno',
    description: 'ID do aluno vinculado (opcional)',
    required: false,
  })
  alunoId?: string;
}
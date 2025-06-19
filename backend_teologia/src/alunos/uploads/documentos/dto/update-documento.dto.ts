import { PartialType, ApiProperty } from '@nestjs/swagger';
import { CreateDocumentoDto } from './create-documento.dto';
import {
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

/**
 * DTO para atualização de documento.
 * Herda os campos opcionais de CreateDocumentoDto.
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
  @Matches(/^\/?uploads\/documentos\/.+$/, {
    message:
      'URL inválida. Deve começar com /uploads/documentos/ e conter o nome do arquivo.',
  })
  @ApiProperty({
    example: '/uploads/documentos/contrato-matricula.pdf',
    description: 'Caminho/URL atualizado do arquivo (opcional)',
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
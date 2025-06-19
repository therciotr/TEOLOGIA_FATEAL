import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  Matches,
  IsUrl,
} from 'class-validator';

export class CreateDocumentoDto {
  @ApiProperty({
    example: 'Certidão de Nascimento',
    description: 'Nome do documento enviado pelo aluno',
  })
  @IsNotEmpty()
  @IsString()
  nome!: string;

  @ApiProperty({
    example: '/uploads/documentos/doc1.pdf',
    description: 'Caminho público ou URL do arquivo salvo',
  })
  @IsNotEmpty()
  @IsString()
  @Matches(/^\/?uploads\/documentos\/.+$/, {
    message:
      'URL inválida. Deve começar com /uploads/documentos/ e conter o nome do arquivo.',
  })
  url!: string;

  @ApiProperty({
    example: 'aluno-uuid-123',
    description: 'ID do aluno vinculado ao documento',
  })
  @IsNotEmpty()
  @IsString()
  alunoId!: string;
}
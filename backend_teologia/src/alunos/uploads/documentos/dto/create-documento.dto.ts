import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDocumentoDto {
  @ApiProperty({ example: 'Certidão de Nascimento', description: 'Nome do documento' })
  @IsNotEmpty()
  @IsString()
  nome!: string;

  @ApiProperty({ example: 'uploads/documentos/doc1.pdf', description: 'Caminho do arquivo salvo no servidor' })
  @IsNotEmpty()
  @IsString()
  url!: string;

  @ApiProperty({ example: 'id-do-aluno', description: 'ID do aluno vinculado ao documento' })
  @IsNotEmpty()
  @IsString()
  alunoId!: string;
}
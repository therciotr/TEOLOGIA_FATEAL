import { ApiProperty } from '@nestjs/swagger';

export class CreateDocumentoDto {
  @ApiProperty()
  nome!: string;

  @ApiProperty()
  url!: string;

  @ApiProperty()
  alunoId!: string;
}
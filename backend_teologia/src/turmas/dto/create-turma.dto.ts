// src/turmas/dto/create-turma.dto.ts
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTurmaDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Turma A' })
  nome: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'plano-id' })
  planoId: string;
}
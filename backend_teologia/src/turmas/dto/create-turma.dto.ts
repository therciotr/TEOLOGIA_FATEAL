// src/turmas/dto/create-turma.dto.ts
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO para criação de uma nova turma.
 */
export class CreateTurmaDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Turma A',
    description: 'Nome identificador da turma',
  })
  nome: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'plano-id',
    description: 'ID do plano associado à turma',
  })
  planoId: string;
}
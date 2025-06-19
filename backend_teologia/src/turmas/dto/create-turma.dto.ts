// src/turmas/dto/create-turma.dto.ts
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO para criação de uma nova turma.
 */
export class CreateTurmaDto {
  @IsNotEmpty({ message: 'O nome da turma é obrigatório.' })
  @IsString({ message: 'O nome deve ser uma string.' })
  @ApiProperty({
    example: 'Turma A - Teologia Básica',
    description: 'Nome identificador da turma',
  })
  nome: string;

  @IsNotEmpty({ message: 'O ID do plano é obrigatório.' })
  @IsUUID('4', { message: 'O planoId deve ser um UUID válido.' })
  @ApiProperty({
    example: 'a8a167c3-2b5a-4e57-bb78-10b60ec8ef00',
    description: 'UUID do plano financeiro associado à turma',
    format: 'uuid',
  })
  planoId: string;
}
// src/planos/dto/create-plano.dto.ts
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePlanoDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Plano Ouro' })
  nome: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 150.0 })
  valor: number;
}
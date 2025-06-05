import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateResponsavelDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Maria Silva' })
  nome!: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ example: 'maria@email.com' })
  email!: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: '+55 82 99999-9999', required: false })
  telefone?: string;
}
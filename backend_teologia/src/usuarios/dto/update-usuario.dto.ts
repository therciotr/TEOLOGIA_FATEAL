// src/usuarios/dto/update-usuario.dto.ts
import { PartialType } from '@nestjs/swagger';
import { CreateUsuarioDto } from './create-usuario.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsBoolean } from 'class-validator';

export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {
  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'admin', required: false })
  perfil?: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({ example: true, required: false })
  ativo?: boolean;
}
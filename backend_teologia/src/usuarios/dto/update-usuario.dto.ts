// src/usuarios/dto/update-usuario.dto.ts
import { PartialType } from '@nestjs/swagger';
import { CreateUsuarioDto } from './create-usuario.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsBoolean } from 'class-validator';

/**
 * DTO para atualização parcial de um usuário.
 * Herda campos de CreateUsuarioDto, tornando-os opcionais.
 */
export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {
  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'admin',
    required: false,
    description: 'Perfil do usuário (ex: admin, coordenador)',
  })
  perfil?: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    example: true,
    required: false,
    description: 'Indica se o usuário está ativo ou não',
  })
  ativo?: boolean;
}
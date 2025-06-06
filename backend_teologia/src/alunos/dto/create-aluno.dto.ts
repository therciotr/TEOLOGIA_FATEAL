import { IsEmail, IsOptional, IsString, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO para criação de um novo aluno.
 * Alinha os dados enviados pelo frontend à estrutura do banco de dados.
 */
export class CreateAlunoDto {
  @ApiProperty({
    example: 'João da Silva',
    description: 'Nome completo do aluno',
  })
  @IsString()
  nome!: string;

  @ApiProperty({
    example: 'joao@email.com',
    description: 'E-mail único do aluno',
  })
  @IsEmail()
  email!: string;

  @ApiProperty({
    example: '81988887777',
    description: 'Telefone de contato do aluno',
    required: false,
  })
  @IsOptional()
  @IsString()
  telefone?: string;

  @ApiProperty({
    example: '1990-05-10',
    description: 'Data de nascimento do aluno (YYYY-MM-DD)',
    required: false,
  })
  @IsOptional()
  @IsString()
  dataNascimento?: string;

  @ApiProperty({
    example: 'Rua das Flores, 123',
    description: 'Endereço completo do aluno',
    required: false,
  })
  @IsOptional()
  @IsString()
  endereco?: string;

  @ApiProperty({
    example: '12345678',
    description: 'Número do RG do aluno',
    required: false,
  })
  @IsOptional()
  @IsString()
  rg?: string;

  @ApiProperty({
    description: 'Arquivo da foto 3x4 do aluno (upload)',
    type: 'string',
    format: 'binary',
    required: false,
  })
  @IsOptional()
  foto3x4?: any;

  @ApiProperty({
    description: 'Arquivos dos documentos do aluno (upload múltiplo)',
    type: 'array',
    items: { type: 'string', format: 'binary' },
    required: false,
  })
  @IsOptional()
  documentos?: any[];

  @ApiProperty({
    example: true,
    description: 'Indica se o aluno já pagou a matrícula (opcional)',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  matriculaPaga?: boolean;

  @ApiProperty({
    example: 'id-da-turma',
    description: 'ID da turma à qual o aluno pertence (opcional)',
    required: false,
  })
  @IsOptional()
  @IsString()
  turmaId?: string;

  // 🔥 Adicionado para resolver erro no build
  @ApiProperty({
    example: 'uploads/fotos/foto_joao.jpg',
    description: 'URL da foto 3x4 salva no servidor (gerada automaticamente)',
    required: false,
  })
  @IsOptional()
  @IsString()
  fotoUrl?: string;
}
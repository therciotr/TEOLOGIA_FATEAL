// src/auth/auth.controller.ts

import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO de login
 */
class LoginDto {
  @IsEmail()
  @ApiProperty({ example: 'usuario@email.com' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'senhaSegura123' })
  senha: string;
}

@ApiTags('Autenticação')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Endpoint de login.
   * Recebe email e senha, valida e retorna token JWT.
   */
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login de usuário' })
  async login(@Body() body: LoginDto) {
    return this.authService.login(body.email, body.senha);
  }
}
// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

/**
 * Serviço de autenticação.
 * Responsável por validar credenciais e emitir JWT.
 */
@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Realiza login do usuário e gera um token JWT.
   * @param email E-mail do usuário
   * @param senha Senha fornecida
   */
  async login(email: string, senha: string) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { email },
    });

    if (!usuario) {
      throw new UnauthorizedException('E-mail ou senha inválidos!');
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      throw new UnauthorizedException('E-mail ou senha inválidos!');
    }

    const payload = {
      sub: usuario.id,
      email: usuario.email,
      nome: usuario.nome,
      perfil: usuario.perfil,
    };

    return {
      access_token: this.jwtService.sign(payload),
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        perfil: usuario.perfil,
      },
    };
  }
}
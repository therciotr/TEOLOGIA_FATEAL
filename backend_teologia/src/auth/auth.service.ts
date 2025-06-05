// src/auth/auth.service.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

/**
 * Serviço de autenticação.
 * Responsável por validar credenciais e gerar o token JWT.
 */
@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Valida as credenciais e gera um token JWT se forem corretas.
   * @param email - E-mail do usuário
   * @param senha - Senha em texto puro (não criptografada)
   */
  async login(email: string, senha: string) {
    // Busca o usuário pelo e-mail
    const usuario = await this.prisma.usuario.findUnique({
      where: { email },
    });

    // Valida se existe
    if (!usuario) {
      throw new UnauthorizedException('E-mail ou senha inválidos!');
    }

    // Verifica a senha usando bcrypt
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) {
      throw new UnauthorizedException('E-mail ou senha inválidos!');
    }

    // Gera o payload do token JWT
    const payload = {
      sub: usuario.id,
      nome: usuario.nome,
      perfil: usuario.perfil,
    };

    // Gera o token
    const token = this.jwtService.sign(payload);

    return {
      access_token: token,
      perfil: usuario.perfil,
      nome: usuario.nome,
    };
  }
}
// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

/**
 * Serviço de autenticação.
 */
@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Autentica e gera um JWT.
   */
  async login(email: string, senha: string) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { email },
    });

    if (!usuario) {
      throw new UnauthorizedException('E-mail ou senha inválidos!');
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) {
      throw new UnauthorizedException('E-mail ou senha inválidos!');
    }

    const payload = {
      sub: usuario.id,
      nome: usuario.nome,
      perfil: usuario.perfil,
    };

    const token = this.jwtService.sign(payload);

    return {
      access_token: token,
      perfil: usuario.perfil,
      nome: usuario.nome,
    };
  }
}
// src/usuarios/usuarios.service.ts
import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosService {
  private readonly logger = new Logger(UsuariosService.name);
  private readonly saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS ?? '10', 10);

  constructor(private readonly prisma: PrismaService) {}

  /* ───────────── CREATE ───────────── */
  /** Cria um novo usuário com senha criptografada. */
  async create(dto: CreateUsuarioDto): Promise<Usuario> {
    /* Verifica duplicidade de e-mail */
    const emailExists = await this.prisma.usuario.findUnique({
      where: { email: dto.email },
    });
    if (emailExists) {
      throw new BadRequestException('E-mail já cadastrado.');
    }

    const hashedPassword = await bcrypt.hash(dto.senha, this.saltRounds);

    return this.prisma.usuario.create({
      data: {
        ...dto,
        senha: hashedPassword,
      },
    });
  }

  /* ───────────── READ ───────────── */
  async findAll(): Promise<Usuario[]> {
    return this.prisma.usuario.findMany({ orderBy: { nome: 'asc' } });
  }

  async findOne(id: string): Promise<Usuario> {
    const usuario = await this.prisma.usuario.findUnique({ where: { id } });
    if (!usuario) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado.`);
    }
    return usuario;
  }

  /* ───────────── UPDATE ───────────── */
  async update(id: string, dto: UpdateUsuarioDto): Promise<Usuario> {
    await this.findOne(id); // 404 se não existir

    /* Se e-mail for alterado, verifica duplicidade */
    if (dto.email) {
      const emailExists = await this.prisma.usuario.findFirst({
        where: { email: dto.email, id: { not: id } },
      });
      if (emailExists) {
        throw new BadRequestException('E-mail já está em uso por outro usuário.');
      }
    }

    const dataToUpdate: Partial<UpdateUsuarioDto> = { ...dto };

    if (dto.senha) {
      dataToUpdate.senha = await bcrypt.hash(dto.senha, this.saltRounds);
    }

    return this.prisma.usuario.update({
      where: { id },
      data: dataToUpdate,
    });
  }

  /* ───────────── DELETE ───────────── */
  async remove(id: string): Promise<{ message: string }> {
    await this.findOne(id); // 404 se não existir
    await this.prisma.usuario.delete({ where: { id } });
    return { message: `Usuário com ID ${id} removido com sucesso.` };
  }
}
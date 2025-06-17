// src/usuarios/usuarios.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import * as bcrypt from 'bcrypt';

/**
 * 📦 UsuariosService
 * Serviço responsável pela lógica de negócios dos usuários.
 */
@Injectable()
export class UsuariosService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Cria um novo usuário com a senha criptografada.
   * @param createUsuarioDto Dados para criação do usuário.
   */
  async create(createUsuarioDto: CreateUsuarioDto) {
    const hashedPassword = await bcrypt.hash(createUsuarioDto.senha, 10);

    return this.prisma.usuario.create({
      data: {
        ...createUsuarioDto,
        senha: hashedPassword,
      },
    });
  }

  /**
   * Lista todos os usuários.
   */
  async findAll() {
    return this.prisma.usuario.findMany();
  }

  /**
   * Busca um usuário por ID.
   * @param id ID do usuário.
   */
  async findOne(id: string) {
    const usuario = await this.prisma.usuario.findUnique({ where: { id } });

    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return usuario;
  }

  /**
   * Atualiza os dados de um usuário.
   * Se a senha for alterada, criptografa antes.
   * @param id ID do usuário.
   * @param updateUsuarioDto Dados de atualização.
   */
  async update(id: string, updateUsuarioDto: UpdateUsuarioDto) {
    await this.findOne(id); // Verifica existência

    const dataToUpdate = { ...updateUsuarioDto };

    if (updateUsuarioDto.senha) {
      dataToUpdate.senha = await bcrypt.hash(updateUsuarioDto.senha, 10);
    }

    return this.prisma.usuario.update({
      where: { id },
      data: dataToUpdate,
    });
  }

  /**
   * Remove um usuário do sistema.
   * @param id ID do usuário.
   */
  async remove(id: string) {
    await this.findOne(id); // Verifica existência
    return this.prisma.usuario.delete({ where: { id } });
  }
}
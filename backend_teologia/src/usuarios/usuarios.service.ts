import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import * as bcrypt from 'bcrypt'; // 👉 Importa o bcrypt

@Injectable()
export class UsuariosService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    // 👉 Gera o hash da senha antes de salvar
    const hashedPassword = await bcrypt.hash(createUsuarioDto.senha, 10);

    // 👉 Cria o usuário com a senha criptografada
    return this.prisma.usuario.create({
      data: {
        ...createUsuarioDto,
        senha: hashedPassword,
      },
    });
  }

  async findAll() {
    return this.prisma.usuario.findMany();
  }

  async findOne(id: string) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { id },
    });
    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return usuario;
  }

  async update(id: string, updateUsuarioDto: UpdateUsuarioDto) {
    await this.findOne(id); // Valida se existe

    // 👉 Se a senha for atualizada, criptografa também
    let dataToUpdate = { ...updateUsuarioDto };
    if (updateUsuarioDto.senha) {
      dataToUpdate.senha = await bcrypt.hash(updateUsuarioDto.senha, 10);
    }

    return this.prisma.usuario.update({
      where: { id },
      data: dataToUpdate,
    });
  }

  async remove(id: string) {
    await this.findOne(id); // Valida se existe
    return this.prisma.usuario.delete({
      where: { id },
    });
  }
}
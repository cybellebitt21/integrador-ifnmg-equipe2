import { prisma } from '../lib/prisma.js';
import { Prisma } from '@prisma/client';

export class UsuarioModel {
  static async criar(data: Prisma.UsuarioCreateInput) {
    return await prisma.usuario.create({
      data,
    });
  }

  static async buscarPorId(id: number) {
    return await prisma.usuario.findUnique({
      where: { id },
    });
  }

  static async buscarPorEmail(email: string) {
    return await prisma.usuario.findUnique({
      where: { email },
    });
  }

  static async buscarTodos() {
    return await prisma.usuario.findMany({
      select: {
        id: true,
        nome: true,
        email: true,
        telefone: true,
        criado_em: true,
      },
    });
  }

  static async atualizar(id: number, data: Prisma.UsuarioUpdateInput) {
    return await prisma.usuario.update({
      where: { id },
      data,
    });
  }

  static async deletar(id: number) {
    return await prisma.usuario.delete({
      where: { id },
    });
  }
}

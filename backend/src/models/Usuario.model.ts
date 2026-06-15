import { prisma } from '../lib/prisma.js';
import { Prisma } from '@prisma/client';

export const UsuarioModel = {
  async criar(data: Prisma.UsuarioCreateInput) {
    return await prisma.usuario.create({
      data,
    });
  },

  async buscarPorId(id: number) {
    return await prisma.usuario.findUnique({
      where: { id },
    });
  },

  async buscarPorEmail(email: string) {
    return await prisma.usuario.findUnique({
      where: { email },
    });
  },

  async buscarTodos() {
    return await prisma.usuario.findMany({
      select: {
        id: true,
        nome: true,
        email: true,
        telefone: true,
        criado_em: true,
      },
    });
  },

  async atualizar(id: number, data: Prisma.UsuarioUpdateInput) {
    return await prisma.usuario.update({
      where: { id },
      data,
    });
  },

  async deletar(id: number) {
    return await prisma.usuario.delete({
      where: { id },
    });
  },
};

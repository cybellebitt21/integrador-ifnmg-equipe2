import { prisma } from '../lib/prisma.js';
import { Prisma } from '@prisma/client';

export const UsuarioModel = {
  async criar(data: Prisma.UsuarioCreateInput) {
    return await prisma.usuario.create({
      data,
    });
  },

  async buscarPorId(id: string) {
    return await prisma.usuario.findUnique({
      where: { id },
      select: {
        id: true,
        nome: true,
        email: true,
        telefone: true,
        criado_em: true,
      },
    });
  },

  async buscarPorEmail(email: string) {
    return await prisma.usuario.findUnique({
      where: { email },
      select: {
        id: true,
        nome: true,
        email: true,
        telefone: true,
        criado_em: true,
      },
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

  async atualizar(id: string, data: Prisma.UsuarioUpdateInput) {
    return await prisma.usuario.update({
      where: { id },
      data,
      select: {
        id: true,
        nome: true,
        email: true,
        telefone: true,
        criado_em: true,
      },
    });
  },

  async deletar(id: string) {
    return await prisma.usuario.delete({
      where: { id },
    });
  },
};

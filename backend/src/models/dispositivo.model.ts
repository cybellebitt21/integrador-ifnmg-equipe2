import { prisma } from '../lib/prisma.js';
import { Prisma } from '@prisma/client';

export const DispositivoModel = {
  async criar(data: Prisma.DispositivoCreateInput) {
    return await prisma.dispositivo.create({
      data,
    });
  },

  async buscarPorId(id: number) {
    return await prisma.dispositivo.findUnique({
      where: { id },
      include: {
        plantacao: {
          select: {
            id: true,
            nome: true,
          },
        },
      },
    });
  },

  async buscarTodos() {
    return await prisma.dispositivo.findMany({
      include: {
        plantacao: {
          select: {
            id: true,
            nome: true,
          },
        },
      },
    });
  },

  async atualizar(id: number, data: Prisma.DispositivoUpdateInput) {
    return await prisma.dispositivo.update({
      where: { id },
      data,
    });
  },

  async deletar(id: number) {
    return await prisma.dispositivo.delete({
      where: { id },
    });
  },
};

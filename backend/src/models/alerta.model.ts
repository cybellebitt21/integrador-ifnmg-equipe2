import { prisma } from '../lib/prisma.js';
import { Prisma } from '@prisma/client';

export const AlertaModel = {
  async criar(data: Prisma.AlertaCreateInput) {
    return await prisma.alerta.create({
      data,
    });
  },

  async buscarPorId(id: number) {
    return await prisma.alerta.findUnique({
      where: { id },
    });
  },

  async buscarPorPlantacao(plantacao_id: number) {
    return await prisma.alerta.findMany({
      where: { plantacao_id },
      orderBy: { gerado_em: 'desc' },
    });
  },

  async buscarPorUsuario(usuario_id: number) {
    return await prisma.alerta.findMany({
      where: { usuario_id },
      orderBy: { gerado_em: 'desc' },
    });
  },

  async buscarTodos() {
    return await prisma.alerta.findMany({
      orderBy: { gerado_em: 'desc' },
    });
  },

  async deletar(id: number) {
    return await prisma.alerta.delete({
      where: { id },
    });
  },
};

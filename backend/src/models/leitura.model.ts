import { prisma } from '../lib/prisma.js';
import { Prisma } from '@prisma/client';

export const LeituraModel = {
  async criar(data: Prisma.LeituraUncheckedCreateInput) {
    return await prisma.leitura.create({
      data,
    });
  },

  async buscarTodos() {
    return await prisma.leitura.findMany({
      orderBy: { data_hora: 'desc' },
      include: { plantacao: { select: { id: true, nome: true } } },
    });
  },

  async buscarPorId(id: string) {
    return await prisma.leitura.findUnique({
      where: { id },
      include: { plantacao: { select: { id: true, nome: true } } },
    });
  },

  async buscarUltima(plantacao_id: string) {
    return await prisma.leitura.findFirst({
      where: { plantacao_id },
      orderBy: { data_hora: 'desc' },
    });
  },

  async atualizar(id: string, data: Prisma.LeituraUpdateInput) {
    return await prisma.leitura.update({
      where: { id },
      data,
    });
  },

  async deletar(id: string) {
    return await prisma.leitura.delete({ where: { id } });
  },
};

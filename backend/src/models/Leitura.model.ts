import { prisma } from '../lib/prisma.js';
import { Prisma } from '@prisma/client';

export class LeituraModel {
  static async salvarLeitura(data: Prisma.LeituraUncheckedCreateInput) {
    return await prisma.leitura.create({
      data,
    });
  }

  static async buscarUltimaLeitura(plantacao_id: number) {
    return await prisma.leitura.findFirst({
      where: { plantacao_id },
      orderBy: { data_hora: 'desc' },
    });
  }
}

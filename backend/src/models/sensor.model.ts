import { prisma } from '../lib/prisma.js';
import { Prisma, tipoSensor } from '@prisma/client';

export const SensorModel = {
  async criar(data: Prisma.SensorCreateInput) {
    return await prisma.sensor.create({
      data,
    });
  },

  async buscarPorId(id: string) {
    return await prisma.sensor.findUnique({
      where: { id },
      include: {
        plantacoes: {
          select: {
            plantacao_id: true,
            sensor_id: true,
            limite_atencao: true,
            limite_critico: true,
          },
        },
      },
    });
  },

  async buscarTodos() {
    return await prisma.sensor.findMany({
      include: {
        plantacoes: {
          select: {
            plantacao_id: true,
            sensor_id: true,
          },
        },
      },
    });
  },

  async buscarPorTipo(tipo: tipoSensor) {
    return await prisma.sensor.findMany({
      where: { tipo },
    });
  },

  async atualizar(id: string, data: Prisma.SensorUpdateInput) {
    return await prisma.sensor.update({
      where: { id },
      data,
    });
  },

  async deletar(id: string) {
    return await prisma.sensor.delete({
      where: { id },
    });
  },
};

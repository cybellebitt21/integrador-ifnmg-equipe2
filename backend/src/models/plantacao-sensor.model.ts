import { prisma } from '../lib/prisma.js';
import { Prisma } from '@prisma/client';

export const PlantacaoSensorModel = {
  async criar(data: Prisma.PlantacaoSensorCreateInput) {
    return await prisma.plantacaoSensor.create({
      data,
      include: {
        sensor: true,
      },
    });
  },

  async buscarPorId(id: string) {
    return await prisma.plantacaoSensor.findUnique({
      where: { id },
      include: {
        plantacao: true,
        sensor: true,
      },
    });
  },

  async buscarPorPlantacao(plantacao_id: string) {
    return await prisma.plantacaoSensor.findMany({
      where: { plantacao_id },
      include: {
        sensor: true,
      },
    });
  },

  async buscarPorSensor(sensor_id: string) {
    return await prisma.plantacaoSensor.findUnique({
      where: { sensor_id },
      include: {
        plantacao: true,
        sensor: true,
      },
    });
  },

  async atualizar(id: string, data: Prisma.PlantacaoSensorUpdateInput) {
    return await prisma.plantacaoSensor.update({
      where: { id },
      data,
      include: {
        sensor: true,
      },
    });
  },

  async deletar(id: string) {
    return await prisma.plantacaoSensor.delete({
      where: { id },
    });
  },

  async deletarPorPlantacao(plantacao_id: string) {
    return await prisma.plantacaoSensor.deleteMany({
      where: { plantacao_id },
    });
  },
};

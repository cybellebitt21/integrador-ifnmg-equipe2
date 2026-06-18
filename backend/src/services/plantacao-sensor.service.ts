import { statusSensor } from '@prisma/client';
import { PlantacaoSensorModel } from '../models/plantacao-sensor.model.js';
import { SensorModel } from '../models/sensor.model.js';
import { findOrThrow } from '../utils/find-or-throw.js';

interface CriarPlantacaoSensorDados {
  plantacao_id: number;
  sensor_id: number;
  limite_atencao: number;
  limite_critico: number;
}

interface AtualizarPlantacaoSensorDados {
  limite_atencao?: number;
  limite_critico?: number;
}

export const PlantacaoSensorService = {
  async criar(dados: CriarPlantacaoSensorDados) {
    const sensor = await SensorModel.buscarPorId(dados.sensor_id);
    if (!sensor) {
      throw new Error(`Sensor com ID ${dados.sensor_id} não encontrado.`);
    }

    const plantacaoSensorDados = {
      plantacao: { connect: { id: dados.plantacao_id } },
      sensor: { connect: { id: dados.sensor_id } },
      limite_atencao: dados.limite_atencao,
      limite_critico: dados.limite_critico,
    };

    const resultado = await PlantacaoSensorModel.criar(plantacaoSensorDados);

    await SensorModel.atualizar(dados.sensor_id, { status: statusSensor.Ativo });

    return resultado;
  },

  async buscarPorId(id: number) {
    return await findOrThrow(PlantacaoSensorModel, id, 'associação plantação-sensor', true);
  },

  async buscarPorPlantacao(plantacao_id: number) {
    return await PlantacaoSensorModel.buscarPorPlantacao(plantacao_id);
  },

  async buscarPorSensor(sensor_id: number) {
    const plantacaoSensor = await PlantacaoSensorModel.buscarPorSensor(sensor_id);
    if (!plantacaoSensor) {
      throw new Error(`Sensor ${sensor_id} não está vinculado a nenhuma plantação.`);
    }
    return plantacaoSensor;
  },

  async atualizar(id: number, dados: AtualizarPlantacaoSensorDados) {
    await PlantacaoSensorService.buscarPorId(id);
    return await PlantacaoSensorModel.atualizar(id, dados);
  },

  async deletar(id: number) {
    const vinculo = await PlantacaoSensorService.buscarPorId(id);
    await PlantacaoSensorModel.deletar(id);
    await SensorModel.atualizar(vinculo.sensor_id, { status: statusSensor.Inativo });
    return { mensagem: 'Associação plantação-sensor removida com sucesso.' };
  },

  async deletarPorPlantacao(plantacao_id: number) {
    const sensores = await PlantacaoSensorModel.buscarPorPlantacao(plantacao_id);
    if (sensores.length === 0) {
      throw new Error(`Nenhum sensor vinculado à plantação ${plantacao_id}.`);
    }

    for (const vinculo of sensores) {
      await SensorModel.atualizar(vinculo.sensor_id, { status: statusSensor.Inativo });
    }

    await PlantacaoSensorModel.deletarPorPlantacao(plantacao_id);
    return { mensagem: `${sensores.length} sensor(es) desvinculado(s) da plantação.` };
  },
};

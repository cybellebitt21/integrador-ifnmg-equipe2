import { tipoSensor, statusSensor } from '@prisma/client';
import { SensorModel } from '../models/Sensor.model.js';

interface CriarSensorDados {
  nome: string;
  tipo: tipoSensor;
  unidade: string;
  status?: statusSensor;
}

interface AtualizarSensorDados {
  nome?: string;
  tipo?: tipoSensor;
  unidade?: string;
  status?: statusSensor;
}

export const SensorService = {
  async criar(dados: CriarSensorDados) {
    return await SensorModel.criar(dados);
  },

  async buscarPorId(id: number) {
    const sensor = await SensorModel.buscarPorId(id);
    if (!sensor) {
      throw new Error(`Nenhum sensor encontrado com o identificador ${id}.`);
    }
    return sensor;
  },

  async buscarTodos() {
    return await SensorModel.buscarTodos();
  },

  async buscarPorTipo(tipo: tipoSensor) {
    const sensores = await SensorModel.buscarPorTipo(tipo);
    if (sensores.length === 0) {
      throw new Error(`Nenhum sensor encontrado do tipo ${tipo}.`);
    }
    return sensores;
  },

  async atualizar(id: number, dados: AtualizarSensorDados) {
    await SensorService.buscarPorId(id);
    return await SensorModel.atualizar(id, dados);
  },

  async deletar(id: number) {
    await SensorService.buscarPorId(id);
    await SensorModel.deletar(id);
    return { mensagem: 'Sensor removido com sucesso.' };
  },
};

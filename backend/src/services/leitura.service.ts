import { tipoSensor } from '@prisma/client';
import { AlertaService } from './alerta.service.js';
import { LeituraModel } from '../models/Leitura.model.js';
import { PlantacaoModel } from '../models/Plantacao.model.js';
import { PlantacaoSensorModel } from '../models/PlantacaoSensor.model.js';

interface CriarLeituraDados {
  plantacao_id?: number;
  umidade_solo?: number;
  umidade_ar?: number;
  temperatura?: number;
  luminosidade?: number;
}

const TIPO_PARA_CAMPO: Record<tipoSensor, keyof CriarLeituraDados> = {
  [tipoSensor.temperatura]: 'temperatura',
  [tipoSensor.umidade_ar]: 'umidade_ar',
  [tipoSensor.umidade_solo]: 'umidade_solo',
  [tipoSensor.luminosidade]: 'luminosidade',
};

export const LeituraService = {
  async criar(payload: CriarLeituraDados) {
    if (payload.plantacao_id) {
      const leitura = await LeituraService._criarParaPlantacao(payload.plantacao_id, payload);
      return [leitura];
    }

    const plantacoes = await PlantacaoModel.buscarTodos();
    const resultados = [];

    for (const plantacao of plantacoes) {
      const leitura = await LeituraService._criarParaPlantacao(plantacao.id, payload);
      resultados.push(leitura);
    }

    return resultados;
  },

  async _criarParaPlantacao(plantacao_id: number, payload: CriarLeituraDados) {
    const vinculos = await PlantacaoSensorModel.buscarPorPlantacao(plantacao_id);

    const dadosFiltrados: Record<string, number | undefined | null> = {
      plantacao_id,
      temperatura: undefined,
      umidade_ar: undefined,
      umidade_solo: undefined,
      luminosidade: undefined,
    };

    for (const vinculo of vinculos) {
      const campoFonte = TIPO_PARA_CAMPO[vinculo.sensor.tipo as tipoSensor];
      if (campoFonte && payload[campoFonte] !== undefined) {
        dadosFiltrados[campoFonte] = payload[campoFonte];
      }
    }

    const resultado = await LeituraModel.criar({
      plantacao_id,
      temperatura: dadosFiltrados.temperatura ?? null,
      umidade_ar: dadosFiltrados.umidade_ar ?? null,
      umidade_solo: dadosFiltrados.umidade_solo ?? null,
      luminosidade: dadosFiltrados.luminosidade ?? null,
    });

    await AlertaService.gerarAlertasParaLeitura(resultado.id, plantacao_id);

    return resultado;
  },

  async buscarTodos() {
    return await LeituraModel.buscarTodos();
  },

  async buscarPorId(id: number) {
    const leitura = await LeituraModel.buscarPorId(id);
    if (!leitura) {
      throw new Error(`Nenhuma leitura encontrada com o identificador ${id}.`);
    }
    return leitura;
  },

  async obterDadosDashboard(plantacao_id: number) {
    const dados = await LeituraModel.buscarUltima(plantacao_id);
    if (!dados) {
      throw new Error('Nenhuma leitura encontrada para esta plantação.');
    }
    return dados;
  },

  async atualizar(id: number, dados: Partial<CriarLeituraDados>) {
    await LeituraService.buscarPorId(id);
    return await LeituraModel.atualizar(id, {
      ...(dados.temperatura !== undefined && { temperatura: dados.temperatura }),
      ...(dados.umidade_ar !== undefined && { umidade_ar: dados.umidade_ar }),
      ...(dados.umidade_solo !== undefined && { umidade_solo: dados.umidade_solo }),
      ...(dados.luminosidade !== undefined && { luminosidade: dados.luminosidade }),
      ...(dados.plantacao_id !== undefined && { plantacao_id: dados.plantacao_id }),
    });
  },

  async deletar(id: number) {
    await LeituraService.buscarPorId(id);
    await LeituraModel.deletar(id);
    return { mensagem: 'Leitura removida com sucesso.' };
  },
};

import { Prisma, tipoSensor } from '@prisma/client';
import { AlertaService } from './alerta.service.js';
import { LeituraModel } from '../models/leitura.model.js';
import { PlantacaoModel } from '../models/plantacao.model.js';
import { PlantacaoSensorModel } from '../models/plantacao-sensor.model.js';
import { findOrThrow } from '../utils/find-or-throw.js';

type CamposLeitura = Pick<Prisma.LeituraCreateInput, 'temperatura' | 'umidade_ar' | 'umidade_solo' | 'luminosidade'>;

interface CriarLeituraDados extends CamposLeitura {
  plantacao_id?: string;
}

const TIPO_PARA_CAMPO: Record<tipoSensor, keyof CamposLeitura> = {
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

  async _criarParaPlantacao(plantacao_id: string, payload: CriarLeituraDados) {
    const vinculos = await PlantacaoSensorModel.buscarPorPlantacao(plantacao_id);

    const dadosFiltrados: Record<string, number | undefined | null> = {
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
      ...dadosFiltrados,
    });

    await AlertaService.gerarAlertasParaLeitura(resultado.id, plantacao_id);

    return resultado;
  },

  async buscarTodos() {
    return await LeituraModel.buscarTodos();
  },

  async buscarPorId(id: string) {
    return await findOrThrow(LeituraModel, id, 'leitura', true);
  },

  async obterDadosDashboard(plantacao_id: string) {
    const dados = await LeituraModel.buscarUltima(plantacao_id);
    if (!dados) {
      throw new Error('Nenhuma leitura encontrada para esta plantação.');
    }
    return dados;
  },

  async atualizar(id: string, dados: Prisma.LeituraUpdateInput) {
    await LeituraService.buscarPorId(id);
    return await LeituraModel.atualizar(id, dados);
  },

  async deletar(id: string) {
    await LeituraService.buscarPorId(id);
    await LeituraModel.deletar(id);
    return { mensagem: 'Leitura removida com sucesso.' };
  },
};

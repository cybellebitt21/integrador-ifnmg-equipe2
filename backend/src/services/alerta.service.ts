import { tipoAlerta, tipoSensor } from '@prisma/client';
import { AlertaModel } from '../models/alerta.model.js';
import { LeituraModel } from '../models/leitura.model.js';
import { PlantacaoModel } from '../models/plantacao.model.js';
import { PlantacaoSensorModel } from '../models/plantacao-sensor.model.js';
import { findOrThrow } from '../utils/find-or-throw.js';

interface CriarAlertaDados {
  leitura_id: string;
  usuario_id: string;
  plantacao_id: string;
  tipo: tipoAlerta;
  mensagem: string;
  notificacao?: boolean;
}

const TIPO_PARA_CAMPO_LEITURA: Record<tipoSensor, keyof { temperatura?: number | null; umidade_ar?: number | null; umidade_solo?: number | null; luminosidade?: number | null }> = {
  [tipoSensor.temperatura]: 'temperatura',
  [tipoSensor.umidade_ar]: 'umidade_ar',
  [tipoSensor.umidade_solo]: 'umidade_solo',
  [tipoSensor.luminosidade]: 'luminosidade',
};

export const AlertaService = {
  async criar(dados: CriarAlertaDados) {
    const alertaDados = {
      tipo: dados.tipo,
      mensagem: dados.mensagem,
      notificacao: dados.notificacao ?? false,
      leitura: {
        connect: { id: dados.leitura_id },
      },
      usuario: {
        connect: { id: dados.usuario_id },
      },
      plantacao: {
        connect: { id: dados.plantacao_id },
      },
    };
    return await AlertaModel.criar(alertaDados);
  },

  async buscarPorId(id: string) {
    return await findOrThrow(AlertaModel, id, 'alerta');
  },

  async buscarPorPlantacao(plantacao_id: string) {
    return await AlertaModel.buscarPorPlantacao(plantacao_id);
  },

  async buscarPorUsuario(usuario_id: string) {
    return await AlertaModel.buscarPorUsuario(usuario_id);
  },

  async buscarTodos() {
    return await AlertaModel.buscarTodos();
  },

  async deletar(id: string) {
    await AlertaService.buscarPorId(id);
    await AlertaModel.deletar(id);
    return { mensagem: 'Alerta removido com sucesso.' };
  },

  async gerarAlertasParaLeitura(leitura_id: string, plantacao_id: string) {
    const [leitura, plantacao, vinculos] = await Promise.all([
      LeituraModel.buscarPorId(leitura_id),
      PlantacaoModel.buscarPorId(plantacao_id),
      PlantacaoSensorModel.buscarPorPlantacao(plantacao_id),
    ]);

    if (!leitura || !plantacao) return [];

    const alertasCriados = [];

    for (const vinculo of vinculos) {
      const campoLeitura = TIPO_PARA_CAMPO_LEITURA[vinculo.sensor.tipo as tipoSensor];
      const valor = leitura[campoLeitura];

      if (valor === null || valor === undefined) continue;

      const tipoSensorAtual = vinculo.sensor.tipo as tipoSensor;
      const ehMenorQue = tipoSensorAtual === tipoSensor.umidade_solo || tipoSensorAtual === tipoSensor.umidade_ar;

      const excedeuCritico = ehMenorQue
        ? valor <= vinculo.limite_critico
        : valor >= vinculo.limite_critico;

      const excedeuAtencao = ehMenorQue
        ? valor <= vinculo.limite_atencao
        : valor >= vinculo.limite_atencao;

      if (excedeuCritico) {
        const alerta = await AlertaService.criar({
          leitura_id,
          usuario_id: plantacao.usuario_id,
          plantacao_id,
          tipo: tipoAlerta.Critico,
          mensagem: `Alerta Crítico: ${vinculo.sensor.nome} atingiu ${valor}. Limite crítico: ${vinculo.limite_critico}.`,
        });
        alertasCriados.push(alerta);
      } else if (excedeuAtencao) {
        const alerta = await AlertaService.criar({
          leitura_id,
          usuario_id: plantacao.usuario_id,
          plantacao_id,
          tipo: tipoAlerta.Atencao,
          mensagem: `Alerta de Atenção: ${vinculo.sensor.nome} atingiu ${valor}. Limite de atenção: ${vinculo.limite_atencao}.`,
        });
        alertasCriados.push(alerta);
      }
    }

    return alertasCriados;
  },
};

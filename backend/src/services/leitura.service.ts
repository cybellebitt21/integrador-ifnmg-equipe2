import { LeituraModel } from '../models/Leitura.model.js';

interface CriarLeituraPayload {
  umidadeSolo: number;
  umidadeAr: number;
  temperatura: number;
  luminosidade: number;
}

export class LeituraService {
  static async salvarDadosSensores(payload: CriarLeituraPayload) {

    const idPlantacaoPrototipo = 1;

    const novaLeitura = await LeituraModel.salvarLeitura({
      plantacao_id: idPlantacaoPrototipo,
      temperatura: payload.temperatura,
      umidade_ar: payload.umidadeAr,
      umidade_solo: payload.umidadeSolo,
      luminosidade: payload.luminosidade,
    });

    return novaLeitura;
  }

  static async obterDadosDashboard(plantacao_id: number) {
    const dados = await LeituraModel.buscarUltimaLeitura(plantacao_id);
    if (!dados) {
      throw new Error('Nenhuma leitura encontrada para esta plantação');
    }
    return dados;
  }
}

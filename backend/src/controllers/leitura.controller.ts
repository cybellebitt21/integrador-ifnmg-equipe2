import { Request, Response } from 'express';
import { LeituraService } from '../services/leitura.service.js';

export class LeituraController {
  static async criarLeitura(req: Request, res: Response) {
    try {
      const dadosSalvos = await LeituraService.salvarDadosSensores(req.body);

      return res.status(201).json({
        mensagem: 'Dados dos sensores atualizados com sucesso.',
        dados: dadosSalvos,
      });
    }
    catch (error: any) {
      return res.status(400).json({ erro: error.message });
    }
  }

  static async obterDadosDashboard(req: Request, res: Response) {
    try {
      const plantacaoId = 1;
      const dashboardData = await LeituraService.obterDadosDashboard(plantacaoId);

      return res.status(200).json(dashboardData);
    }
    catch (error: any) {
      return res.status(404).json({ erro: error.message });
    }
  }
}

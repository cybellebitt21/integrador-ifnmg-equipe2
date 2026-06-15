import { Request, Response } from 'express';
import { LeituraService } from '../services/leitura.service.js';

export const LeituraController = {
  async criar(req: Request, res: Response) {
    try {
      const leituras = await LeituraService.criar(req.body);

      return res.status(201).json({
        mensagem: `Dados dos sensores processados para ${leituras.length} plantação(ões).`,
        dados: leituras,
      });
    }
    catch (error: any) {
      return res.status(400).json({ erro: error.message });
    }
  },

  async buscarTodos(_req: Request, res: Response) {
    try {
      const leituras = await LeituraService.buscarTodos();
      return res.status(200).json(leituras);
    }
    catch (error: any) {
      return res.status(500).json({ erro: error.message });
    }
  },

  async obterDadosDashboard(req: Request, res: Response) {
    try {
      const plantacaoId = Number(req.params.plantacao_id) || 1;
      const dashboardDados = await LeituraService.obterDadosDashboard(plantacaoId);

      return res.status(200).json(dashboardDados);
    }
    catch (error: any) {
      return res.status(404).json({ erro: error.message });
    }
  },

  async buscarPorId(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ erro: 'O identificador precisa ser um número válido.' });
      }
      const leitura = await LeituraService.buscarPorId(id);
      return res.status(200).json(leitura);
    }
    catch (error: any) {
      return res.status(404).json({ erro: error.message });
    }
  },

  async atualizar(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ erro: 'O identificador precisa ser um número válido.' });
      }
      const leituraAtualizada = await LeituraService.atualizar(id, req.body);
      return res.status(200).json({
        mensagem: 'Leitura atualizada com sucesso.',
        dados: leituraAtualizada,
      });
    }
    catch (error: any) {
      return res.status(400).json({ erro: error.message });
    }
  },

  async deletar(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ erro: 'O identificador precisa ser um número válido.' });
      }
      const resultado = await LeituraService.deletar(id);
      return res.status(200).json(resultado);
    }
    catch (error: any) {
      return res.status(400).json({ erro: error.message });
    }
  },
};

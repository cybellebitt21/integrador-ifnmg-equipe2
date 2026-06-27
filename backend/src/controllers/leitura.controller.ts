import { Request, Response, NextFunction } from 'express';
import { LeituraService } from '../services/leitura.service.js';
import { parseId } from '../utils/parse-id.js';

export const LeituraController = {
  async criar(req: Request, res: Response, _next: NextFunction) {
    const leituras = await LeituraService.criar(req.body);
    return res.status(201).json({
      mensagem: `Dados dos sensores processados para ${leituras.length} plantação(ões).`,
      dados: leituras,
    });
  },

  async buscarTodos(_req: Request, res: Response, _next: NextFunction) {
    const leituras = await LeituraService.buscarTodos();
    return res.status(200).json(leituras);
  },

  async obterDadosDashboard(req: Request, res: Response, _next: NextFunction) {
    const plantacao_id = parseId(req, 'plantacao_id');
    const dashboardDados = await LeituraService.obterDadosDashboard(plantacao_id);
    return res.status(200).json(dashboardDados);
  },

  async buscarPorId(req: Request, res: Response, _next: NextFunction) {
    const id = parseId(req);
    const leitura = await LeituraService.buscarPorId(id);
    return res.status(200).json(leitura);
  },

  async atualizar(req: Request, res: Response, _next: NextFunction) {
    const id = parseId(req);
    const leituraAtualizada = await LeituraService.atualizar(id, req.body);
    return res.status(200).json({
      mensagem: 'Leitura atualizada com sucesso.',
      dados: leituraAtualizada,
    });
  },

  async deletar(req: Request, res: Response, _next: NextFunction) {
    const id = parseId(req);
    const resultado = await LeituraService.deletar(id);
    return res.status(200).json(resultado);
  },
};

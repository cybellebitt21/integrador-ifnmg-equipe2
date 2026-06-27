import { Request, Response, NextFunction } from 'express';
import { AlertaService } from '../services/alerta.service.js';
import { parseId } from '../utils/parse-id.js';

export const AlertaController = {
  async criar(req: Request, res: Response, _next: NextFunction) {
    const novoAlerta = await AlertaService.criar(req.body);
    return res.status(201).json({
      mensagem: 'Alerta criado com sucesso.',
      dados: novoAlerta,
    });
  },

  async buscarPorId(req: Request, res: Response, _next: NextFunction) {
    const id = parseId(req);
    const alerta = await AlertaService.buscarPorId(id);
    return res.status(200).json(alerta);
  },

  async buscarPorPlantacao(req: Request, res: Response, _next: NextFunction) {
    const plantacao_id = parseId(req, 'plantacao_id');
    const alertas = await AlertaService.buscarPorPlantacao(plantacao_id);
    return res.status(200).json(alertas);
  },

  async buscarPorUsuario(req: Request, res: Response, _next: NextFunction) {
    const usuario_id = parseId(req, 'usuario_id');
    const alertas = await AlertaService.buscarPorUsuario(usuario_id);
    return res.status(200).json(alertas);
  },

  async buscarTodos(_req: Request, res: Response, _next: NextFunction) {
    const alertas = await AlertaService.buscarTodos();
    return res.status(200).json(alertas);
  },

  async deletar(req: Request, res: Response, _next: NextFunction) {
    const id = parseId(req);
    const resultado = await AlertaService.deletar(id);
    return res.status(200).json(resultado);
  },
};

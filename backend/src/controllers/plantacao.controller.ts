import { Request, Response, NextFunction } from 'express';
import { PlantacaoService } from '../services/plantacao.service.js';
import { parseId } from '../utils/parse-id.js';

export const PlantacaoController = {
  async criar(req: Request, res: Response, _next: NextFunction) {
    const novaPlantacao = await PlantacaoService.criar(req.body);
    return res.status(201).json({
      mensagem: 'Plantação cadastrada com sucesso.',
      dados: novaPlantacao,
    });
  },

  async buscarPorId(req: Request, res: Response, _next: NextFunction) {
    const id = parseId(req);
    const plantacao = await PlantacaoService.buscarPorId(id);
    return res.status(200).json(plantacao);
  },

  async buscarTodos(_req: Request, res: Response, _next: NextFunction) {
    const plantacoes = await PlantacaoService.buscarTodos();
    return res.status(200).json(plantacoes);
  },

  async buscarPorUsuario(req: Request, res: Response, _next: NextFunction) {
    const usuario_id = parseId(req, 'usuario_id');
    const plantacoes = await PlantacaoService.buscarPorUsuario(usuario_id);
    return res.status(200).json(plantacoes);
  },

  async atualizar(req: Request, res: Response, _next: NextFunction) {
    const id = parseId(req);
    const plantacaoAtualizada = await PlantacaoService.atualizar(id, req.body);
    return res.status(200).json({
      mensagem: 'Plantação atualizada com sucesso.',
      dados: plantacaoAtualizada,
    });
  },

  async deletar(req: Request, res: Response, _next: NextFunction) {
    const id = parseId(req);
    const resultado = await PlantacaoService.deletar(id);
    return res.status(200).json(resultado);
  },
};

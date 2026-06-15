import { Request, Response } from 'express';
import { PlantacaoService } from '../services/plantacao.service.js';

export const PlantacaoController = {
  async criar(req: Request, res: Response) {
    try {
      const novaPlantacao = await PlantacaoService.criar(req.body);
      return res.status(201).json({
        mensagem: 'Plantação cadastrada com sucesso.',
        dados: novaPlantacao,
      });
    }
    catch (error: any) {
      return res.status(400).json({ erro: error.message });
    }
  },

  async buscarPorId(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ erro: 'O identificador fornecido na URL precisa ser um número válido.' });
      }
      const plantacao = await PlantacaoService.buscarPorId(id);
      return res.status(200).json(plantacao);
    }
    catch (error: any) {
      return res.status(404).json({ erro: error.message });
    }
  },

  async buscarTodos(_req: Request, res: Response) {
    try {
      const plantacoes = await PlantacaoService.buscarTodos();
      return res.status(200).json(plantacoes);
    }
    catch (error: any) {
      return res.status(500).json({ erro: error.message });
    }
  },

  async buscarPorUsuario(req: Request, res: Response) {
    try {
      const usuario_id = Number(req.params.usuario_id);
      if (isNaN(usuario_id)) {
        return res.status(400).json({ erro: 'O identificador do usuário precisa ser um número válido.' });
      }
      const plantacoes = await PlantacaoService.buscarPorUsuario(usuario_id);
      return res.status(200).json(plantacoes);
    }
    catch (error: any) {
      return res.status(500).json({ erro: error.message });
    }
  },

  async atualizar(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ erro: 'O identificador fornecido na URL precisa ser um número válido.' });
      }
      const plantacaoAtualizada = await PlantacaoService.atualizar(id, req.body);
      return res.status(200).json({
        mensagem: 'Plantação atualizada com sucesso.',
        dados: plantacaoAtualizada,
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
        return res.status(400).json({ erro: 'O identificador fornecido na URL precisa ser um número válido.' });
      }
      const resultado = await PlantacaoService.deletar(id);
      return res.status(200).json(resultado);
    }
    catch (error: any) {
      return res.status(400).json({ erro: error.message });
    }
  },
};

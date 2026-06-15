import { Request, Response } from 'express';
import { AlertaService } from '../services/alerta.service.js';

export const AlertaController = {
  async criar(req: Request, res: Response) {
    try {
      const novoAlerta = await AlertaService.criar(req.body);
      return res.status(201).json({
        mensagem: 'Alerta criado com sucesso.',
        dados: novoAlerta,
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
      const alerta = await AlertaService.buscarPorId(id);
      return res.status(200).json(alerta);
    }
    catch (error: any) {
      return res.status(404).json({ erro: error.message });
    }
  },

  async buscarPorPlantacao(req: Request, res: Response) {
    try {
      const plantacao_id = Number(req.params.plantacao_id);
      if (isNaN(plantacao_id)) {
        return res.status(400).json({ erro: 'O identificador da plantação precisa ser um número válido.' });
      }
      const alertas = await AlertaService.buscarPorPlantacao(plantacao_id);
      return res.status(200).json(alertas);
    }
    catch (error: any) {
      return res.status(404).json({ erro: error.message });
    }
  },

  async buscarPorUsuario(req: Request, res: Response) {
    try {
      const usuario_id = Number(req.params.usuario_id);
      if (isNaN(usuario_id)) {
        return res.status(400).json({ erro: 'O identificador do usuário precisa ser um número válido.' });
      }
      const alertas = await AlertaService.buscarPorUsuario(usuario_id);
      return res.status(200).json(alertas);
    }
    catch (error: any) {
      return res.status(404).json({ erro: error.message });
    }
  },

  async buscarTodos(_req: Request, res: Response) {
    try {
      const alertas = await AlertaService.buscarTodos();
      return res.status(200).json(alertas);
    }
    catch (error: any) {
      return res.status(500).json({ erro: error.message });
    }
  },

  async deletar(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ erro: 'O identificador fornecido na URL precisa ser um número válido.' });
      }
      const resultado = await AlertaService.deletar(id);
      return res.status(200).json(resultado);
    }
    catch (error: any) {
      return res.status(400).json({ erro: error.message });
    }
  },
};

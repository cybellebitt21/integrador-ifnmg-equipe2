import { Request, Response } from 'express';
import { DispositivoService } from '../services/dispositivo.service.js';

export const DispositivoController = {
  async criar(req: Request, res: Response) {
    try {
      const novoDispositivo = await DispositivoService.criar(req.body);
      return res.status(201).json({
        mensagem: 'Dispositivo cadastrado com sucesso.',
        dados: novoDispositivo,
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
      const dispositivo = await DispositivoService.buscarPorId(id);
      return res.status(200).json(dispositivo);
    }
    catch (error: any) {
      return res.status(404).json({ erro: error.message });
    }
  },

  async buscarTodos(_req: Request, res: Response) {
    try {
      const dispositivos = await DispositivoService.buscarTodos();
      return res.status(200).json(dispositivos);
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
      const dispositivoAtualizado = await DispositivoService.atualizar(id, req.body);
      return res.status(200).json({
        mensagem: 'Dispositivo atualizado com sucesso.',
        dados: dispositivoAtualizado,
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
      const resultado = await DispositivoService.deletar(id);
      return res.status(200).json(resultado);
    }
    catch (error: any) {
      return res.status(400).json({ erro: error.message });
    }
  },
};

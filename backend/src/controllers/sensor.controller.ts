import { Request, Response } from 'express';
import { tipoSensor } from '@prisma/client';
import { SensorService } from '../services/sensor.service.js';

export const SensorController = {
  async criar(req: Request, res: Response) {
    try {
      const novoSensor = await SensorService.criar(req.body);
      return res.status(201).json({
        mensagem: 'Sensor cadastrado com sucesso.',
        dados: novoSensor,
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
      const sensor = await SensorService.buscarPorId(id);
      return res.status(200).json(sensor);
    }
    catch (error: any) {
      return res.status(404).json({ erro: error.message });
    }
  },

  async buscarTodos(_req: Request, res: Response) {
    try {
      const sensores = await SensorService.buscarTodos();
      return res.status(200).json(sensores);
    }
    catch (error: any) {
      return res.status(500).json({ erro: error.message });
    }
  },

  async buscarPorTipo(req: Request, res: Response) {
    try {
      const tipo = req.params.tipo;
      if (!tipo) {
        return res.status(400).json({ erro: 'O tipo do sensor é obrigatório.' });
      }
      const sensores = await SensorService.buscarPorTipo(tipo as tipoSensor);
      return res.status(200).json(sensores);
    }
    catch (error: any) {
      return res.status(404).json({ erro: error.message });
    }
  },

  async atualizar(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ erro: 'O identificador fornecido na URL precisa ser um número válido.' });
      }
      const sensorAtualizado = await SensorService.atualizar(id, req.body);
      return res.status(200).json({
        mensagem: 'Sensor atualizado com sucesso.',
        dados: sensorAtualizado,
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
      const resultado = await SensorService.deletar(id);
      return res.status(200).json(resultado);
    }
    catch (error: any) {
      return res.status(400).json({ erro: error.message });
    }
  },
};

import { Request, Response } from 'express';
import { PlantacaoSensorService } from '../services/plantacao-sensor.service.js';

export const PlantacaoSensorController = {
  async criar(req: Request, res: Response) {
    try {
      const novaAssociacao = await PlantacaoSensorService.criar(req.body);
      return res.status(201).json({
        mensagem: 'Sensor associado à plantação com sucesso.',
        dados: novaAssociacao,
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
      const plantacaoSensor = await PlantacaoSensorService.buscarPorId(id);
      return res.status(200).json(plantacaoSensor);
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
      const sensores = await PlantacaoSensorService.buscarPorPlantacao(plantacao_id);
      return res.status(200).json(sensores);
    }
    catch (error: any) {
      return res.status(404).json({ erro: error.message });
    }
  },

  async buscarPorSensor(req: Request, res: Response) {
    try {
      const sensor_id = Number(req.params.sensor_id);
      if (isNaN(sensor_id)) {
        return res.status(400).json({ erro: 'O identificador do sensor precisa ser um número válido.' });
      }
      const plantacaoSensor = await PlantacaoSensorService.buscarPorSensor(sensor_id);
      return res.status(200).json(plantacaoSensor);
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
      const plantacaoSensorAtualizado = await PlantacaoSensorService.atualizar(id, req.body);
      return res.status(200).json({
        mensagem: 'Associação plantação-sensor atualizada com sucesso.',
        dados: plantacaoSensorAtualizado,
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
      const resultado = await PlantacaoSensorService.deletar(id);
      return res.status(200).json(resultado);
    }
    catch (error: any) {
      return res.status(400).json({ erro: error.message });
    }
  },

  async deletarPorPlantacao(req: Request, res: Response) {
    try {
      const plantacao_id = Number(req.params.plantacao_id);
      if (isNaN(plantacao_id)) {
        return res.status(400).json({ erro: 'O identificador da plantação precisa ser um número válido.' });
      }
      const resultado = await PlantacaoSensorService.deletarPorPlantacao(plantacao_id);
      return res.status(200).json(resultado);
    }
    catch (error: any) {
      return res.status(400).json({ erro: error.message });
    }
  },
};

import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { tipoSensor } from '@prisma/client';
import { SensorModel } from '../models/sensor.model.js';
import { findOrThrow } from '../utils/find-or-throw.js';
import { parseId } from '../utils/parse-id.js';

export const SensorController = {
  async criar(req: Request, res: Response, _next: NextFunction) {
    const novoSensor = await SensorModel.criar(req.body);
    return res.status(201).json({
      mensagem: 'Sensor cadastrado com sucesso.',
      dados: novoSensor,
    });
  },

  async buscarPorId(req: Request, res: Response, _next: NextFunction) {
    const id = parseId(req);
    const sensor = await findOrThrow(SensorModel, id, 'sensor');
    return res.status(200).json(sensor);
  },

  async buscarTodos(_req: Request, res: Response, _next: NextFunction) {
    const sensores = await SensorModel.buscarTodos();
    return res.status(200).json(sensores);
  },

  async buscarPorTipo(req: Request, res: Response, _next: NextFunction) {
    const tipo = z.enum(tipoSensor).parse(req.params.tipo);
    const sensores = await SensorModel.buscarPorTipo(tipo);
    return res.status(200).json(sensores);
  },

  async atualizar(req: Request, res: Response, _next: NextFunction) {
    const id = parseId(req);
    await findOrThrow(SensorModel, id, 'sensor');
    const sensorAtualizado = await SensorModel.atualizar(id, req.body);
    return res.status(200).json({
      mensagem: 'Sensor atualizado com sucesso.',
      dados: sensorAtualizado,
    });
  },

  async deletar(req: Request, res: Response, _next: NextFunction) {
    const id = parseId(req);
    await findOrThrow(SensorModel, id, 'sensor');
    await SensorModel.deletar(id);
    return res.status(200).json({ mensagem: 'Sensor removido com sucesso.' });
  },
};

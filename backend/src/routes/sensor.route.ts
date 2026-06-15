import { Router } from 'express';
import { SensorController } from '../controllers/sensor.controller.js';

const router = Router();

router.post('/', SensorController.criar);
router.get('/', SensorController.buscarTodos);
router.get('/:id', SensorController.buscarPorId);
router.get('/tipo/:tipo', SensorController.buscarPorTipo);
router.put('/:id', SensorController.atualizar);
router.delete('/:id', SensorController.deletar);

export default router;

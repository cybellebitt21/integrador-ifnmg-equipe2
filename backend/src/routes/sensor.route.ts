import { Router } from 'express';
import { SensorController } from '../controllers/sensor.controller.js';
import { validate } from '../middlewares/validate.js';
import { criarSensorSchema, atualizarSensorSchema } from '../schemas/index.js';

const router = Router();

router.post('/', validate(criarSensorSchema), SensorController.criar);
router.get('/', SensorController.buscarTodos);
router.get('/:id', SensorController.buscarPorId);
router.get('/tipo/:tipo', SensorController.buscarPorTipo);
router.put('/:id', validate(atualizarSensorSchema), SensorController.atualizar);
router.delete('/:id', SensorController.deletar);

export default router;

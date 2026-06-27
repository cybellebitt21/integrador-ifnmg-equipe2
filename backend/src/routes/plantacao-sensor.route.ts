import { Router } from 'express';
import { PlantacaoSensorController } from '../controllers/plantacao-sensor.controller.js';
import { validate } from '../middlewares/validate.js';
import { criarPlantacaoSensorSchema, atualizarPlantacaoSensorSchema } from '../schemas/index.js';

const router = Router();

router.post('/', validate(criarPlantacaoSensorSchema), PlantacaoSensorController.criar);
router.get('/:id', PlantacaoSensorController.buscarPorId);
router.get('/plantacao/:plantacao_id', PlantacaoSensorController.buscarPorPlantacao);
router.get('/sensor/:sensor_id', PlantacaoSensorController.buscarPorSensor);
router.put('/:id', validate(atualizarPlantacaoSensorSchema), PlantacaoSensorController.atualizar);
router.delete('/:id', PlantacaoSensorController.deletar);
router.delete('/plantacao/:plantacao_id', PlantacaoSensorController.deletarPorPlantacao);

export default router;

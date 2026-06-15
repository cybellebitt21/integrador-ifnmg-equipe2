import { Router } from 'express';
import { PlantacaoSensorController } from '../controllers/plantacao-sensor.controller.js';

const router = Router();

router.post('/', PlantacaoSensorController.criar);
router.get('/:id', PlantacaoSensorController.buscarPorId);
router.get('/plantacao/:plantacao_id', PlantacaoSensorController.buscarPorPlantacao);
router.get('/sensor/:sensor_id', PlantacaoSensorController.buscarPorSensor);
router.put('/:id', PlantacaoSensorController.atualizar);
router.delete('/:id', PlantacaoSensorController.deletar);
router.delete('/plantacao/:plantacao_id', PlantacaoSensorController.deletarPorPlantacao);

export default router;

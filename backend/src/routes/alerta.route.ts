import { Router } from 'express';
import { AlertaController } from '../controllers/alerta.controller.js';
import { validate } from '../middlewares/validate.js';
import { criarAlertaSchema } from '../schemas/index.js';

const router = Router();

router.post('/', validate(criarAlertaSchema), AlertaController.criar);
router.get('/', AlertaController.buscarTodos);
router.get('/:id', AlertaController.buscarPorId);
router.get('/plantacao/:plantacao_id', AlertaController.buscarPorPlantacao);
router.get('/usuario/:usuario_id', AlertaController.buscarPorUsuario);
router.delete('/:id', AlertaController.deletar);

export default router;

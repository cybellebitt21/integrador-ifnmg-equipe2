import { Router } from 'express';
import { DispositivoController } from '../controllers/dispositivo.controller.js';
import { validate } from '../middlewares/validate.js';
import { criarDispositivoSchema, atualizarDispositivoSchema } from '../schemas/index.js';

const router = Router();

router.post('/', validate(criarDispositivoSchema), DispositivoController.criar);
router.get('/', DispositivoController.buscarTodos);
router.get('/:id', DispositivoController.buscarPorId);
router.put('/:id', validate(atualizarDispositivoSchema), DispositivoController.atualizar);
router.delete('/:id', DispositivoController.deletar);

export default router;

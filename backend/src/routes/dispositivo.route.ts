import { Router } from 'express';
import { DispositivoController } from '../controllers/dispositivo.controller.js';

const router = Router();

router.post('/', DispositivoController.criar);
router.get('/', DispositivoController.buscarTodos);
router.get('/:id', DispositivoController.buscarPorId);
router.put('/:id', DispositivoController.atualizar);
router.delete('/:id', DispositivoController.deletar);

export default router;

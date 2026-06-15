import { Router } from 'express';
import { UsuarioController } from '../controllers/usuario.controller.js';

const router = Router();

router.post('/', UsuarioController.criar);
router.get('/', UsuarioController.buscarTodos);
router.get('/:id', UsuarioController.buscarPorId);
router.put('/:id', UsuarioController.atualizar);
router.delete('/:id', UsuarioController.deletar);

export default router;

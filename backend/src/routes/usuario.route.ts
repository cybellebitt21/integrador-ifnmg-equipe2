import { Router } from 'express';
import { UsuarioController } from '../controllers/usuario.controller.js';
import { auth } from '../middlewares/auth.js';
import { validate } from '../middlewares/validate.js';
import { criarUsuarioSchema, atualizarUsuarioSchema } from '../schemas/index.js';

const router = Router();

router.post('/', validate(criarUsuarioSchema), UsuarioController.criar);
router.get('/', UsuarioController.buscarTodos);
router.get('/:id', UsuarioController.buscarPorId);
router.put('/:id', auth, validate(atualizarUsuarioSchema), UsuarioController.atualizar);
router.delete('/:id', auth, UsuarioController.deletar);

export default router;

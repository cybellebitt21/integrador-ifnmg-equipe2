import { Router } from 'express';
import { UsuarioController } from '../controllers/usuario.controller.js';
import { validate } from '../middlewares/validate.js';
import { criarUsuarioSchema, atualizarUsuarioSchema } from '../schemas/index.js';

const router = Router();

router.post('/', validate(criarUsuarioSchema), UsuarioController.criar);
router.get('/', UsuarioController.buscarTodos);
router.get('/:id', UsuarioController.buscarPorId);
router.put('/:id', validate(atualizarUsuarioSchema), UsuarioController.atualizar);
router.delete('/:id', UsuarioController.deletar);

export default router;

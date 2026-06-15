import { Router } from 'express';
import { PlantacaoController } from '../controllers/plantacao.controller.js';

const router = Router();

router.post('/', PlantacaoController.criar);
router.get('/', PlantacaoController.buscarTodos);
router.get('/:id', PlantacaoController.buscarPorId);
router.get('/usuario/:usuario_id', PlantacaoController.buscarPorUsuario);
router.put('/:id', PlantacaoController.atualizar);
router.delete('/:id', PlantacaoController.deletar);

export default router;

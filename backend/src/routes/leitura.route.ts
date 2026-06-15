import { Router } from 'express';
import { LeituraController } from '../controllers/leitura.controller.js';

const router = Router();

router.post('/', LeituraController.criar);
router.get('/', LeituraController.buscarTodos);
router.get('/dashboard/:plantacao_id', LeituraController.obterDadosDashboard);
router.get('/:id', LeituraController.buscarPorId);
router.put('/:id', LeituraController.atualizar);
router.delete('/:id', LeituraController.deletar);

export default router;

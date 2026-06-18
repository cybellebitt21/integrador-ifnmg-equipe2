import { Router } from 'express';
import { LeituraController } from '../controllers/leitura.controller.js';
import { validate } from '../middlewares/validate.js';
import { criarLeituraSchema, atualizarLeituraSchema } from '../schemas/index.js';

const router = Router();

router.post('/', validate(criarLeituraSchema), LeituraController.criar);
router.get('/', LeituraController.buscarTodos);
router.get('/dashboard/:plantacao_id', LeituraController.obterDadosDashboard);
router.get('/:id', LeituraController.buscarPorId);
router.put('/:id', validate(atualizarLeituraSchema), LeituraController.atualizar);
router.delete('/:id', LeituraController.deletar);

export default router;

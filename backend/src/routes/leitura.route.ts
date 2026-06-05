import { Router } from 'express';
import { LeituraController } from '../controllers/leitura.controller.js';

const router = Router();

router.post('/', LeituraController.criarLeitura);
router.get('/', LeituraController.obterDadosDashboard);

export default router;

import { Router } from 'express';
import leituraRoutes from './leitura.route.js';
import usuarioRoutes from './usuario.route.js';
import plantacaoRoutes from './plantacao.route.js';
import alertaRoutes from './alerta.route.js';
import dispositivoRoutes from './dispositivo.route.js';
import sensorRoutes from './sensor.route.js';

const router = Router();

router.use('/leitura-sensores', leituraRoutes);
router.use('/usuarios', usuarioRoutes);

export default router;

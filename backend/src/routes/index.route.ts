import { Router } from 'express';
import usuarioRoutes from './usuario.route.js';
import dispositivoRoutes from './dispositivo.route.js';
import plantacaoRoutes from './plantacao.route.js';
import sensorRoutes from './sensor.route.js';
import plantacaoSensorRoutes from './plantacao-sensor.route.js';
import leituraRoutes from './leitura.route.js';
import alertaRoutes from './alerta.route.js';

const router = Router();

router.use('/usuarios', usuarioRoutes);
router.use('/dispositivos', dispositivoRoutes);
router.use('/plantacoes', plantacaoRoutes);
router.use('/sensores', sensorRoutes);
router.use('/plantacoes-sensores', plantacaoSensorRoutes);
router.use('/leitura-sensores', leituraRoutes);
router.use('/alertas', alertaRoutes);

export default router;

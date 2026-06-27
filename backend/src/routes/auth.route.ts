import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller.js';
import { auth } from '../middlewares/auth.js';
import { validate } from '../middlewares/validate.js';
import { loginSchema } from '../schemas/auth.schema.js';

const router = Router();

router.post('/login', validate(loginSchema), AuthController.login);
router.get('/me', auth, AuthController.perfil);

export default router;

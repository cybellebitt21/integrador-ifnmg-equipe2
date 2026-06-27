import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service.js';

export const AuthController = {
  async login(req: Request, res: Response, _next: NextFunction) {
    const { email, senha } = req.body;
    const resultado = await AuthService.login(email, senha);
    return res.status(200).json(resultado);
  },

  async perfil(req: Request, res: Response, _next: NextFunction) {
    const { UsuarioService } = await import('../services/usuario.service.js');
    const usuario = await UsuarioService.buscarPorId(req.usuario!.id);
    return res.status(200).json(usuario);
  },
};

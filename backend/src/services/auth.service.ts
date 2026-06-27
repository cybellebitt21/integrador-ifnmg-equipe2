import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UsuarioModel } from '../models/usuario.model.js';
import { env } from '../env/index.js';

export const AuthService = {
  async login(email: string, senha: string) {
    const usuario = await UsuarioModel.buscarPorEmailComSenha(email);
    if (!usuario) {
      throw Object.assign(new Error('E-mail ou senha inválidos.'), { status: 401 });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      throw Object.assign(new Error('E-mail ou senha inválidos.'), { status: 401 });
    }

    const token = jwt.sign({ id: usuario.id }, env.JWT_SECRET, { expiresIn: '7d' });

    return {
      token,
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
      },
    };
  },
};

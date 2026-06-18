import { Request, Response, NextFunction } from 'express';
import { UsuarioService } from '../services/usuario.service.js';
import { parseId } from '../utils/parse-id.js';

export const UsuarioController = {
  async criar(req: Request, res: Response, _next: NextFunction) {
    const novoUsuario = await UsuarioService.criar(req.body);
    return res.status(201).json({
      mensagem: 'Usuário cadastrado com sucesso.',
      dados: novoUsuario,
    });
  },

  async buscarPorId(req: Request, res: Response, _next: NextFunction) {
    const id = parseId(req);
    const usuario = await UsuarioService.buscarPorId(id);
    return res.status(200).json(usuario);
  },

  async buscarTodos(_req: Request, res: Response, _next: NextFunction) {
    const usuarios = await UsuarioService.buscarTodos();
    return res.status(200).json(usuarios);
  },

  async atualizar(req: Request, res: Response, _next: NextFunction) {
    const id = parseId(req);
    const usuarioAtualizado = await UsuarioService.atualizar(id, req.body);
    return res.status(200).json({
      mensagem: 'Os dados do usuário foram atualizados com sucesso.',
      dados: usuarioAtualizado,
    });
  },

  async deletar(req: Request, res: Response, _next: NextFunction) {
    const id = parseId(req);
    const resultado = await UsuarioService.deletar(id);
    return res.status(200).json(resultado);
  },
};

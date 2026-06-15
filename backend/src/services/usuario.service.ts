import { UsuarioModel } from "../models/Usuario.model.js";

interface CriarUsuarioDados {
  nome: string;
  email: string;
  senha: string;
  telefone: string;
}

interface AtualizarUsuarioDados {
  nome?: string;
  email?: string;
  senha?: string;
  telefone?: string;
}

export const UsuarioService = {
  async criar(dados: CriarUsuarioDados) {
    const usuarioExistente = await UsuarioModel.buscarPorEmail(dados.email);
    if (usuarioExistente) {
      throw new Error('O endereço de e-mail já está sendo usado por outro usuário.')
    }

    return await UsuarioModel.criar(dados);
  },

  async buscarPorId(id: number) {
    const usuario = await UsuarioModel.buscarPorId(id);
    if (!usuario) {
      throw new Error(`Nenhum usuário encontrado com o identificador ${id}.`);
    }
    return usuario;
  },

  async buscarTodos() {
    return await UsuarioModel.buscarTodos();
  },

  async atualizar(id: number, dados: AtualizarUsuarioDados) {
    await UsuarioService.buscarPorId(id);

    if (dados.email && typeof dados.email === 'string') {
      const usuarioComMesmoEmail = await UsuarioModel.buscarPorEmail(dados.email);
      if (usuarioComMesmoEmail && usuarioComMesmoEmail.id !== id) {
        throw new Error('O e-mail informado já está em uso por outro usuário')
      }
    }

    return await UsuarioModel.atualizar(id, dados);
  },

  async deletar(id: number) {
    await UsuarioService.buscarPorId(id);

    await UsuarioModel.deletar(id);
    return { mensagem: 'Usuário removido do sistema com sucesso.' }
  },
};

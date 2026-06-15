import { tipoDispositivo, statusDispositivo } from '@prisma/client';
import { DispositivoModel } from '../models/Dispositivo.model.js';

interface CriarDispositivoDados {
  nome: string;
  tipo: tipoDispositivo;
  status?: statusDispositivo;
}

interface AtualizarDispositivoDados {
  nome?: string;
  tipo?: tipoDispositivo;
  status?: statusDispositivo;
}

export const DispositivoService = {
  async criar(dados: CriarDispositivoDados) {
    const dispositivoDados = {
      nome: dados.nome,
      tipo: dados.tipo,
      status: dados.status ?? statusDispositivo.Inativo,
    };
    return await DispositivoModel.criar(dispositivoDados);
  },

  async buscarPorId(id: number) {
    const dispositivo = await DispositivoModel.buscarPorId(id);
    if (!dispositivo) {
      throw new Error(`Nenhum dispositivo encontrado com o identificador ${id}.`);
    }
    return dispositivo;
  },

  async buscarTodos() {
    return await DispositivoModel.buscarTodos();
  },

  async atualizar(id: number, dados: AtualizarDispositivoDados) {
    await DispositivoService.buscarPorId(id);
    return await DispositivoModel.atualizar(id, dados);
  },

  async deletar(id: number) {
    await DispositivoService.buscarPorId(id);
    await DispositivoModel.deletar(id);
    return { mensagem: 'Dispositivo removido com sucesso.' };
  },
};

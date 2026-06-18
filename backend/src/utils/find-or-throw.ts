export async function findOrThrow<T>(
  model: { buscarPorId: (id: number) => Promise<T | null> },
  id: number,
  nomeEntidade: string,
  feminino: boolean = false
): Promise<T> {
  const entidade = await model.buscarPorId(id);
  if (!entidade) {
    const artigo = feminino ? 'Nenhuma' : 'Nenhum';
    const sufixo = feminino ? 'a' : 'o';
    throw new Error(`${artigo} ${nomeEntidade} não encontrad${sufixo} com o identificador ${id}.`);
  }
  return entidade;
}

import z from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string().min(1, 'A string de conexão é obrigatória'),

  PORT: z.string().default('3000').transform((val) => {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
      throw new Error('A variável PORT precisa ser um número válido');
    }
    return port;
  }),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error('Erro crítico: Variáveis de ambiente do Backend inválidas!');
  console.error(_env.error.issues);
  throw new Error('Configuração do ambiente do servidor inválida.');
}

export const env = _env.data;

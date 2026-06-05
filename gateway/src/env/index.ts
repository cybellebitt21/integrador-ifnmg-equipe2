import z from 'zod';

const envSchema = z.object({
  SERIAL_PORT: z.string().default('ttyUSB0'),
  BACKEND_URL: z.url().default('http://localhost:3000/api/leitura'),
  SERIAL_BAUD: z.string().default('115200').transform((val) => {
    const baud = parseInt(val, 10);
    if (isNaN(baud)) {
      throw new Error('Serial baud precisa ser um número válido');
    }
    return baud;
  }),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error('Erro crítico: Variáveis de ambiente inválidas!');
  console.error(_env.error.issues);
  throw new Error('Configuração de ambiente inválida.');
}

export const env = _env.data;

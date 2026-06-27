import { z } from 'zod';

export const loginSchema = z.object({
  email: z.email({ error: 'Email inválido' }),
  senha: z.string().min(1, 'Senha é obrigatória'),
});

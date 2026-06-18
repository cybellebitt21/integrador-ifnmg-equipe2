import { z } from 'zod';
import { tipoDispositivo, statusDispositivo, tipoSensor, statusSensor, tipoAlerta } from '@prisma/client';

export const criarUsuarioSchema = z.object({
  nome: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  email: z.email({ error: 'Email inválido' }),
  senha: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
  telefone: z.string(),
});

export const atualizarUsuarioSchema = criarUsuarioSchema.partial();

export const criarDispositivoSchema = z.object({
  nome: z.string(),
  tipo: z.enum(tipoDispositivo),
  status: z.enum(statusDispositivo).optional(),
});

export const atualizarDispositivoSchema = criarDispositivoSchema.partial();

export const criarPlantacaoSchema = z.object({
  usuario_id: z.number(),
  dispositivo_id: z.number(),
  nome: z.string(),
  tipo: z.string(),
  data_inicio: z.coerce.date(),
  data_colheita: z.coerce.date().optional(),
  data_proximo_plantio: z.coerce.date().optional(),
  descricao: z.string().optional(),
});

export const atualizarPlantacaoSchema = criarPlantacaoSchema.partial();

export const criarSensorSchema = z.object({
  nome: z.string(),
  tipo: z.enum(tipoSensor),
  unidade: z.string(),
  status: z.enum(statusSensor).optional(),
});

export const atualizarSensorSchema = criarSensorSchema.partial();

export const criarPlantacaoSensorSchema = z.object({
  plantacao_id: z.number(),
  sensor_id: z.number(),
  limite_atencao: z.number().positive('Limite de atenção deve ser positivo'),
  limite_critico: z.number().positive('Limite crítico deve ser positivo'),
});

export const atualizarPlantacaoSensorSchema = criarPlantacaoSensorSchema.partial();

export const criarLeituraSchema = z.object({
  plantacao_id: z.number().optional(),
  umidade_solo: z.number().optional(),
  umidade_ar: z.number().optional(),
  temperatura: z.number().optional(),
  luminosidade: z.number().optional(),
});

export const atualizarLeituraSchema = criarLeituraSchema.partial();

export const criarAlertaSchema = z.object({
  leitura_id: z.number(),
  usuario_id: z.number(),
  plantacao_id: z.number(),
  tipo: z.enum(tipoAlerta),
  mensagem: z.string(),
  notificacao: z.boolean().optional(),
});

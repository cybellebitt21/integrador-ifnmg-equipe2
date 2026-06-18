import { Request } from 'express';

export function parseId(req: Request, paramName: string = 'id'): number {
  const id = Number(req.params[paramName]);
  if (isNaN(id)) {
    throw Object.assign(new Error('ID inválido'), { status: 400 });
  }
  return id;
}

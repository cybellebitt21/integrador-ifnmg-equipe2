import { Request } from 'express';

export function parseId(req: Request, paramName: string = 'id'): string {
  const id = req.params[paramName] as string;
  if (!id) {
    throw Object.assign(new Error('ID inválido'), { status: 400 });
  }
  return id;
}

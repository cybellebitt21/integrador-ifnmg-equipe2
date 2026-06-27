import { Prisma } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';

export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2003') {
      return res.status(409).json({ erro: 'Registro possui vínculos com outros registros. Remova-os primeiro.' });
    }
    if (err.code === 'P2025') {
      return res.status(404).json({ erro: 'Registro não encontrado.' });
    }
  }

  const status = err.status || 400;
  return res.status(status).json({ erro: err.message });
}

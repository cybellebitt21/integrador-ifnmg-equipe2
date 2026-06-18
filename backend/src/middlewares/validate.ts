import { Request, Response, NextFunction } from 'express';
import { ZodType, ZodError } from 'zod';

export function validate(schema: ZodType) {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const mensagens = error.issues.map(e => e.message).join('; ');
        next(Object.assign(new Error(mensagens), { status: 400 }));
      } else {
        next(error);
      }
    }
  };
}

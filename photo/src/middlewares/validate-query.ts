import { Request, Response, NextFunction, RequestHandler } from "express";
import { z, ZodSchema } from "zod";

export const validateQuery = <T extends ZodSchema<any>>(
  schema: T
): RequestHandler<{}, {}, {}, z.infer<T>> => {
  return (req: Request, res: Response, next: NextFunction) => {
    schema.parse(req.query);
    next();
  };
};

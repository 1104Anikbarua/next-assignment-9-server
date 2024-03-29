import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";
import { handleAsyncTryCatch } from "../utlis/tryCatch.utlis";

export const validateRequest = (schema: AnyZodObject) => {
  return handleAsyncTryCatch(
    async (req: Request, res: Response, next: NextFunction) => {
      await schema.parseAsync({ body: req.body });
      next();
    },
  );
};

import httpStatus from "http-status";
import jwt, { Secret } from "jsonwebtoken";
import { handleAsyncTryCatch } from "../utlis/tryCatch.utlis";
import { NextFunction, Request, Response } from "express";
import { AppError } from "../errorHanler/appError.error";
import config from "../config";

export const auth = () => {
  return handleAsyncTryCatch(
    async (req: Request, res: Response, next: NextFunction) => {
      const token = req.headers.authorization;

      if (!token) {
        throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized access");
      }
      const decoded = jwt.verify(token, config.jwt_access_secret as Secret);
      next();
    }
  );
};

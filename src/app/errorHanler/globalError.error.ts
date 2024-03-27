import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

export const handleGlobalError = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(httpStatus.BAD_REQUEST).json({
    success: false,
    message: error.message || "Opps! Something went wrong",
    errorDetails: error,
  });
};

/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from "express";
import httpStatus from "http-status";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { ZodError } from "zod";
import { handleZodError } from "../errorHanler/zod.error";
import { AppError } from "../errorHanler/appError.error";

export const handleGlobalError: ErrorRequestHandler = (
  error,
  req,
  res,
  next,
) => {
  let statusCode = 500;
  let message = "Opps! something went wrong";

  // if any zod validation error occured
  if (error instanceof ZodError) {
    const zodError = handleZodError(error);
    statusCode = zodError.statusCode;
    message = zodError.message;
    error = { issue: zodError.errorDeails };
  }
  //if token is incorrect then this if block is going to execute
  if (error instanceof JsonWebTokenError) {
    statusCode = httpStatus.UNAUTHORIZED;
    message = "Unauthorized Access";
  }
  //if token is expired then this if block is going to execute
  if (error instanceof TokenExpiredError) {
    statusCode = httpStatus.FORBIDDEN;
    message = "Unauthorized Access";
  }
  // if any error happend then this if block is going to execute
  if (error instanceof AppError) {
    statusCode = error.statusCode;
    message = error.message;
  }
  res.status(statusCode).json({
    success: false,
    message,
    errorDetails: error,
  });
};

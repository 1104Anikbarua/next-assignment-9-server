import { Request, Response } from "express";
import httpStatus from "http-status";
export const handleNotFound = (req: Request, res: Response) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "Api not found",
  });
};

import { Response } from "express";
import { IResponse } from "../globalTypes/response.types";

export const handleSendResposne = <T, U>(
  res: Response,
  data: IResponse<T, U>
) => {
  res.status(data.statusCode).json({
    success: data.success,
    statusCode: data.statusCode,
    message: data.message,
    meta: data.meta,
    data: data.data,
  });
};

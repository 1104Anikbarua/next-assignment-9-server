import { ZodError, ZodIssue } from "zod";
import { TErrorSource } from "../globalTypes/errorResponse.types";

export const handleZodError = (error: ZodError) => {
  const statusCode = 400;
  const message = "Validation error";

  const errorDeails: TErrorSource = error.issues.map(
    ({ path, message }: ZodIssue) => ({
      field: path[path.length - 1],
      message: message,
    }),
  );
  return {
    statusCode,
    message,
    errorDeails,
  };
};

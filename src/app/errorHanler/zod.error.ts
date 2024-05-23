import { ZodError, ZodIssue } from "zod";
import { TErrorSource } from "../globalTypes/errorResponse.types";

export const handleZodError = (error: ZodError) => {
  const statusCode = 400;
  const message = "Validation error";

  const issues: TErrorSource = error.issues.map((issue: ZodIssue) => {
    return {
      field: issue.path[issue.path.length - 1],
      message: issue.message,
    };
  });
  return {
    statusCode,
    message,
    issues,
  };
};

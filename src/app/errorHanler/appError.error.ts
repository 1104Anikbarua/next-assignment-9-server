/* eslint-disable no-unused-vars */
export class AppError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    stack: string = "",
  ) {
    super(message);

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

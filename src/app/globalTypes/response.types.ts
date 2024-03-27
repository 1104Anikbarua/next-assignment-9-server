export interface IResponse<T, U> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
  meta?: U;
}

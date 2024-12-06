import { Response } from "express";
export const errorResponse = (res: Response, code: number, message: string) => {
  return res.status(code).json({
    message: message,
  });
};

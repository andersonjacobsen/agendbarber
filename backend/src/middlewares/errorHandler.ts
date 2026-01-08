import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { AppError } from "../errors/AppError";
import { failure } from "../utils/apiResponse";

export function errorHandler(
  error: Error,
  _: Request,
  res: Response,
  __: NextFunction
) {
  if (error instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: "Erro de validação",
      issues: error.issues,
    });
  }

  if (error instanceof AppError) {
    return res.status(error.statusCode).json(failure(error.message));
  }

  console.error(error);

  return res.status(500).json(failure("Erro interno do servidor"));
}

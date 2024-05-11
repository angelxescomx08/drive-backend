import { NextFunction, Request, Response } from "express";
import { schemaBodyCreateFile } from "../types/file.types";

export const validateBodyCreateFileMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = schemaBodyCreateFile.safeParse(req.body);
  if (!result.success) {
    const error = result.error;
    return res.status(400).json({
      message: "invalid data",
      error,
    });
  }
  next();
};

import { NextFunction, Request, Response } from "express";
import { schemaBodyCreateFolder } from "../types/folder.types";

export const validateBodyCreateFolderMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = schemaBodyCreateFolder.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      error: "not valid data",
      ...result.error,
    });
  }
  next();
};

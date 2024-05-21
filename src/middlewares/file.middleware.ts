import { NextFunction, Request, Response } from "express";
import {
  schemaBodyCreateFile,
  schemaGetFiles,
  typeGetFiles,
} from "../types/file.types";
import { convertToNumber } from "../utils/convert-to-number";

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

export const validateGetFilesMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data: typeGetFiles = {
    id_folder: req.query.id_folder as string,
    file_name: req.query.file_name as string,
    limit: convertToNumber(req.query.limit, 10),
    page: convertToNumber(req.query.page, 0),
  };
  const result = schemaGetFiles.safeParse(data);
  if (!result.success) {
    const error = result.error;
    return res.status(400).json({
      message: "invalid data",
      error,
      query: req.query,
    });
  }
  next();
};

import { NextFunction, Request, Response } from "express";
import {
  schemaBodyCreateFolder,
  schemaBodyUpdateFolder,
  schemaQueryGetFolders,
  typeQueryGetFolders,
} from "../types/folder.types";
import { convertToNumber } from "../utils/convert-to-number";

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

export const validateQueryGetFoldersMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const query: typeQueryGetFolders = {
    id_user: req.query.id_user as string,
    id_parent: req.query.id_parent as string | null | undefined,
    limit: convertToNumber(req.query.limit, 10),
    page: convertToNumber(req.query.page, 0),
    id_folder: req.query.id_folder as string | null | undefined,
  };
  const result = schemaQueryGetFolders.safeParse(query);
  if (!result.success) {
    return res.status(400).json({
      error: "not valid data",
      ...result.error,
    });
  }
  next();
};

export const validateBodyUpdateFoldersMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = schemaBodyUpdateFolder.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      error: "not valid data",
      ...result.error,
    });
  }
  next();
};

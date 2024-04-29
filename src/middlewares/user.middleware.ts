import { NextFunction, Request, Response } from "express";
import { schemaQueryGetUsers } from "../types/users.type";
import { convertToNumber } from "../utils/convert-to-number";

export const validateQueryUserMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { page, per_page } = req.query;
  const result = schemaQueryGetUsers.safeParse({
    page: convertToNumber(page, 0),
    per_page: convertToNumber(per_page, 10),
  });
  if (!result.success) {
    return res.status(400).json({
      ...result.error,
      error: "not valid data",
    });
  }
  next();
};

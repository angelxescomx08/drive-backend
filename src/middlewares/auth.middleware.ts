import { NextFunction, Request, Response } from "express";
import { schemaAuthBodyRegister } from "../types/auth.types";

export const registerBodyMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const resultBody = schemaAuthBodyRegister.safeParse(req.body);
  if (resultBody.success) {
    next();
  } else {
    return res.status(400).json(resultBody.error);
  }
};

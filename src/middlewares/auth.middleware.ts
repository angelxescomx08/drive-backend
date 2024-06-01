import { NextFunction, Request, Response } from "express";
import { schemaAuthBodyLogin } from "../types/auth.types";
import jwt from "jsonwebtoken";

export const validateBodyMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const resultBody = schemaAuthBodyLogin.safeParse(req.body);
  if (resultBody.success) {
    next();
  } else {
    return res.status(400).json({
      ...resultBody.error,
      error: "not valid data",
    });
  }
};

export const validateTokenMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.x_token as string;
  jwt.verify(token, process.env.JWT_PASSWORD, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        message: "not valid token",
      });
    }
    next();
  });
};

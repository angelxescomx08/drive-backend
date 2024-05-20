import { NextFunction, Request, Response } from "express";
import { S3 } from "../models/s3.model";
import multer from "multer";

export const addS3ToRequest = (s3: S3) => {
  return (req: Request, res: Response, next: NextFunction) => {
    req.s3 = s3;
    next();
  };
};

export const multerUploadMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return req.s3.getUpload().array("files")(req, res, next);
  } catch (err) {
    return res.json({
      error: "error",
    });
  }
};

export const multerErrorHandler = (
  err: Error | multer.MulterError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err);
  if (err instanceof multer.MulterError) {
    // Error de multer
    res.status(400).json({ error: "Error on file", message: err.message });
  } else {
    // Otro tipo de error
    res.status(500).json({ error: "Error on server" });
  }
  next();
};

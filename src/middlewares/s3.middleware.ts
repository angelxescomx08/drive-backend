import { NextFunction, Request, Response } from "express";
import { S3 } from "../models/s3.model";

export const addS3ToRequest = (s3: S3) => {
  return (req: Request, res: Response, next: NextFunction) => {
    req.s3 = s3;
    next();
  };
};

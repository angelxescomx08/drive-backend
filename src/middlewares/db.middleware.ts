import { NextFunction, Response, Request } from "express";
import { Database } from "../models/db.model";

export const addDatabaseToRequest = (db: Database) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    req.db = db;
    next();
  };
};

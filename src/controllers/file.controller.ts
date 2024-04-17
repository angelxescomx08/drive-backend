import { Request, Response } from "express";
import { schemaBodyCreateFile } from "../types/file.types";

export const createFile = (req: Request, res: Response) => {
  try {
    const bodyResult = schemaBodyCreateFile.safeParse(req.body);
    if (bodyResult.success) {
    } else {
      const error = bodyResult.error;
      return res.status(400).json(error);
    }
  } catch (error) {
    res.status(500).json({
      message: "Something wrong happen",
    });
  }
};

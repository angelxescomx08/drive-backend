import { Request, Response } from "express";
import { schemaBodyCreateFile } from "../types/file.types";

export const createFile = async (req: Request, res: Response) => {
  try {
    return res.json(req.files);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something wrong happen",
    });
  }
};

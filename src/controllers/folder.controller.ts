import { Request, Response } from "express";
import { schemaBodyCreateFolder } from "../types/folder.types";

export const getFoldersByUserId = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    res.status(500).json({
      message: "Something wrong happen",
    });
  }
};

export const createFolder = async (req: Request, res: Response) => {
  try {
    const resultBody = schemaBodyCreateFolder.safeParse(req.body);
    if (resultBody.success) {
      await req.db.folder.createFolder(resultBody.data);
      res.status(201).json({
        ...resultBody.data,
      });
    } else {
      const error = resultBody.error;
      res.status(400).json(error);
    }
  } catch (error) {
    res.status(500).json({
      message: "Something wrong happen",
    });
  }
};

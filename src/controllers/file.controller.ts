import { Request, Response } from "express";
import { schemaBodyDeleteFile } from "../types/file.types";

export const createFile = async (req: Request, res: Response) => {
  try {
    //const files: Express.Multer.File[] = req.files as Express.Multer.File[]

    return res.json({});
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something wrong happen",
    });
  }
};

export const deleteFiles = async (req: Request, res: Response) => {
  try {
    const bodyResult = schemaBodyDeleteFile.safeParse(req.body);
    if (bodyResult.success) {
      const { keys } = bodyResult.data;
      const result = await req.s3.deleteFiles(keys);
      res.json({
        result,
      });
    } else {
      const error = bodyResult.error;
      res.status(400).json({
        error,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something wrong happen",
    });
  }
};

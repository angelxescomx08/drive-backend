import { Request, Response } from "express";
import { schemaBodyCreateFile } from "../types/file.types";

export const createFile = async (req: Request, res: Response) => {
  try {
    //const bodyResult = schemaBodyCreateFile.safeParse(req.files);
    return res.json(req.files);
    /* if (bodyResult.success) {
      const files = bodyResult.data;
      const result = await Promise.all(
        files.map((file) => req.s3.uploadFile(file))
      );
      console.log(result);
      res.status(201).json(result);  
      console.log({ files }); 
      res.status(201).json({ files });
    } else {
      const error = bodyResult.error;
      return res.status(400).json(error);
    } */
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something wrong happen",
    });
  }
};

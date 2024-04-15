import { Request, Response } from "express";
import {
  schemaBodyCreateFolder,
  schemaParamIdUserGetFolder,
  schemaQueryGetFolders,
} from "../types/folder.types";

export const getFoldersByUserId = async (req: Request, res: Response) => {
  try {
    const paramsResult = schemaParamIdUserGetFolder.safeParse(req.params);
    const queryResult = schemaQueryGetFolders.safeParse(req.query);
    if (paramsResult.success && queryResult.success) {
      const result = await req.db.folder.getRootFolders(
        paramsResult.data.id_user
      );
      res.json(result.rows);
    } else {
      if (!paramsResult.success) {
        const error = paramsResult.error;
        return res.status(400).json(error);
      }
      if (!queryResult.success) {
        const error = queryResult.error;
        return res.status(400).json(error);
      }
    }
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
    console.log(error);
    res.status(500).json({
      message: "Something wrong happen",
    });
  }
};

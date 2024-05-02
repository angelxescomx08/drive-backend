import { Request, Response } from "express";
import {
  schemaBodyCreateFolder,
  schemaParamIdUserGetFolder,
  schemaQueryGetFolders,
} from "../types/folder.types";
import { LibsqlError } from "@libsql/client";
import { folder } from "../db/schema";

export const getFoldersByUserId = async (req: Request, res: Response) => {
  try {
    const paramsResult = schemaParamIdUserGetFolder.safeParse(req.params);
    const queryResult = schemaQueryGetFolders.safeParse(req.query);
    if (paramsResult.success && queryResult.success) {
      const { id_parent } = queryResult.data;
      const result = id_parent
        ? await req.db.folder.getFoldersOfParentFolder(
            paramsResult.data.id_user,
            id_parent
          )
        : await req.db.folder.getRootFolders(paramsResult.data.id_user);
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
      error: "Something wrong happen",
    });
  }
};

export const createFolder = async (req: Request, res: Response) => {
  try {
    const { folder_name, id_user, id_parent } = schemaBodyCreateFolder.parse(
      req.body
    );
    const newFolder = {
      folder_name,
      id_folder: crypto.randomUUID(),
      id_user,
      id_parent,
    };
    await req.db.dbDrizzle.insert(folder).values(newFolder);

    res.status(201).json({
      message: "Folder created",
      folder: newFolder,
    });
  } catch (error) {
    console.log(error);
    if (error instanceof LibsqlError) {
      return res.status(500).json({
        error: error.message,
      });
    }
    res.status(500).json({
      error: "Something wrong happen",
    });
  }
};

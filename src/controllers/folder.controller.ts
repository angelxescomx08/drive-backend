import { Request, Response } from "express";
import {
  schemaBodyCreateFolder,
  schemaQueryGetFolders,
  typeQueryGetFolders,
} from "../types/folder.types";
import { LibsqlError } from "@libsql/client";
import { folder } from "../db/schema";
import { and, eq } from "drizzle-orm";
import { convertToNumber } from "../utils/convert-to-number";

export const getFoldersByUserId = async (req: Request, res: Response) => {
  try {
    const query: typeQueryGetFolders = {
      id_user: req.query.id_user as string,
      id_parent: req.query.id_parent as string | null | undefined,
      limit: convertToNumber(req.query.limit, 10),
      page: convertToNumber(req.query.page, 0),
    };
    const {
      id_user,
      id_parent = null,
      limit,
      page,
    } = schemaQueryGetFolders.parse(query);
    const queries = [eq(folder.id_user, id_user)];
    if (id_parent) {
      queries.push(eq(folder.id_parent, id_parent));
    }
    const result = await req.db.dbDrizzle.query.folder.findMany({
      limit,
      offset: page,
      where: and(...queries),
    });
    res.json(result);
  } catch (error) {
    console.log(error);
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

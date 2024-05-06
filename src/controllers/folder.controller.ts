import { Request, Response, query } from "express";
import {
  schemaBodyCreateFolder,
  schemaBodyUpdateFolder,
  schemaDeleteFolder,
  schemaQueryGetFolders,
  typeBodyUpdateFolder,
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
      id_folder: req.query.id_folder as string | null | undefined,
      limit: convertToNumber(req.query.limit, 10),
      page: convertToNumber(req.query.page, 0),
    };
    const {
      id_user,
      id_parent = null,
      limit,
      page,
      id_folder = null,
    } = schemaQueryGetFolders.parse(query);
    const queries = [eq(folder.id_user, id_user)];
    if (id_parent) {
      queries.push(eq(folder.id_parent, id_parent));
    }
    if (id_folder) {
      queries.push(eq(folder.id_folder, id_folder));
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

export const updateFolder = async (req: Request, res: Response) => {
  try {
    const params = req.params;
    const body = req.body;
    const data: typeBodyUpdateFolder = {
      id_folder: params.id_folder,
      folder_name: body.folder_name,
      id_parent: body.id_parent,
    };
    const { id_folder, folder_name, id_parent } =
      schemaBodyUpdateFolder.parse(data);
    const result = await req.db.dbDrizzle
      .update(folder)
      .set({
        folder_name,
        id_parent,
      })
      .where(eq(folder.id_folder, id_folder))
      .returning({
        id_folder: folder.id_folder,
        folder_name: folder.folder_name,
        id_parent: folder.id_parent,
        id_user: folder.id_user,
      });
    res.status(200).json({
      message: "successfully updated",
      folder: result.at(0),
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

export const deleteFolder = async (req: Request, res: Response) => {
  try {
    const { id_folder } = schemaDeleteFolder.parse(req.params);
    const deletedFolder = await req.db.dbDrizzle
      .delete(folder)
      .where(eq(folder.id_folder, id_folder))
      .returning({
        id_folder: folder.id_folder,
        id_parent: folder.id_parent,
        id_user: folder.id_user,
        folder_name: folder.folder_name,
      });
    res.json({
      message: "successfully deleted",
      folder: deletedFolder.at(0),
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

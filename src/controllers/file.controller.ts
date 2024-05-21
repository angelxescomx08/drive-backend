import { Request, Response } from "express";
import {
  FileS3,
  schemaBodyCreateFile,
  schemaBodyDeleteFile,
  schemaGetFiles,
  typeGetFiles,
} from "../types/file.types";
import { file } from "../db/schema";
import { convertToNumber } from "../utils/convert-to-number";
import { and, eq, like } from "drizzle-orm";

export const getFiles = async (req: Request, res: Response) => {
  try {
    const data: typeGetFiles = {
      id_folder: req.query.id_folder as string,
      file_name: req.query.file_name as string,
      limit: convertToNumber(req.query.limit, 10),
      page: convertToNumber(req.query.page, 0),
    };
    const { id_folder, file_name, limit, page } = schemaGetFiles.parse(data);
    const queries = [];
    if (id_folder) {
      queries.push(eq(file.id_folder, id_folder));
    }
    if (file_name) {
      queries.push(like(file.file_name, `%${file_name}%`));
    }

    const result = await req.db.dbDrizzle.query.file.findMany({
      where: and(...queries),
      limit,
      offset: page,
    });

    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something wrong happen",
    });
  }
};

export const createFile = async (req: Request, res: Response) => {
  try {
    const fileS3: FileS3[] = req.files as unknown as FileS3[];

    const { file_name, id_folder = null } = schemaBodyCreateFile.parse(
      req.body
    );

    const result = await req.db.dbDrizzle
      .insert(file)
      .values({
        aws_key: fileS3.at(0)!.key,
        file_name: file_name,
        id_file: crypto.randomUUID(),
        url: fileS3.at(0)!.location,
        id_folder: id_folder,
      })
      .returning({
        id_file: file.id_file,
        id_folder: file.id_folder,
        file_name: file.file_name,
        url: file.url,
        aws_key: file.aws_key,
      });

    res.json({
      message: "File successfully created",
      file: result.at(0),
    });
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

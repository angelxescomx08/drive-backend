import { Request, Response } from "express";
import { schemaQueryGetUsers } from "../types/users.type";
import { convertToNumber } from "../utils/convert-to-number";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const { page, per_page } = schemaQueryGetUsers.parse({
      page: convertToNumber(req.query.page, 0),
      per_page: convertToNumber(req.query.per_page, 10),
    });
    const result = await req.db.dbDrizzle.query.user.findMany({
      columns: {
        email: true,
        id_user: true,
      },
      limit: per_page!,
      offset: page!,
    });
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Something wrong happen",
    });
  }
};

import { Request, Response } from "express";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const db = req.db;
    const users = await db.user.getUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({
      message: "Something wrong happen",
    });
  }
};

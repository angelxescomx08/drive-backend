import { Request, Response } from "express";

export const createFile = async (req: Request, res: Response) => {
  try {
    return res.json(req.files);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something wrong happen",
    });
  }
};

export const deleteFiles = async (req: Request, res: Response) => {};

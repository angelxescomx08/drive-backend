import { Response, Request } from "express";
import {
  schemaAuthBodyLogin,
  schemaAuthBodyRegister,
} from "../types/auth.types";
import { signToken } from "../utils/token";
import { user } from "../db/schema";

export const login = async (req: Request, res: Response) => {
  try {
    const resultBody = schemaAuthBodyLogin.safeParse(req.body);

    if (resultBody.success) {
      const body = resultBody.data;
      const result = await req.db.user.verifyLogin(body);
      if (result.success) {
        const token = signToken({
          email: result.user!.email as string,
          id_user: result.user!.id_user as string,
        });
        res.json({
          ...result,
          token,
        });
      } else {
        res.json({
          ...result,
          message: "Invalid credentials",
        });
      }
    } else {
      const error = resultBody.error;
      res.status(400).json(error);
    }
  } catch (error) {
    res.status(500).json({
      message: "Something wrong happen",
    });
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const newUser = schemaAuthBodyRegister.parse(req.body);
    const result = await req.db.dbDrizzle.insert(user).values(newUser);
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something wrong happen",
    });
  }
};

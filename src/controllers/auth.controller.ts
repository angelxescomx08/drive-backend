import { Response, Request } from "express";
import { schemaAuthBodyLogin, typeAuthBodyRegister } from "../types/auth.types";
import { signToken } from "../utils/token";
import { user } from "../db/schema";
import bcrypt from "bcryptjs";
import { LibsqlError } from "@libsql/client";
import { eq } from "drizzle-orm";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = schemaAuthBodyLogin.parse(req.body);

    const result = await req.db.dbDrizzle.query.user.findFirst({
      where: eq(user.email, email),
    });

    if (!result) {
      return res.status(400).json({
        error: "invalid credentials",
      });
    }

    const { id_user, password: hash } = result;
    const valid = bcrypt.compareSync(password, hash);

    if (!valid) {
      return res.status(401).json({
        error: "invalid credentials",
      });
    }

    const token = signToken({
      email,
      id_user,
    });

    res.json({
      message: "welcomed",
      token,
      user: {
        email,
        id_user,
      },
    });
  } catch (error) {
    res.status(500).json({
      error: "Something wrong happen",
    });
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = schemaAuthBodyLogin.parse(req.body);
    const hashPassword = bcrypt.hashSync(password);
    const newUser: typeAuthBodyRegister = {
      email,
      password: hashPassword,
      id_user: crypto.randomUUID(),
    };
    await req.db.dbDrizzle.insert(user).values({
      ...newUser,
    });
    res.status(201).json({
      message: "user created",
      user: {
        id_user: newUser.id_user,
        email: newUser.email,
      },
    });
  } catch (error: unknown | LibsqlError) {
    if (error instanceof LibsqlError) {
      console.log(error);
      return res.status(400).json({
        error: "email is already used",
      });
    }
    return res.status(500).json({
      error: "Something wrong happen",
    });
  }
};

import { Router } from "express";
import {
  schemaAuthBodyLogin,
  schemaAuthBodyRegister,
} from "../types/auth.types";

const authRouter = Router();

authRouter.post("/login", async (req, res) => {
  try {
    const resultBody = schemaAuthBodyLogin.safeParse(req.body);

    if (resultBody.success) {
      const body = resultBody.data;
      const result = await req.db.user.verifyLogin(body);
      res.json({
        ...result,
      });
    } else {
      const error = resultBody.error;
      res.status(400).json(error);
    }
  } catch (error) {
    res.status(500).json({
      message: "Something wrong happen",
    });
  }
});

authRouter.post("/register", async (req, res) => {
  try {
    const resultBody = schemaAuthBodyRegister.safeParse(req.body);

    if (resultBody.success) {
      const body = resultBody.data;
      await req.db.user.createUser(body);
      res.status(201).json({
        email: body.email,
        id_user: body.id_user,
      });
    } else {
      const error = resultBody.error;
      res.status(400).json(error);
    }
  } catch (error) {
    res.status(500).json({
      message: "Something wrong happen",
    });
  }
});

export default authRouter;

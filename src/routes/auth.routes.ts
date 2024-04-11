import { Router } from "express";
import {
  schemaAuthBodyLogin,
  schemaAuthBodyRegister,
} from "../types/auth.types";

const authRouter = Router();

authRouter.post("/login", (req, res) => {
  try {
    const resultBody = schemaAuthBodyLogin.safeParse(req.body);

    if (resultBody.success) {
      const body = resultBody.data;
      res.json({
        ...body,
      });
    } else {
      const error = resultBody.error;
      res.status(400).json(error);
    }
  } catch (error) {}
});

authRouter.post("/register", async (req, res) => {
  try {
    const resultBody = schemaAuthBodyRegister.safeParse(req.body);

    if (resultBody.success) {
      const body = resultBody.data;
      await req.db.user.createUser(body);
      res.status(201).json({
        email: body.email,
        id: body.id,
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

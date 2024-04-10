import { Router } from "express";
import { schemaAuthBodyLogin } from "../types/auth.types";
import { zodError } from "../constants/zod.constants";

const authRouter = Router();

authRouter.post("/login", (req, res) => {
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
});

export default authRouter;

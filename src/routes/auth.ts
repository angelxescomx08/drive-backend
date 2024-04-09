import { Router } from "express";

const authRouter = Router();

authRouter.get("/login", (req, res) => {
  res.json({
    message: "Hello world",
  });
});

export default authRouter;

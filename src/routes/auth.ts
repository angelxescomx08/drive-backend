import { Router } from "express";

const authRouter = Router();

authRouter.post("/login", (req, res) => {
  const body = req.body;
  res.json({
    ...body,
  });
});

export default authRouter;

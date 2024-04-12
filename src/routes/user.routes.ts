import { Router } from "express";

const userRouter = Router();

userRouter.get("/", async (req, res) => {
  try {
    const db = req.db;
    const users = await db.user.getUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({
      message: "Something wrong happen",
    });
  }
});

export default userRouter;

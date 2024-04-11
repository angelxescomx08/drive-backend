import { Router } from "express";

const userRouter = Router();

userRouter.get("/", async (req, res) => {
  try {
    const db = req.db;
    const users = await db.user.getUsers();
    res.json(users);
  } catch (err) {
    console.log(err);
    res.json({
      message: "Error",
    });
  }
});

export default userRouter;

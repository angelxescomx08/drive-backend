import { Router } from "express";
import { getUsers } from "../controllers/user.controller";
import { validateQueryUserMiddleware } from "../middlewares/user.middleware";

const userRouter = Router();

userRouter.get("/", [validateQueryUserMiddleware], getUsers);

export default userRouter;

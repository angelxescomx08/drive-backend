import { Router } from "express";
import { login, register } from "../controllers/auth.controller";
import { registerBodyMiddleware } from "../middlewares/auth.middleware";

const authRouter = Router();

authRouter.post("/login", login);

authRouter.post("/register", [registerBodyMiddleware], register);

export default authRouter;

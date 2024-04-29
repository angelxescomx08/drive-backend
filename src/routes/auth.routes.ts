import { Router } from "express";
import { login, register } from "../controllers/auth.controller";
import { validateBodyMiddleware } from "../middlewares/auth.middleware";

const authRouter = Router();

authRouter.post("/login", [validateBodyMiddleware], login);

authRouter.post("/register", [validateBodyMiddleware], register);

export default authRouter;

import { Router } from "express";
import { createFile } from "../controllers/file.controller";

const fileRouter = Router();

fileRouter.post("/", createFile);

export default fileRouter;

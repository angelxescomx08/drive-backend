import { Router } from "express";
import { createFile } from "../controllers/file.controller";
import { multerUploadMiddleware } from "../middlewares/s3.middleware";

const fileRouter = Router();

fileRouter.post("/", multerUploadMiddleware, createFile);

export default fileRouter;

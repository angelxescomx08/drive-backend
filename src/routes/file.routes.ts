import { Router } from "express";
import { createFile, deleteFiles } from "../controllers/file.controller";
import { multerUploadMiddleware } from "../middlewares/s3.middleware";

const fileRouter = Router();

fileRouter.post("/", multerUploadMiddleware, createFile);

fileRouter.delete("/", deleteFiles);

export default fileRouter;

import { Router } from "express";
import { createFile, deleteFiles } from "../controllers/file.controller";
import { multerUploadMiddleware } from "../middlewares/s3.middleware";
import { validateBodyCreateFileMiddleware } from "../middlewares/file.middleware";

const fileRouter = Router();

//fileRouter.post("/", multerUploadMiddleware, createFile);
fileRouter.post("/", [validateBodyCreateFileMiddleware], createFile);

fileRouter.delete("/", deleteFiles);

export default fileRouter;

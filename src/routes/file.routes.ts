import { Router } from "express";
import {
  createFile,
  deleteFiles,
  getFiles,
  updateFile,
} from "../controllers/file.controller";
import {
  multerErrorHandler,
  multerUploadMiddleware,
} from "../middlewares/s3.middleware";
import {
  validateBodyCreateFileMiddleware,
  validateGetFilesMiddleware,
  validateUpdateFile,
} from "../middlewares/file.middleware";

const fileRouter = Router();

fileRouter.get("/", [validateGetFilesMiddleware], getFiles);

fileRouter.post(
  "/",
  [
    multerUploadMiddleware,
    multerErrorHandler,
    validateBodyCreateFileMiddleware,
  ],
  createFile
);

fileRouter.delete("/", deleteFiles);

fileRouter.put("/:id_file", [validateUpdateFile], updateFile);

export default fileRouter;

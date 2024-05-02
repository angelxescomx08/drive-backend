import { Router } from "express";
import {
  createFolder,
  getFoldersByUserId,
} from "../controllers/folder.controller";
import {
  validateBodyCreateFolderMiddleware,
  validateQueryGetFoldersMiddleware,
} from "../middlewares/folder.middleware";

const folderRouter = Router();

folderRouter.get("/", [validateQueryGetFoldersMiddleware], getFoldersByUserId);
folderRouter.post("/", [validateBodyCreateFolderMiddleware], createFolder);

export default folderRouter;

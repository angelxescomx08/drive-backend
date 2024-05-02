import { Router } from "express";
import {
  createFolder,
  getFoldersByUserId,
} from "../controllers/folder.controller";
import { validateBodyCreateFolderMiddleware } from "../middlewares/folder.middleware";

const folderRouter = Router();

folderRouter.get("/user-folders/:id_user", getFoldersByUserId);
folderRouter.post("/", [validateBodyCreateFolderMiddleware], createFolder);

export default folderRouter;

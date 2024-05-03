import { Router } from "express";
import {
  createFolder,
  getFoldersByUserId,
  updateFolder,
} from "../controllers/folder.controller";
import {
  validateBodyCreateFolderMiddleware,
  validateBodyUpdateFoldersMiddleware,
  validateQueryGetFoldersMiddleware,
} from "../middlewares/folder.middleware";

const folderRouter = Router();

folderRouter.get("/", [validateQueryGetFoldersMiddleware], getFoldersByUserId);
folderRouter.post("/", [validateBodyCreateFolderMiddleware], createFolder);
folderRouter.put(
  "/:id_folder",
  [validateBodyUpdateFoldersMiddleware],
  updateFolder
);

export default folderRouter;

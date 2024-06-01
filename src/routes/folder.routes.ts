import { Router } from "express";
import {
  createFolder,
  deleteFolder,
  getFoldersByUserId,
  updateFolder,
} from "../controllers/folder.controller";
import {
  validateBodyCreateFolderMiddleware,
  validateBodyUpdateFoldersMiddleware,
  validateIdFolder,
  validateQueryGetFoldersMiddleware,
} from "../middlewares/folder.middleware";
import { validateTokenMiddleware } from "../middlewares/auth.middleware";

const folderRouter = Router();

folderRouter.get(
  "/",
  [validateTokenMiddleware, validateQueryGetFoldersMiddleware],
  getFoldersByUserId
);

folderRouter.post("/", [validateBodyCreateFolderMiddleware], createFolder);

folderRouter.put(
  "/:id_folder",
  [validateBodyUpdateFoldersMiddleware],
  updateFolder
);

folderRouter.delete("/:id_folder", [validateIdFolder], deleteFolder);

export default folderRouter;

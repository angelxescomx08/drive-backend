import { Router } from "express";
import {
  createFolder,
  getFoldersByUserId,
} from "../controllers/folder.controller";

const folderRouter = Router();

folderRouter.get("/:id_user", getFoldersByUserId);
folderRouter.post("/", createFolder);

export default folderRouter;

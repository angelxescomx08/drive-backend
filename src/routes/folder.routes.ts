import { Router } from "express";
import { createFolder } from "../controllers/folder.controller";

const folderRouter = Router();

folderRouter.post("/", createFolder);

export default folderRouter;

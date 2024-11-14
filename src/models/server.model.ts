import express, { Express } from "express";
import cors from "cors";

import authRouter from "../routes/auth.routes";
import userRouter from "../routes/user.routes";

import { Database } from "../models/db.model";
import { addDatabaseToRequest } from "../middlewares/db.middleware";
import folderRouter from "../routes/folder.routes";
import fileRouter from "../routes/file.routes";
import { S3 } from "./s3.model";
import { addS3ToRequest } from "../middlewares/s3.middleware";

export class Server {
  private app!: Express;
  private port!: number;
  private db!: Database;
  private s3!: S3;

  constructor() {
    this.app = express();
    this.port = 80;
    this.db = new Database();
    this.s3 = new S3();

    this.middlewares();
    this.applyRoutes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(addDatabaseToRequest(this.db));
    this.app.use(addS3ToRequest(this.s3));
  }

  applyRoutes() {
    this.app.get("/", (req, res) => {
      res.json({ message: "Hello World" });
    });
    this.app.use("/auth", authRouter);
    this.app.use("/user", userRouter);
    this.app.use("/folder", folderRouter);
    this.app.use("/file", fileRouter);
  }

  getApp() {
    return this.app;
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}

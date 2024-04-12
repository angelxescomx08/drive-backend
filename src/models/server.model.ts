import express, { Express } from "express";
import cors from "cors";

import authRouter from "../routes/auth.routes";
import userRouter from "../routes/user.routes";

import { Database } from "../models/db.model";
import { addDatabaseToRequest } from "../middlewares/db.middleware";
import folderRouter from "../routes/folder.routes";

export class Server {
  private app!: Express;
  private port!: number;
  private db!: Database;

  constructor() {
    this.app = express();
    this.port = 3000;
    this.db = new Database();

    this.middlewares();
    this.applyRoutes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(addDatabaseToRequest(this.db));
  }

  applyRoutes() {
    this.app.use("/auth", authRouter);
    this.app.use("/user", userRouter);
    this.app.use("/folder", folderRouter);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}

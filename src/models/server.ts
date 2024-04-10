import express, { Express } from "express";
import authRouter from "../routes/auth";
import { Database } from "../db/db";

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
    this.app.use(express.json());
  }

  applyRoutes() {
    this.app.use("/auth", authRouter);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}

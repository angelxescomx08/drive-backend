import express, { Express } from "express";
import authRouter from "../routes/auth";

export class Server {
  private app!: Express;
  private port!: number;

  constructor() {
    this.app = express();
    this.port = 3000;

    this.aplyRoutes();
  }

  aplyRoutes() {
    this.app.use("/auth", authRouter);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}

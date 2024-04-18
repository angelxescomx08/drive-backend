import express, { Express } from "express";
import cors from "cors";
import multer from "multer";
import multerS3 from "multer-s3";

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
    this.port = 3000;
    this.db = new Database();
    this.s3 = new S3();

    this.middlewares();
    this.applyRoutes();
  }

  middlewares() {
    const upload = multer({
      storage: multerS3({
        s3: this.s3.getS3Client(),
        acl: "public-read",
        bucket: process.env.AWS_BUCKET_NAME,
        metadata: function (req, file, cb) {
          cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
          const fileExtension = file.originalname.split(".").pop();
          const fileName = `${Date.now().toString()}-${
            file.fieldname
          }.${fileExtension}`;
          cb(null, fileName);
        },
      }),
    });

    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(upload.array("files"));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(addDatabaseToRequest(this.db));
    this.app.use(addS3ToRequest(this.s3));
  }

  applyRoutes() {
    this.app.use("/auth", authRouter);
    this.app.use("/user", userRouter);
    this.app.use("/folder", folderRouter);
    this.app.use("/file", fileRouter);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}

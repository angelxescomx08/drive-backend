import { Database } from "./models/db.model";
import { S3 } from "./models/s3.model";

// Extiende la interfaz Request de Express
declare global {
  namespace Express {
    interface Request {
      db: Database;
      s3: S3;
    }
  }
}

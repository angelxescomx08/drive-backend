import { Database } from "./models/db.model";

// Extiende la interfaz Request de Express
declare global {
  namespace Express {
    interface Request {
      db: Database;
    }
  }
}

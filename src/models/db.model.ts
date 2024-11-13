import { Client, createClient } from "@libsql/client";
import { LibSQLDatabase } from "drizzle-orm/libsql";
import { dbDrizzle } from "../db/db";
import * as schema from "../db/schema";
import { environment } from "../config/environment";

export class Database {
  private client!: Client;

  public dbDrizzle!: LibSQLDatabase<typeof schema>;

  constructor() {
    this.createClient();
    this.dbDrizzle = dbDrizzle;
  }

  createClient() {
    this.client = createClient({
      url: environment.URL_DATABASE,
      authToken: environment.DB_AUTH_TOKEN,
    });
  }
}

import { Client, createClient } from "@libsql/client";
import { User } from "./user.model";
import { Folder } from "./folder.model";
import { LibSQLDatabase } from "drizzle-orm/libsql";
import { dbDrizzle } from "../db/db";
import * as schema from "../db/schema";
import { environment } from "../config/environment";

export class Database {
  private client!: Client;
  public user!: User;
  public folder!: Folder;

  public dbDrizzle!: LibSQLDatabase<typeof schema>;

  constructor() {
    this.createClient();
    this.user = new User(this.client);
    this.folder = new Folder(this.client);
    this.dbDrizzle = dbDrizzle;
  }

  createClient() {
    this.client = createClient({
      url: environment.URL_DATABASE,
      authToken: environment.DB_AUTH_TOKEN,
    });
  }
}

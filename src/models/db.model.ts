import { Client, createClient } from "@libsql/client";
import { User } from "./user.model";
import { Folder } from "./folder.model";
import { LibSQLDatabase } from "drizzle-orm/libsql";
import { dbDrizzle } from "../db/db";

export class Database {
  private client!: Client;
  public user!: User;
  public folder!: Folder;

  public dbDrizzle!: LibSQLDatabase<Record<string, never>>;

  constructor() {
    this.createClient();
    this.user = new User(this.client);
    this.folder = new Folder(this.client);
    this.dbDrizzle = dbDrizzle;
  }

  createClient() {
    this.client = createClient({
      url: process.env.URL_DATABASE!,
      authToken: process.env.DB_AUTH_TOKEN!,
    });
  }
}

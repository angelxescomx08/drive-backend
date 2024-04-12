import { Client, createClient } from "@libsql/client";
import { User } from "./user.model";
import { Folder } from "./folder.model";

export class Database {
  private client!: Client;
  public user!: User;
  public folder!: Folder;

  constructor() {
    this.createClient();
    this.user = new User(this.client);
    this.folder = new Folder(this.client);
  }

  createClient() {
    this.client = createClient({
      url: process.env.URL_DATABASE!,
      authToken: process.env.DB_AUTH_TOKEN!,
    });
  }
}

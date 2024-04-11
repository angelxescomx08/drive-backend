import { Client, createClient } from "@libsql/client";
import { User } from "./user.model";

export class Database {
  private client!: Client;
  public user!: User;

  constructor() {
    this.createClient();
    this.user = new User(this.client);
  }

  createClient() {
    this.client = createClient({
      url: process.env.URL_DATABASE!,
      authToken: process.env.DB_AUTH_TOKEN!,
    });
  }
}

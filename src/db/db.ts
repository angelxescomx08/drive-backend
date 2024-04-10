import { Client, createClient } from "@libsql/client";

export class Database {
  private client!: Client;

  constructor() {
    this.createClient();
    this.createTables();
  }

  createClient() {
    this.client = createClient({
      url: process.env.URL_DATABASE!,
      authToken: process.env.DB_AUTH_TOKEN!,
    });
  }

  async createTables() {
    const result = await this.client.batch(
      [
        {
          sql: "CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY, email TEXT, password TEXT)",
          args: [],
        },
      ],
      "write"
    );
  }

  async readUsers() {
    const result = await this.client.execute({
      sql: "SELECT * FROM users",
      args: [],
    });

    return result;
  }
}

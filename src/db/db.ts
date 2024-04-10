import { Client, createClient } from "@libsql/client";

class Database {
  client: Client;

  constructor() {
    this.client = createClient({
      url: process.env.URL_DATABASE!,
      authToken: process.env.DB_AUTH_TOKEN!,
    });
  }
}

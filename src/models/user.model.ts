import { Client } from "@libsql/client";

export class User {
  private client!: Client;

  constructor(client: Client) {
    this.client = client;
  }

  async getUsers() {
    const result = await this.client.execute("SELECT * FROM user");
    return result.rows;
  }
}

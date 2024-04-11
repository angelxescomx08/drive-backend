import { Client } from "@libsql/client";
import { typeAuthBodyRegister } from "../types/auth.types";

export class User {
  private client!: Client;

  constructor(client: Client) {
    this.client = client;
  }

  async getUsers() {
    const result = await this.client.execute("SELECT id_user,email FROM user");
    return result.rows;
  }

  async createUser(user: typeAuthBodyRegister) {
    const result = await this.client.batch(
      [
        {
          sql: "INSERT INTO user VALUES (?,?,?)",
          args: [user.id, user.email, user.password],
        },
      ],
      "write"
    );

    return result;
  }
}

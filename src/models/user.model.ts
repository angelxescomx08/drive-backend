import { Client } from "@libsql/client";
import { typeAuthBodyLogin, typeAuthBodyRegister } from "../types/auth.types";

export class User {
  private client!: Client;

  constructor(client: Client) {
    this.client = client;
  }

  async verifyLogin(user: typeAuthBodyLogin) {
    const result = await this.client.execute({
      sql: "SELECT * FROM user WHERE email = ? AND password = ?",
      args: [user.email, user.password],
    });
    return {
      success: result.rows.length > 0,
      user:
        result.rows.length > 0
          ? {
              id_user: result.rows[0].id_user,
              email: result.rows[0].email,
            }
          : undefined,
    };
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
          args: [user.id_user, user.email, user.password],
        },
      ],
      "write"
    );

    return result;
  }
}

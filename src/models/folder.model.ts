import { Client } from "@libsql/client";

export class Folder {
  private client!: Client;

  constructor(client: Client) {
    this.client = client;
  }
}

import { Client } from "@libsql/client";
import { typeBodyCreateFolder } from "../types/folder.types";

export class Folder {
  private client!: Client;

  constructor(client: Client) {
    this.client = client;
  }

  async getRootFolders(id_user: string) {
    const result = await this.client.execute({
      sql: "SELECT * FROM folder WHERE id_user = ? AND id_parent IS NULL",
      args: [id_user],
    });
    return result;
  }

  async getFoldersOfParentFolder(id_user: string, id_parent_folder: string) {
    const result = await this.client.execute({
      sql: "SELECT * FROM folder WHERE id_user = ? AND id_parent = ?",
      args: [id_user, id_parent_folder],
    });
    return result;
  }

  async createFolder(folder: typeBodyCreateFolder) {
    const result = await this.client.batch(
      [
        {
          sql: "INSERT INTO folder(id_folder,id_parent,id_user,folder_name,created_at) VALUES (?,?,?,?,?)",
          args: [
            folder.id_folder,
            folder.id_parent || null,
            folder.id_user,
            folder.folder_name,
            folder.created_at,
          ],
        },
      ],
      "write"
    );
    return result;
  }
}

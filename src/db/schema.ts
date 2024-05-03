import {
  AnySQLiteColumn,
  index,
  sqliteTable,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";

export const user = sqliteTable(
  "user",
  {
    id_user: text("id_user", { length: 36 }).primaryKey(),
    email: text("email").unique().notNull(),
    password: text("password", { length: 60 }).notNull(),
  },
  (table) => {
    return {
      email_idx: uniqueIndex("email_idx").on(table.email),
    };
  }
);

export const folder = sqliteTable(
  "folder",
  {
    id_folder: text("id_folder", { length: 36 }).primaryKey(),
    id_parent: text("id_parent", { length: 36 }).references(
      (): AnySQLiteColumn => folder.id_folder,
      { onDelete: "cascade" }
    ),
    id_user: text("id_user", { length: 36 })
      .references(() => user.id_user, { onDelete: "cascade" })
      .notNull(),
    folder_name: text("folder_name").notNull(),
  },
  (table) => {
    return {
      id_parent_idx: index("id_parent_idx").on(table.id_parent),
    };
  }
);

export const file = sqliteTable(
  "file",
  {
    id_file: text("id_file", { length: 36 }).primaryKey(),
    id_folder: text("id_folder", { length: 36 }).references(
      () => folder.id_folder,
      { onDelete: "cascade" }
    ),
    file_name: text("file_name").notNull(),
    url: text("url").notNull(),
    aws_key: text("aws_key").notNull(),
  },
  (table) => {
    return {
      id_folder_idx: index("id_folder_idx").on(table.id_folder),
    };
  }
);

export type InsertUser = typeof user.$inferInsert;
export type InsertFolder = typeof folder.$inferInsert;

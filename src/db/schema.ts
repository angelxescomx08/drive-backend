import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const user = sqliteTable("user", {
  id_user: text("id_user", { length: 36 }).primaryKey(),
  email: text("email").unique().notNull(),
  password: text("password", { length: 64 }).notNull(),
});

export type InsertUser = typeof user.$inferInsert;

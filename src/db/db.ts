import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";

const client = createClient({
  url: process.env.URL_DATABASE!,
  authToken: process.env.DB_AUTH_TOKEN!,
});

export const dbDrizzle = drizzle(client);

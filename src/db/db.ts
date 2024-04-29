import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "./schema";

const client = createClient({
  url: process.env.URL_DATABASE!,
  authToken: process.env.DB_AUTH_TOKEN!,
});

export const dbDrizzle = drizzle(client, { schema });

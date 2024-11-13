import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "./schema";
import { environment } from "../config/environment";

const client = createClient({
  url: environment.URL_DATABASE,
  authToken: environment.DB_AUTH_TOKEN,
});

export const dbDrizzle = drizzle(client, { schema });

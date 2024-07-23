import type { Config } from "drizzle-kit";
import { environment } from './src/config/environment';

export default {
  schema: "./src/db/schema.ts",
  out: "./migrations",
  driver: "turso",
  dbCredentials: {
    url: environment.URL_DATABASE,
    authToken: environment.DB_AUTH_TOKEN,
  },
  verbose: true,
} satisfies Config;

import type { Config } from "drizzle-kit";
import dotenv from "dotenv";

const { parsed } = dotenv.config({
  path: "./.env.development",
});

export default {
  schema: "./src/db/schema.ts",
  out: "./migrations",
  driver: "turso",
  dbCredentials: {
    //url: process.env.URL_DATABASE!,
    //authToken: process.env.DB_AUTH_TOKEN!,
    url: parsed!.URL_DATABASE!,
  },
  verbose: true,
} satisfies Config;

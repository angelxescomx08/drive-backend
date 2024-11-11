import * as env from 'env-var';
import { config } from 'dotenv';
import path from 'path';

// Detectar el entorno
const NODE_ENV = process.env.NODE_ENV

let envPath = '';

if (NODE_ENV === 'development') {
  envPath = '.env.development';
}

if (NODE_ENV === 'production') {
  envPath = '.env';
}

const envPathResolved = path.resolve(__dirname, "../..", envPath)

config({ path: envPathResolved, override: true });

export const environment = {
  URL_DATABASE: env.get("URL_DATABASE").required().asString(),
  DB_AUTH_TOKEN: env.get("DB_AUTH_TOKEN").asString(),
  JWT_PASSWORD: env.get("JWT_PASSWORD").required().asString(),
  AWS_ACCESS_KEY: env.get("AWS_ACCESS_KEY").required().asString(),
  AWS_SECRET_ACCESS_KEY: env.get("AWS_SECRET_ACCESS_KEY").required().asString(),
  AWS_BUCKET_REGION: env.get("AWS_BUCKET_REGION").required().asString(),
  AWS_BUCKET_NAME: env.get("AWS_BUCKET_NAME").required().asString(),
};
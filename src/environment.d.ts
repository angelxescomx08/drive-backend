// environment.d.ts

declare namespace NodeJS {
  interface ProcessEnv {
    URL_DATABASE: string;
    DB_AUTH_TOKEN: string;
    JWT_PASSWORD: string;
    AWS_ACCESS_KEY: string;
    AWS_SECRET_ACCESS_KEY: string;
    AWS_BUCKET_REGION: string;
    AWS_BUCKET_NAME: string;
  }
}

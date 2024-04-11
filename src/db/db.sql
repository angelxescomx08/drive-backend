CREATE TABLE "user" (
  "id_user" varchar(36) PRIMARY KEY,
  "email" varchar UNIQUE,
  "password" varchar(64)
);

CREATE TABLE "folder" (
  "id_folder" varchar(64) PRIMARY KEY,
  "id_parent" varchar(64),
  "id_user" varchar(64),
  "created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY ("id_user") REFERENCES "user" ("id_user"),
  FOREIGN KEY ("id_parent") REFERENCES "folder" ("id_folder")
);

CREATE TABLE "file" (
  "id_file" varchar(64) PRIMARY KEY,
  "id_folder" varchar(64),
  "updated_at" timestamp DEFAULT CURRENT_TIMESTAMP,
  "url" varchar,
  FOREIGN KEY ("id_folder") REFERENCES "folder" ("id_folder")
);
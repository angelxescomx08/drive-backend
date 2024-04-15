CREATE TABLE "user" (
  "id_user" varchar(36) PRIMARY KEY,
  "email" varchar UNIQUE NOT NULL,
  "password" varchar(64) NOT NULL
);

CREATE TABLE "folder" (
  "id_folder" varchar(64) PRIMARY KEY,
  "id_parent" varchar(64),
  "id_user" varchar(64) NOT NULL,
  "folder_name" varchar NOT NULL,
  "created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
  FOREIGN KEY ("id_user") REFERENCES "user" ("id_ user"),
  FOREIGN KEY ("id_parent") REFERENCES "folder" ("id_folder")
);

CREATE TABLE "file" (
  "id_file" varchar(64) PRIMARY KEY,
  "id_folder" varchar(64),
  "created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
  "file_name" varchar NOT NULL,
  "url" varchar NOT NULL,
  FOREIGN KEY ("id_folder") REFERENCES "folder" ("id_folder")
);

CREATE INDEX idx_user_email_password ON "user" ("email","password");

CREATE INDEX idx_folder_id_user ON "folder" ("id_user");

CREATE INDEX idx_folder_id_user_id_parent ON "folder" ("id_user","id_parent");

CREATE INDEX idx_file_id_folder ON "file" ("id_folder");
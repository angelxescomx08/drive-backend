import { z } from "zod";

export const schemaBodyCreateFile = z.object({
  id_folder: z.string().uuid().nullish(),
  file_name: z.string(),
});

export type typeBodyCreateFile = z.infer<typeof schemaBodyCreateFile>;

export const schemaBodyDeleteFile = z.object({
  keys: z.array(z.string()),
});

export type typeBodyDeleteFile = z.infer<typeof schemaBodyDeleteFile>;

export const schemaGetFiles = z.object({
  limit: z.number().int().positive().optional(),
  page: z.number().int().nonnegative().optional(),
  id_folder: z.string().uuid().nullish(),
  file_name: z.string().nullish(),
});

export type typeGetFiles = z.infer<typeof schemaGetFiles>;

export interface FileS3 {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  bucket: string;
  key: string;
  acl: string;
  contentType: string;
  contentDisposition: null;
  contentEncoding: null;
  storageClass: string;
  serverSideEncryption: null;
  metadata: Metadata;
  location: string;
  etag: string;
}

export interface Metadata {
  fieldName: string;
}

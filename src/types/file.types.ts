import { z } from "zod";

export const schemaBodyCreateFile = z.object({
  id_user: z.string().uuid(),
  id_folder: z.string().uuid().nullish(),
  file_name: z.string(),
});

export type typeBodyCreateFile = z.infer<typeof schemaBodyCreateFile>;

export const schemaBodyDeleteFile = z.object({
  keys: z.array(z.string()),
});

export type typeBodyDeleteFile = z.infer<typeof schemaBodyDeleteFile>;

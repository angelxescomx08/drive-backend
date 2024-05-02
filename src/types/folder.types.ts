import z from "zod";

export const schemaBodyCreateFolder = z.object({
  id_parent: z.string().uuid().nullish(),
  id_user: z.string().uuid(),
  folder_name: z.string(),
});

export type typeBodyCreateFolder = z.infer<typeof schemaBodyCreateFolder>;

export const schemaQueryGetFolders = z.object({
  limit: z.number().int().positive().optional(),
  page: z.number().int().nonnegative().optional(),
  id_parent: z.string().uuid().nullish(),
  id_user: z.string().uuid(),
});

export type typeQueryGetFolders = z.infer<typeof schemaQueryGetFolders>;

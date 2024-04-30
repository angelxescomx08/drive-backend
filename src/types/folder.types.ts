import z from "zod";

export const schemaBodyCreateFolder = z.object({
  id_folder: z.string().uuid(),
  id_parent: z.string().uuid().optional(),
  id_user: z.string().uuid(),
  folder_name: z.string(),
});

export type typeBodyCreateFolder = z.infer<typeof schemaBodyCreateFolder>;

export const schemaParamIdUserGetFolder = schemaBodyCreateFolder.pick({
  id_user: true,
});

export type typeParamIdUserGetFolder = z.infer<
  typeof schemaParamIdUserGetFolder
>;

export const schemaQueryGetFolders = z.object({
  limit: z.string().regex(/^\d+$/).optional(),
  page: z.string().regex(/^\d+$/).optional(),
  id_parent: z.string().uuid().optional(),
});

export type typeQueryGetFolders = z.infer<typeof schemaQueryGetFolders>;

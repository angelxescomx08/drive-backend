import z from "zod";

export const schemaBodyCreateFolder = z.object({
  id_folder: z.string().uuid(),
  id_parent: z.string().uuid().optional(),
  id_user: z.string().uuid(),
  folder_name: z.string(),
  created_at: z.number(),
});

export type typeBodyCreateFolder = z.infer<typeof schemaBodyCreateFolder>;

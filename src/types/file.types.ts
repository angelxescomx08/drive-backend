import { z } from "zod";

export const schemaBodyCreateFile = z.object({
  files: z.array(z.instanceof(File)).min(1),
});

export type typeBodyCreateFile = z.infer<typeof schemaBodyCreateFile>;

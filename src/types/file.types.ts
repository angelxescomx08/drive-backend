import { z } from "zod";

export const schemaFile = z.object({
  fieldname: z.string(),
  originalname: z.string(),
  encoding: z.string(),
  mimetype: z.string(),
  size: z.number(),
  // Puedes agregar más propiedades según sea necesario
});

// Define un esquema para un array de archivos
export const schemaBodyCreateFile = z.array(schemaFile);

export type typeBodyCreateFile = z.infer<typeof schemaBodyCreateFile>;

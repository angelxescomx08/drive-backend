import z from "zod";

export const schemaAuthBodyLogin = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type typeAuthBodyLogin = z.infer<typeof schemaAuthBodyLogin>;

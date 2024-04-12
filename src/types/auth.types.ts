import z from "zod";

export const schemaAuthBodyLogin = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type typeAuthBodyLogin = z.infer<typeof schemaAuthBodyLogin>;

export const schemaAuthBodyRegister = z.object({
  id_user: z.string().uuid(),
  email: z.string().email(),
  password: z.string(),
});

export type typeAuthBodyRegister = z.infer<typeof schemaAuthBodyRegister>;

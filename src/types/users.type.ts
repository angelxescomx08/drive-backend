import z from "zod";

const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  password: z.string(),
});

export type UserType = z.infer<typeof UserSchema>;

export const schemaQueryGetUsers = z.object({
  page: z.number().nonnegative().int().nullish(),
  per_page: z.number().positive().int().nullish(),
});

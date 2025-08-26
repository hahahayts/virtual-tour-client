import z from "zod";

export const UserDataSchema = z.object({
  id: z.string(),
  first_name: z.string().nullable(),
  last_name: z.string().nullable(),
  email: z.email(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  role: z.string(),
});

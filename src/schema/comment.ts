import z from "zod";

export const RatingSchema = z.object({
  id: z.string(),
  score: z.number().int().min(1).max(5),
  comment: z.string().max(10000).nullable().optional(),

  mac_address: z.string().max(17).nullable(),

  destinationId: z.string().nullable(),

  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

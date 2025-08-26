import z from "zod";

export const HistoryDataSchema = z.object({
  id: z.string(),
  name: z.string().min(1).max(255),
  description: z.string().min(1).max(10000),
  imageUrl_1: z.string().max(2048).nullable(),
  imageUrl_2: z.string().max(2048).nullable(),
  imageUrl_3: z.string().max(2048).nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const HistoryCreateSchema = z.object({
  name: z.string().min(1, "Name is required").max(255),
  description: z.string().min(1, "Description is required").max(10000),
  imageUrl_1: z.string().max(2048).nullable(),
  imageUrl_2: z.string().max(2048).nullable(),
  imageUrl_3: z.string().max(2048).nullable(),
});

export const UpdateHistorySchema = HistoryCreateSchema.optional();

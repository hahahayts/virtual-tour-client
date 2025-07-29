import z from "zod";

export const WaterTransportationDataSchema = z.object({
  id: z.string(),
  name: z.string().min(1).max(255),
  description: z.string().min(1).max(10000),
  expected_fee: z.number().nonnegative(),
  departure_days: z.array(z.string()), // Assumes it's an array of strings like ["Monday", "Wednesday"]
  departure_time: z.string().min(1),

  imageUrl_1: z.string().max(2048).nullable(),
  imageUrl_2: z.string().max(2048).nullable(),
  imageUrl_3: z.string().max(2048).nullable(),

  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  deletedAt: z.coerce.date().nullable(),
});

export const WaterTransportationSchema = z.object({
  name: z.string().min(1, "Name is required").max(255),
  description: z.string().min(1, "Description is required").max(10000),

  expected_fee: z.number().nonnegative(),

  departure_days: z.array(z.string()), // Assumes it's an array of strings like ["Monday", "Wednesday"]
  departure_time: z.string().min(1, "Departure time is required"),
  guidelines_and_policies: z.string().max(10000),
  rebooking_supercharges: z.string().max(10000),
  refund_policy: z.string().max(10000),
  duration: z.number().nonnegative().nullable(),

  imageUrl_1: z.string().max(2048).nullable(),
  imageUrl_2: z.string().max(2048).nullable(),
  imageUrl_3: z.string().max(2048).nullable(),
});

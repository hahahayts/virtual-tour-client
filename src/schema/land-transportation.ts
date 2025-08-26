import z from "zod";

export const LandTransportationSchema = z.object({
  id: z.string(),
  name: z.string().min(1).max(255),
  description: z.string().max(10000),

  vehicleType: z.string().min(1).max(50).nullable(),
  capacity: z.number().nonnegative().nullable(),
  operator: z.string().max(100).nullable(),
  contactNumber: z.string().max(20).nullable(),

  // Pricing
  baseFee: z.number().nonnegative().nullable(),
  feeDescription: z.string().max(1000).nullable(),

  // Media
  imageUrl_1: z.string().max(2048).nullable(),
  imageUrl_2: z.string().max(2048).nullable(),
  imageUrl_3: z.string().max(2048).nullable(),

  // Timestamps
  createdAt: z.date().nullable(),
  updatedAt: z.date().nullable(),
  deletedAt: z.date().optional().nullable(),
});

export const CreateLandTransportationSchema = z.object({
  name: z.string().min(1, "Name is required").max(255),
  description: z.string().max(10000),

  vehicleType: z.string().min(1, "Vehicle type is required").max(50).nullable(),
  capacity: z.number().nonnegative().nullable(),
  operator: z.string().max(100).nullable(),
  contactNumber: z.string().max(20).nullable(),

  // Pricing
  baseFee: z.number().nonnegative().nullable(),
  feeDescription: z.string().max(1000).nullable(),

  // Media
  imageUrl_1: z.string().max(2048).nullable(),
  imageUrl_2: z.string().max(2048).nullable(),
  imageUrl_3: z.string().max(2048).nullable(),
});

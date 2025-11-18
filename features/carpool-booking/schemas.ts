import { z } from "zod";

export const carpoolBookingSchema = z.object({
  id: z.number().optional(),
  carpoolId: z.number(),
  passengerId: z.number(),
  status: z
    .enum(["PENDING", "CONFIRMED", "CANCELLED", "COMPLETED"])
    .default("PENDING"),
});

export type CarpoolBookingSchema = z.input<typeof carpoolBookingSchema>;

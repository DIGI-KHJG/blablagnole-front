import { z } from "zod";

/** Valide les informations d'une réservation de covoiturage. */
export const carpoolBookingSchema = z.object({
  id: z.number().optional(),
  carpoolId: z.number(),
  passengerId: z.number(),
  status: z
    .enum(["PENDING", "CONFIRMED", "CANCELLED", "COMPLETED"])
    .default("PENDING"),
});

/** Type utilisé pour saisir une réservation de covoiturage. */
export type CarpoolBookingSchema = z.input<typeof carpoolBookingSchema>;

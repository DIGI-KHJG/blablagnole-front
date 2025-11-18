import { addressSchema } from "@/features/addresses/schemas";
import { z } from "zod";

export const carpoolSchema = z.object({
  id: z.number().optional(),
  driverId: z.number({ error: "Le conducteur est requis" }),
  carId: z.number({ error: "Le véhicule est requis" }),
  fromAddress: addressSchema,
  toAddress: addressSchema,
  distanceKm: z.number({ error: "La distance du trajet est requise" }),
  durationMin: z.number({ error: "La durée du trajet est requise" }),
  seatsTotal: z.number({
    error: "Le nombre de places disponibles est requise",
  }),
  seatsRemaining: z.number({
    error: "Le nombre de places disponibles est requise",
  }),
  departureAt: z.date({
    error: "La date et l'heure de départ sont requises",
  }),
  status: z.enum(["OPEN", "FULL", "CANCELLED", "COMPLETED"]).default("OPEN"),
});

export type CarpoolSchema = z.input<typeof carpoolSchema>;

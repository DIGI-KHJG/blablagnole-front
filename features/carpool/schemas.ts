import { z } from "zod";

export const carpoolSchema = z.object({
  id: z.string().optional(),
  driver: z.string({ error: "Le conducteur est requis" }),
  departure_date: z.date({
    error: "La date et l'heure de départ sont requises",
  }),
  departure_location: z.string({ error: "L'adresse de départ est requise" }),
  arrival_location: z.string({ error: "L'adresse d'arrivée est requise" }),
  duration: z.number({ error: "La durée du trajet est requise" }),
  available_seats: z.number({
    error: "Le nombre de places disponibles est requise",
  }),
  distance: z.number({ error: "La distance du trajet est requise" }),
  car: z.string({ error: "Le véhicule est requis" }),
  carpooling_status: z
    .enum(["ACTIVE", "COMPLETED", "CANCELED"])
    .default("ACTIVE"),
});

export type CarpoolSchema = z.input<typeof carpoolSchema>;

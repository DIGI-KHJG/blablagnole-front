import { z } from "zod";

/** Valide les informations d'une réservation de véhicule de service. */
export const serviceCarBookingSchema = z
  .object({
    id: z.number().optional(),
    serviceCarId: z.number(),
    driverId: z.number(),
    startAt: z.date({
      error: "La date de début est requise",
    }),
    endAt: z.date({
      error: "La date de fin est requise",
    }),
    status: z
      .enum(["PENDING", "CONFIRMED", "CANCELLED", "COMPLETED"])
      .default("PENDING"),
  })
  .refine(
    (data) => {
      const now = new Date();
      now.setSeconds(0, 0);
      return data.startAt >= now;
    },
    {
      error: "La date de début ne peut pas être dans le passé",
      path: ["startAt"],
    }
  )
  .refine(
    (data) => {
      const now = new Date();
      now.setSeconds(0, 0);
      return data.endAt >= now;
    },
    {
      error: "La date de fin ne peut pas être dans le passé",
      path: ["endAt"],
    }
  )
  .refine((data) => data.endAt > data.startAt, {
    error: "La date de fin doit être après la date de début",
    path: ["endAt"],
  });

/** Type utilisé pour saisir une réservation de véhicule de service. */
export type ServiceCarBookingSchema = z.input<typeof serviceCarBookingSchema>;

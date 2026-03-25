import { z } from "zod";

/** Valide les critères de recherche saisis dans le bloc de recherche principal. */
export const heroSearchSchema = z
  .object({
    departure: z.string(),
    arrival: z.string(),
    dateTime: z.date().optional(),
  })
  .refine(
    (data) =>
      data.departure.trim() !== "" ||
      data.arrival.trim() !== "" ||
      data.dateTime != null,
    {
      message:
        "Renseignez au moins un critère : ville de départ, ville d'arrivée ou date/heure.",
      path: ["departure"],
    }
  );

/** Type utilisé pour saisir les critères de recherche. */
export type HeroSearchSchema = z.infer<typeof heroSearchSchema>;

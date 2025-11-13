import { z } from "zod";

export const carSchema = z.object({
  id: z.string().optional(),
  image: z.url({ error: "URL d'image invalide" }),
  brand: z.string({ error: "La marque est requise" }),
  model: z.string({ error: "Le modèle est requis" }),
  type: z.string({ error: "Le type est requis" }),
  year: z
    .number({ error: "L'année du véhicule est requise" })
    .int()
    .min(1950, "L'année doit être au moins de 1950"),
  color: z.string({ error: "La couleur est requise" }),
  seats_count: z
    .number({ error: "Le nombre de places est requis" })
    .int()
    .min(1, "Le nombre de places doit être au moins de 1"),
  doors_count: z
    .number({ error: "Le nombre de portes est requis" })
    .int()
    .min(2, "Le nombre de portes doit être au moins de 2"),
  plate_number: z
    .string({ error: "La plaque d'immatriculation est requise" })
    .min(4, "La plaque d'immatriculation doit être au moins de 4 caractères")
    .regex(
      /^[A-Z0-9-]+$/,
      "Le format de la plaque d'immatriculation est invalide"
    ),
  is_available: z.boolean({ error: "Le statut du véhicule est requis" }),
  driver: z.string({ error: "Le conducteur est requis" }),
  status: z.enum(["AVAILABLE", "NOTAVAILABLE", "MAINTENANCE", "RENTED"]),
  motorization: z.enum(["GASOLINE", "DIESEL", "ELECTRIC", "HYBRID"]),
  co2_emissions_km: z
    .number({ error: "Les émissions de CO2 sont requises" })
    .nullable(),
});

export type CarSchema = z.input<typeof carSchema>;

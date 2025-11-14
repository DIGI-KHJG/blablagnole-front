import { z } from "zod";

export const carSchema = z.object({
  id: z.number().optional(),
  driverId: z.number({ error: "Veuillez sélectionner le conducteur" }),
  registrationPlate: z.string({
    error: "Veuillez saisir la plaque d'immatriculation",
  }),
  brand: z.string({ error: "Veuillez saisir la marque" }),
  model: z.string({ error: "Veuillez saisir le modèle" }),
  category: z.string({ error: "Veuillez sélectionner la catégorie" }),
  motorisation: z
    .enum(["PETROL", "DIESEL", "ELECTRIC", "HYBRID"])
    .default("PETROL"),
  co2Emission: z.string({ error: "Veuillez saisir les émissions de CO2" }),
  seats: z.number({ error: "Veuillez saisir le nombre de places" }),
  color: z.string({ error: "Veuillez saisir la couleur" }),
  imageUrl: z.url({ error: "Veuillez saisir l'URL de l'image" }),
  status: z.enum(["IN_SERVICE", "UNDER_REPAIR", "OUT_OF_SERVICE"]).optional(),
});

export type CarSchema = z.input<typeof carSchema>;

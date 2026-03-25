import { z } from "zod";

/** Valide les informations d'un véhicule personnel. */
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
  co2Emission: z.number({ error: "Veuillez saisir les émissions de CO2" }),
  seats: z.number({ error: "Veuillez saisir le nombre de places" }),
  color: z.string({ error: "Veuillez saisir la couleur" }),
  imageUrl: z.url({ error: "Veuillez saisir l'URL de l'image" }),
});

/** Type utilisé pour saisir un véhicule personnel dans les formulaires. */
export type CarSchema = z.input<typeof carSchema>;

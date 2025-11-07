import { z } from "zod";


export const carSchema = z.object({
  id: z.string().optional(),
  image: z.string().url("URL d’image invalide"),
  brand: z.string().min(1, "La marque est obligatoire"),
  model: z.string().min(1, "Le modèle est obligatoire"),
  type: z.enum(["SUV", "SEDAN", "COUPE", "HATCHBACK", "CONVERTIBLE", "SPORT"]),
  year: z.int().gte(1900, "Année invalide").lte(new Date().getFullYear(), "Année future non autorisée"),
  color: z.string().min(1, "La couleur est obligatoire"),
  seats_count: z.number().int().gte(1, "Doit avoir au moins 1 siège"),
  doors_count: z.number().int().gte(2, "Doit avoir au moins 2 portes"),
  plate_number: z
    .string()
    .min(4, "Plaque obligatoire")
    .regex(/^[A-Z0-9-]+$/, "Format d’immatriculation invalide"),
  is_available: z.boolean(),
  driver: z.string({ error: "Le conducteur est requis" }), 
  status: z.enum(["AVAILABLE", "NOTAVAILABLE", "MAINTENANCE", "RENTED"]),
  motorization: z.enum(["GASOLINE", "DIESEL", "ELECTRIC", "HYBRID"]),
  co2_emissions_km: z.number().nullable(),
  
});

export type CarSchema = z.input<typeof carSchema>;

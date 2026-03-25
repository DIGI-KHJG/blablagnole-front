import { z } from "zod";

/** Valide les informations d'une adresse. */
export const addressSchema = z.object({
  id: z.number().optional(),
  street: z.string({ error: "Le nom de la rue est requis" }),
  city: z.string({ error: "La ville est requise" }),
  postalCode: z.string({ error: "Le code postal est requis" }),
  country: z.string({ error: "Le pays est requis" }),
});

/** Type utilisé pour saisir une adresse dans les formulaires. */
export type AddressSchema = z.input<typeof addressSchema>;

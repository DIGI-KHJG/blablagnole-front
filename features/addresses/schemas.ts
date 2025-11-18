import { z } from "zod";

export const addressSchema = z.object({
  id: z.number().optional(),
  street: z.string({ error: "Le nom de la rue est requis" }),
  city: z.string({ error: "La ville est requise" }),
  postalCode: z.string({ error: "Le code postal est requis" }),
  country: z.string({ error: "Le pays est requis" }),
});

export type AddressSchema = z.input<typeof addressSchema>;

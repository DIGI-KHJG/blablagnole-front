
import { z } from "zod";

export const loginSchema = z.object({ 
  email: z.email({message: "L'adresse e-mail est invalide."}),
   password: z.string({ message: "Le mot de passe est requis" }).min(8, { message: "Le mot de passe doit contenir au moins 8 caractères" }),
});



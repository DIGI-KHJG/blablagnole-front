import { z } from "zod";

/** Valide les champs du formulaire de connexion. */
export const loginSchema = z.object({
  email: z.email({ error: "L'adresse e-mail est invalide." }),
  password: z
    .string({ error: "Le mot de passe est requis" })
    .min(8, { error: "Le mot de passe doit contenir au moins 8 caractères" }),
});

/** Type utilisé pour saisir les identifiants de connexion. */
export type LoginSchema = z.infer<typeof loginSchema>;

/** Définit les champs communs du formulaire d'inscription. */
const registerSchemaBase = z.object({
  firstName: z
    .string({ error: "Le prénom est requis" })
    .trim()
    .min(2, "Le prénom doit contenir au moins 2 caractères"),

  lastName: z
    .string({ error: "Le nom est requis" })
    .trim()
    .min(2, "Le nom doit contenir au moins 2 caractères"),

  email: z.email({ error: "Entrez une adresse email valide" }).trim(),

  password: z
    .string({ error: "Le mot de passe est requis" })
    .min(8, "Le mot de passe doit contenir au moins 8 caractères"),

  passwordConfirmation: z
    .string({
      error: "La confirmation du mot de passe est requise",
    })
    .min(
      8,
      "La confirmation du mot de passe doit contenir au moins 8 caractères",
    ),
  role: z.enum(["ADMIN", "COLLABORATOR"]),
  profilePicture: z.string(),
});

/** Valide le formulaire d'inscription avec confirmation du mot de passe. */
export const registerSchema = registerSchemaBase.refine(
  (data) => data.password === data.passwordConfirmation,
  {
    message: "Les mots de passe ne correspondent pas",
    path: ["passwordConfirmation"],
  },
);

/** Valide le body d'inscription envoyé à l'API (sans confirmation). */
export const registerBodySchema = registerSchemaBase.omit({
  passwordConfirmation: true,
});

/** Type utilisé pour saisir les données d'inscription. */
export type RegisterSchema = z.infer<typeof registerSchema>;

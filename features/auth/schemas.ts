import { z } from "zod";

export const loginSchema = z.object({
  email: z.email({ message: "L'adresse e-mail est invalide." }),
  password: z
    .string({ message: "Le mot de passe est requis" })
    .min(8, { message: "Le mot de passe doit contenir au moins 8 caractères" }),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    firstName: z
      .string({ message: "Le prénom est requis" })
      .trim()
      .min(2, "Le prénom doit contenir au moins 2 caractères"),

    lastName: z
      .string({ message: "Le nom est requis" })
      .trim()
      .min(2, "Le nom doit contenir au moins 2 caractères"),

    email: z.email({ message: "Entrez une adresse email valide" }).trim(),

    password: z
      .string({ message: "Le mot de passe est requis" })
      .min(8, "Le mot de passe doit contenir au moins 8 caractères"),

    passwordConfirmation: z
      .string({
        message: "La confirmation du mot de passe est requise",
      })
      .min(
        8,
        "La confirmation du mot de passe doit contenir au moins 8 caractères"
      ),
    role: z.enum(["ADMIN", "COLLABORATOR"]),
    profile_picture: z.url(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Les mots de passe ne correspondent pas",
    path: ["passwordConfirmation"],
  });

export type RegisterSchema = z.infer<typeof registerSchema>;

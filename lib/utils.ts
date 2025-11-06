import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Génère une URL d'avatar aléatoire basée sur un prénom en utilisant DiceBear avec le style "Fun Emoji"
 * @param firstName - Le prénom à utiliser comme seed pour générer l'avatar
 * @returns L'URL de l'avatar généré
 */
export function generateAvatarUrl(firstName: string): string {
  // Utilise le firstName comme seed pour générer un avatar cohérent
  // Ajoute un timestamp pour rendre chaque génération unique si nécessaire
  const seed = firstName.toLowerCase().trim();
  return `https://api.dicebear.com/7.x/fun-emoji/svg?seed=${encodeURIComponent(
    seed
  )}`;
}

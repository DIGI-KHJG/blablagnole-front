import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDateShort = (date: string | Date) => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return dateObj.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

export const formatDateTime = (date: string | Date) => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return dateObj.toLocaleString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

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

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Fusionne des noms de classes (clsx + twMerge) pour éviter les conflits Tailwind.
 * @param inputs Classes ou conditions (ClassValue).
 * @returns Chaîne de classes CSS.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formate une date au format court français (jj/mm/aaaa).
 * @param date Date, chaîne ISO ou null/undefined.
 * @returns Chaîne formatée ou "N/A" si invalide.
 */
export const formatDateShort = (date: string | Date | null | undefined) => {
  if (!date) return "N/A";
  const dateObj = typeof date === "string" ? new Date(date) : date;
  if (isNaN(dateObj.getTime())) return "N/A";
  return dateObj.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

/**
 * Formate une date et une heure au format français (jj/mm/aaaa, hh:mm).
 * @param date Date, chaîne ISO ou null/undefined.
 * @returns Chaîne formatée ou "N/A" si invalide.
 */
export const formatDateTime = (date: string | Date | null | undefined) => {
  if (!date) return "N/A";
  const dateObj = typeof date === "string" ? new Date(date) : date;
  if (isNaN(dateObj.getTime())) return "N/A";
  return dateObj.toLocaleString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

/**
 * Formate une durée en heures et minutes (ex. "2h30min" ou "45min").
 * @param minutes Durée en minutes.
 * @returns Chaîne lisible.
 */
export const formatDuration = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours > 0) {
    return `${hours}h${mins > 0 ? `${mins}min` : ""}`;
  }
  return `${mins}min`;
};

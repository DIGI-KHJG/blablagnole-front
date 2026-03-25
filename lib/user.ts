import type { User } from "@/types/user";

/**
 * Retourne les initiales de l’utilisateur (ex. "JD" pour John Doe).
 * @param user Utilisateur (ou null/undefined).
 * @param fallback Valeur utilisée si l’utilisateur est absent ou si aucun nom n’est dérivable (défaut "?").
 * @returns Chaîne de deux lettres en majuscules ou fallback.
 */
export function getInitials(
  user: User | null | undefined,
  fallback: string = "?",
): string {
  if (!user) return fallback;
  if (user.firstName && user.lastName) {
    return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
  }
  const parts = user.fullName?.trim().split(/\s+/) ?? [];
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  if (parts.length === 1 && parts[0]) {
    return parts[0].slice(0, 2).toUpperCase();
  }
  return fallback;
}

/**
 * Retourne le nom d’affichage au format "Prénom N." (ex. "Bruce W."), ou fullName.
 * @param user Utilisateur (ou null/undefined).
 * @param fallback Valeur utilisée si l’utilisateur est absent ou si aucun nom n’est dérivable (défaut "?").
 * @returns Nom affichable ou fallback.
 */
export function getDisplayName(
  user: User | null | undefined,
  fallback: string = "?",
): string {
  if (!user) return fallback;
  const first = user.firstName?.trim();
  const last = user.lastName?.trim();
  if (first && last) return `${first} ${last[0]}.`;
  if (user.fullName) {
    const parts = user.fullName.trim().split(/\s+/);
    if (parts.length >= 2) return `${parts[0]} ${parts[1][0]}.`;
    return parts[0] ?? fallback;
  }
  return fallback;
}

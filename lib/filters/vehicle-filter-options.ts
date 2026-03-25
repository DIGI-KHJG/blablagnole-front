import carBrands from "@/data/car-brands.json";
import carCategories from "@/data/car-categories.json";
import type { CarMotorisation } from "@/types/car";
import { getMotorisationLabel } from "@/types/car";

/** Options de motorisation pour les filtres (Essence, Diesel, etc.). */
export const MOTORISATION_OPTIONS: CarMotorisation[] = [
  "PETROL",
  "DIESEL",
  "ELECTRIC",
  "HYBRID",
];

/** Codes des catégories (clés du JSON). */
export const CATEGORY_CODES = Object.keys(
  carCategories,
) as (keyof typeof carCategories)[];

/** Libellés des catégories en français. */
export const CATEGORY_LABELS = Object.values(carCategories) as string[];

/** Options marque pour les listes déroulantes ("Toutes" + marques). */
export const BRAND_OPTIONS = ["Toutes", ...(carBrands as string[])];

/** Options motorisation avec libellés ("Toutes" + Essence, Diesel, etc.). */
export const MOTORISATION_LABEL_OPTIONS = [
  "Toutes",
  ...MOTORISATION_OPTIONS.map(getMotorisationLabel),
];

/** Options catégorie pour les listes et badges ("Toutes" + Citadine, SUV, etc.). */
export const CATEGORY_OPTIONS = ["Toutes", ...CATEGORY_LABELS];

/** Classe CSS pour la hauteur max des listes Combobox des filtres. */
export const LIST_CLASS = "max-h-[280px]";

/**
 * Convertit un libellé de catégorie (français) en code attendu par le backend.
 * @param label Libellé affiché (ex. "Citadine", "SUV", "Toutes").
 * @returns Code de catégorie ou chaîne vide si "Toutes".
 */
export function categoryLabelToCode(label: string): string {
  if (label === "Toutes") return "";
  const code = CATEGORY_CODES.find((c) => carCategories[c] === label);
  return code ?? "";
}

/**
 * Convertit un libellé de motorisation en code.
 * @param label Libellé affiché (ex. "Diesel", "Électrique", "Toutes").
 * @returns Code de motorisation ou chaîne vide si "Toutes".
 */
export function motorisationLabelToCode(label: string): string {
  if (label === "Toutes") return "";
  const m = MOTORISATION_OPTIONS.find((c) => getMotorisationLabel(c) === label);
  return m ?? "";
}

/**
 * Convertit un code catégorie en libellé (français) pour l'affichage.
 * @param code Code de catégorie.
 * @returns Libellé ou "Toutes" si absent.
 */
export function categoryCodeToLabel(code: string): string {
  if (!code) return "Toutes";
  return (carCategories as Record<string, string>)[code] ?? "Toutes";
}

/** Référence aux catégories pour afficher le libellé à partir d'un code (usage dans les composants). */
export { carCategories };

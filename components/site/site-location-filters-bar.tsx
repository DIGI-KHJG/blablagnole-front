"use client";

import { Combobox } from "@/components/ui/combobox";
import {
  BRAND_OPTIONS,
  CATEGORY_OPTIONS,
  categoryCodeToLabel,
  categoryLabelToCode,
  LIST_CLASS,
  motorisationLabelToCode,
  MOTORISATION_LABEL_OPTIONS,
} from "@/lib/filters/vehicle-filter-options";
import type { VehicleFilters } from "@/lib/filters/vehicle-filters";
import { cn } from "@/lib/utils";
import type { CarMotorisation } from "@/types/car";
import { getMotorisationLabel } from "@/types/car";
import { Car, Fuel } from "lucide-react";

type SiteLocationFiltersBarProps = {
  filters: VehicleFilters;
  onFiltersChange: (filters: VehicleFilters) => void;
};

/**
 * Barre de filtres pour la page location (marque, motorisation).
 * @param filters Filtres courants.
 * @param onFiltersChange Callback appelé à chaque changement de filtre.
 */
export default function SiteLocationFiltersBar({
  filters,
  onFiltersChange,
}: SiteLocationFiltersBarProps) {
  const setBrand = (value: string) =>
    onFiltersChange({ ...filters, brand: value === "Toutes" ? "" : value });
  const setMotorisation = (value: string) =>
    onFiltersChange({
      ...filters,
      motorisation: motorisationLabelToCode(value),
    });

  const motorisationDisplayValue = filters.motorisation
    ? getMotorisationLabel(filters.motorisation as CarMotorisation)
    : "";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          Marque
        </label>
        <Combobox
          value={filters.brand || ""}
          onChange={setBrand}
          options={BRAND_OPTIONS}
          placeholder="Choisir une marque"
          searchPlaceholder="Rechercher"
          listClassName={LIST_CLASS}
          icon={<Car />}
          className="w-full h-12"
        />
      </div>
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          Motorisation
        </label>
        <Combobox
          value={motorisationDisplayValue}
          onChange={setMotorisation}
          options={MOTORISATION_LABEL_OPTIONS}
          placeholder="Choisir une motorisation"
          searchPlaceholder="Rechercher"
          listClassName={LIST_CLASS}
          icon={<Fuel />}
          className="w-full h-12"
        />
      </div>
    </div>
  );
}

type SiteLocationCategoryBadgesProps = {
  filters: VehicleFilters;
  onFiltersChange: (filters: VehicleFilters) => void;
};

/**
 * Badges de catégories pour filtrer rapidement les véhicules.
 * @param filters Filtres courants.
 * @param onFiltersChange Callback appelé quand une catégorie est sélectionnée.
 */
export function SiteLocationCategoryBadges({
  filters,
  onFiltersChange,
}: SiteLocationCategoryBadgesProps) {
  const setCategory = (value: string) =>
    onFiltersChange({
      ...filters,
      category: categoryLabelToCode(value),
    });
  const selectedCategoryLabel = categoryCodeToLabel(filters.category);

  return (
    <div className="flex flex-wrap gap-2">
      {CATEGORY_OPTIONS.map((label) => {
        const isSelected = selectedCategoryLabel === label;
        return (
          <button
            key={label}
            type="button"
            onClick={() => setCategory(label)}
            className={cn(
              "px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200",
              isSelected
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground",
            )}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

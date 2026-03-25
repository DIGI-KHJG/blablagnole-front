"use client";

import { Combobox } from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BRAND_OPTIONS,
  CATEGORY_OPTIONS,
  categoryLabelToCode,
  carCategories,
  LIST_CLASS,
  motorisationLabelToCode,
  MOTORISATION_LABEL_OPTIONS,
} from "@/lib/filters/vehicle-filter-options";
import type { VehicleFilters } from "@/lib/filters/vehicle-filters";
import type { CarMotorisation, CarStatus } from "@/types/car";
import { getMotorisationLabel, getStatusLabel } from "@/types/car";
import { Binary, Car, Fuel, Layers } from "lucide-react";

const STATUS_OPTIONS: CarStatus[] = [
  "IN_SERVICE",
  "UNDER_REPAIR",
  "OUT_OF_SERVICE",
];

type VehicleFiltersBarProps = {
  filters: VehicleFilters;
  onFiltersChange: (filters: VehicleFilters) => void;
  showStatus?: boolean;
};

export default function VehicleFiltersBar({
  filters,
  onFiltersChange,
  showStatus = false,
}: VehicleFiltersBarProps) {
  const setBrand = (value: string) =>
    onFiltersChange({ ...filters, brand: value === "Toutes" ? "" : value });
  const setCategory = (value: string) =>
    onFiltersChange({
      ...filters,
      category: categoryLabelToCode(value),
    });
  const setMotorisation = (value: string) =>
    onFiltersChange({
      ...filters,
      motorisation: motorisationLabelToCode(value),
    });
  const setStatus = (value: string) =>
    onFiltersChange({
      ...filters,
      status: value === "" ? "" : value,
    });
  const setImmatriculation = (value: string) =>
    onFiltersChange({ ...filters, immatriculation: value });

  const categoryDisplayValue = filters.category
    ? carCategories[filters.category as keyof typeof carCategories]
    : "";
  const motorisationDisplayValue = filters.motorisation
    ? getMotorisationLabel(filters.motorisation as CarMotorisation)
    : "";

  return (
    <div className="flex flex-wrap items-center gap-3">
      {showStatus && (
        <Tabs
          value={filters.status || "all"}
          onValueChange={(v) => setStatus(v === "all" ? "" : v)}
          className="w-fit"
        >
          <TabsList>
            <TabsTrigger value="all">Tous</TabsTrigger>
            {STATUS_OPTIONS.map((s) => (
              <TabsTrigger key={s} value={s}>
                {getStatusLabel(s)}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      )}

      <div className="relative w-fit min-w-[140px]">
        <Binary className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 shrink-0 text-muted-foreground pointer-events-none" />
        <Input
          value={filters.immatriculation ?? ""}
          onChange={(e) => setImmatriculation(e.target.value)}
          placeholder="Immatriculation"
          className="h-9 pl-9"
        />
      </div>

      <div className="w-fit">
        <Combobox
          value={filters.brand || ""}
          onChange={setBrand}
          options={BRAND_OPTIONS}
          placeholder="Marque"
          searchPlaceholder="Rechercher"
          listClassName={LIST_CLASS}
          icon={<Car />}
        />
      </div>

      <div className="w-fit">
        <Combobox
          value={categoryDisplayValue}
          onChange={(label) => setCategory(label)}
          options={CATEGORY_OPTIONS}
          placeholder="Catégorie"
          searchPlaceholder="Rechercher"
          listClassName={LIST_CLASS}
          icon={<Layers />}
        />
      </div>

      <div className="w-fit">
        <Combobox
          value={motorisationDisplayValue}
          onChange={(label) => setMotorisation(label)}
          options={MOTORISATION_LABEL_OPTIONS}
          placeholder="Motorisation"
          searchPlaceholder="Rechercher"
          listClassName={LIST_CLASS}
          icon={<Fuel />}
        />
      </div>
    </div>
  );
}

export type { VehicleFilters } from "@/lib/filters/vehicle-filters";

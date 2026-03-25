/** Représente un véhicule personnel ou de service. */
export type Car = {
  id?: number;
  driverId?: number;
  registrationPlate: string;
  brand: string;
  model: string;
  category: CarCategory;
  motorisation: CarMotorisation;
  co2Emission: number;
  seats: number;
  color: string;
  imageUrl: string;
  status?: CarStatus;
};

/** Statut d'un véhicule de service. */
export type CarStatus = "IN_SERVICE" | "UNDER_REPAIR" | "OUT_OF_SERVICE";

/** Type de motorisation d'un véhicule. */
export type CarMotorisation = "PETROL" | "DIESEL" | "ELECTRIC" | "HYBRID";

/** Catégorie de véhicule. */
export type CarCategory =
  | "MICRO_URBAN"
  | "MINI_CITY_CAR"
  | "VERSATILE_CITY_CAR"
  | "COMPACT"
  | "SMALL_SEDAN"
  | "MEDIUM_SEDAN"
  | "LARGE_SEDAN"
  | "SUV"
  | "OFF_ROAD"
  | "PICKUP"
  | "SPORT";

/** Retourne le libellé lisible d'une motorisation. */
export const getMotorisationLabel = (motorisation?: CarMotorisation) => {
  const labels: Record<CarMotorisation, string> = {
    ELECTRIC: "Électrique",
    HYBRID: "Hybride",
    DIESEL: "Diesel",
    PETROL: "Essence",
  };
  return motorisation ? labels[motorisation] : "";
};

/** Retourne la classe Tailwind associée à une motorisation. */
export const getMotorisationColor = (motorisation?: CarMotorisation) => {
  switch (motorisation) {
    case "ELECTRIC":
      return "bg-emerald-500";
    case "HYBRID":
      return "bg-teal-500";
    case "DIESEL":
      return "bg-amber-500";
    case "PETROL":
      return "bg-orange-500";
    default:
      return "bg-secondary";
  }
};

/** Retourne le libellé lisible d'une catégorie de véhicule. */
export const getCategoryLabel = (category?: CarCategory) => {
  const labels: Record<CarCategory, string> = {
    MICRO_URBAN: "Micro-urbaine",
    MINI_CITY_CAR: "Mini-citadine",
    VERSATILE_CITY_CAR: "Citadine polyvalente",
    COMPACT: "Compact",
    SMALL_SEDAN: "Berline S",
    MEDIUM_SEDAN: "Berline M",
    LARGE_SEDAN: "Berline L",
    SUV: "SUV",
    OFF_ROAD: "Tout-terrain",
    PICKUP: "Pick-ups",
    SPORT: "Sport",
  };
  return category ? labels[category] : "";
};

/** Retourne le libellé lisible d'un statut de véhicule. */
export const getStatusLabel = (status?: CarStatus) => {
  const labels: Record<CarStatus, string> = {
    IN_SERVICE: "En service",
    UNDER_REPAIR: "En réparation",
    OUT_OF_SERVICE: "Hors service",
  };
  return status ? labels[status] : "";
};

/** Retourne la classe Tailwind associée à un statut de véhicule. */
export const getStatusColor = (status?: CarStatus) => {
  switch (status) {
    case "IN_SERVICE":
      return "bg-emerald-500";
    case "UNDER_REPAIR":
      return "bg-amber-500";
    case "OUT_OF_SERVICE":
      return "bg-red-500";
  }
};

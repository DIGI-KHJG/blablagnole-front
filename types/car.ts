import { User } from "./user";

export type Car = {
  id?: string;
  driver: User;
  registrationPlate: string;
  brand: string;
  model: string;
  category: CarCategory;
  motorisation: CarMotorisation;
  co2Emission: string;
  seats: number;
  color: string;
  imageUrl: string;
  status?: CarStatus;
};

export type CarStatus = "IN_SERVICE" | "UNDER_REPAIR" | "OUT_OF_SERVICE";

export type CarMotorisation = "PETROL" | "DIESEL" | "ELECTRIC" | "HYBRID";

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
  | "PICKUP";

export const getMotorisationLabel = (motorisation?: CarMotorisation) => {
  const labels: Record<CarMotorisation, string> = {
    ELECTRIC: "Électrique",
    HYBRID: "Hybride",
    DIESEL: "Diesel",
    PETROL: "Essence",
  };
  return motorisation ? labels[motorisation] : "";
};

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

export const getCategoryLabel = (category?: CarCategory) => {
  const labels: Record<CarCategory, string> = {
    MICRO_URBAN: "Micro-urbaines",
    MINI_CITY_CAR: "Mini-citadines",
    VERSATILE_CITY_CAR: "Citadines polyvalentes",
    COMPACT: "Compactes",
    SMALL_SEDAN: "Berlines S",
    MEDIUM_SEDAN: "Berlines M",
    LARGE_SEDAN: "Berlines L",
    SUV: "SUVs",
    OFF_ROAD: "Tout-terrain",
    PICKUP: "Pick-ups",
  };
  return category ? labels[category] : "";
};

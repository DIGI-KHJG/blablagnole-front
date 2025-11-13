import { User } from "./user";

export type Car = {
  id?: string;
  image: string;
  brand: string;
  model: string;
  category: CarCategory;
  year: number;
  color: string;
  seats_count: number;
  doors_count: number;
  plate_number: string;
  driver: User;
  motorisation: CarMotorisation;
  co2_emissions_km: number | null;
  created_at: Date;
};

export type CarStatus = "AVAILABLE" | "UNAVAILABLE" | "MAINTENANCE" | "RENTED";

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

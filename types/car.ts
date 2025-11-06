import { User } from "./user";

export type Car = {
  id?: string;
  image: string;
  brand: string;
  model: string;
  type: Type;
  year: number;
  color: string;
  seats_count: number;
  doors_count: number;
  plate_number: string;
  is_available: boolean;
  driver: User;
  status: CarStatus;
  motorization: Motorization;
  co2_emissions_km: number | null;
  created_at: Date;
};

export type CarStatus = "AVAILABLE" | "UNAVAILABLE" | "MAINTENANCE" | "RENTED";

export type Motorization = "GASOLINE" | "DIESEL" | "ELECTRIC" | "HYBRID";

export type Type =
  | "SUV"
  | "SEDAN"
  | "COUPE"
  | "HATCHBACK"
  | "CONVERTIBLE"
  | "SPORT";

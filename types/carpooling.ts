import { Reservation } from "@/types/reservation";
import { Car } from "./car";
import { User } from "./user";

export type Carpooling = {
  id?: string;
  driver: User;
  departure_date: string;
  departure_location: Address;
  arrival_location: string;
  duration: number;
  available_seats: number;
  distance: number;
  car: Car;
  carpooling_status: carpooling_status;
  passengers: User[];
  reservations: Reservation[];
  created_at: Date;
};

export type carpooling_status = "ACTIVE" | "COMPLETED" | "CANCELED";

export type Address = {
  id?: string;
  street: string;
  city: string;
  zip_code: string;
  country: string;
};

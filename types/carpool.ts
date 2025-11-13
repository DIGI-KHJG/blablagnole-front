import { Reservation } from "@/types/reservation";
import { Car } from "./car";
import { User } from "./user";

export type Carpool = {
  id?: string;
  driver: User;
  departure_date: string;
  departure_location: Address;
  arrival_location: string;
  duration: number;
  available_seats: number;
  distance: number;
  car: Car;
  carpool_status: CarpoolStatus;
  passengers: User[];
  reservations: Reservation[];
  created_at: Date;
};

export type CarpoolStatus = "OPEN" | "FULL" | "CANCELLED" | "COMPLETED";

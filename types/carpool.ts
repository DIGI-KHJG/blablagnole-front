import { Address } from "@/types/address";
import { User } from "@/types/user";
import { Car } from "./car";

export type Carpool = {
  id?: string;
  driver: User;
  car: Car;
  fromAddress: Address;
  toAddress: Address;
  distanceKm: number;
  durationMin: number;
  seatsTotal: number;
  seatsRemaining: number;
  departureAt: Date;
  status: CarpoolStatus;
};

export type CarpoolStatus = "OPEN" | "FULL" | "CANCELLED" | "COMPLETED";

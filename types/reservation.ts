import { Carpooling } from "@/types/carpooling";
import { User } from "./user";

export type Reservation = {
  id?: string;
  user: User;
  carpooling: Carpooling;
  status: ReservationStatus;
  created_at: Date;
};

export type ReservationStatus = "PENDING" | "CONFIRMED" | "CANCELLED";

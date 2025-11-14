import { Carpool } from "@/types/carpool";
import { User } from "./user";
export type CarpoolBooking = {
  id?: string;
  carpool: Carpool;
  passenger: User;
  status: CarpoolBookingStatus;
};

export type CarpoolBookingStatus =
  | "PENDING"
  | "CONFIRMED"
  | "CANCELLED"
  | "COMPLETED";

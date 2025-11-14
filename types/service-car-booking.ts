import { Car } from "@/types/car";
import { User } from "./user";

export type ServiceCarBooking = {
  id?: string;
  serviceCar: Car;
  driver: User;
  startAt: Date;
  endAt: Date;
  status: ServiceCarBookingStatus;
};

export type ServiceCarBookingStatus =
  | "PENDING"
  | "CONFIRMED"
  | "CANCELLED"
  | "COMPLETED";

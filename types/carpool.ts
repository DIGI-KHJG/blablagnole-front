import { Address } from "@/types/address";
import { Car } from "@/types/car";
import { User } from "@/types/user";

export type Carpool = {
  id?: number;
  driverId?: number;
  carId?: number;
  driver?: User;
  car?: Car;
  fromAddress: Address;
  toAddress: Address;
  passengers?: User[];
  distanceKm: number;
  durationMin: number;
  seatsTotal: number;
  seatsRemaining: number;
  departureAt: string | Date;
  status: CarpoolStatus;
};

export type CarpoolStatus = "OPEN" | "FULL" | "CANCELLED" | "COMPLETED";

export const getStatusLabel = (status?: CarpoolStatus) => {
  const labels: Record<CarpoolStatus, string> = {
    OPEN: "Ouvert",
    FULL: "Complet",
    CANCELLED: "Annulé",
    COMPLETED: "Terminé",
  };
  return status ? labels[status] : "";
};

export const getStatusColor = (status?: CarpoolStatus) => {
  switch (status) {
    case "OPEN":
      return "bg-emerald-500";
    case "FULL":
      return "bg-amber-500";
    case "CANCELLED":
      return "bg-red-500";
    case "COMPLETED":
      return "bg-blue-500";
    default:
      return "bg-secondary";
  }
};

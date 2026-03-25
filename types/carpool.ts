import { Address } from "@/types/address";
import { Car } from "@/types/car";
import { User } from "@/types/user";

/** Représente un trajet de covoiturage. */
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

/** Statut d'un covoiturage. */
export type CarpoolStatus = "OPEN" | "FULL" | "CANCELLED" | "COMPLETED";

/** Retourne le libellé lisible d'un statut de covoiturage. */
export const getStatusLabel = (status?: CarpoolStatus) => {
  const labels: Record<CarpoolStatus, string> = {
    OPEN: "Ouvert",
    FULL: "Complet",
    CANCELLED: "Annulé",
    COMPLETED: "Terminé",
  };
  return status ? labels[status] : "";
};

/** Retourne la classe Tailwind associée à un statut de covoiturage. */
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

/** Retourne la classe de bordure associée à un statut de covoiturage. */
export const getStatusBorderColor = (status?: CarpoolStatus) => {
  switch (status) {
    case "OPEN":
      return "border-l-emerald-500";
    case "FULL":
      return "border-l-amber-500";
    case "CANCELLED":
      return "border-l-red-500";
    case "COMPLETED":
      return "border-l-blue-500";
    default:
      return "border-l-border";
  }
};

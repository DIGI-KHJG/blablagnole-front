import { Carpool } from "@/types/carpool";
import { User } from "./user";
/** Représente une réservation de covoiturage. */
export type CarpoolBooking = {
  id?: number;
  carpool: Carpool;
  passenger: User;
  status: CarpoolBookingStatus;
};

/** Statut d'une réservation de covoiturage. */
export type CarpoolBookingStatus =
  | "PENDING"
  | "CONFIRMED"
  | "CANCELLED"
  | "COMPLETED";

/** Retourne le libellé lisible d'un statut de réservation de covoiturage. */
export const getStatusLabel = (status?: CarpoolBookingStatus) => {
  const labels: Record<CarpoolBookingStatus, string> = {
    PENDING: "En attente",
    CONFIRMED: "Confirmée",
    CANCELLED: "Annulée",
    COMPLETED: "Terminée",
  };
  return status ? labels[status] : "";
};

/** Retourne la classe Tailwind associée à un statut de réservation de covoiturage. */
export const getStatusColor = (status?: CarpoolBookingStatus) => {
  switch (status) {
    case "PENDING":
      return "bg-amber-500";
    case "CONFIRMED":
      return "bg-emerald-500";
    case "CANCELLED":
      return "bg-red-500";
    case "COMPLETED":
      return "bg-blue-500";
    default:
      return "bg-secondary";
  }
};

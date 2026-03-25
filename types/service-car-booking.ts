import { Car } from "./car";
import { User } from "./user";

/** Représente une réservation de véhicule de service. */
export type ServiceCarBooking = {
  id?: number;
  serviceCarId?: number;
  driverId?: number;
  driver?: User;
  serviceCar?: Car;
  startAt: Date;
  endAt: Date;
  status: ServiceCarBookingStatus;
};

/** Statut d'une réservation de véhicule de service. */
export type ServiceCarBookingStatus =
  | "PENDING"
  | "CONFIRMED"
  | "CANCELLED"
  | "COMPLETED";

/** Retourne le libellé lisible d'un statut de réservation de véhicule de service. */
export const getBookingStatusLabel = (status?: ServiceCarBookingStatus) => {
  const labels: Record<ServiceCarBookingStatus, string> = {
    PENDING: "En attente",
    CONFIRMED: "Confirmée",
    CANCELLED: "Annulée",
    COMPLETED: "Terminée",
  };
  return status ? labels[status] : "";
};

/** Retourne la classe Tailwind associée à un statut de réservation de véhicule de service. */
export const getBookingStatusColor = (status?: ServiceCarBookingStatus) => {
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

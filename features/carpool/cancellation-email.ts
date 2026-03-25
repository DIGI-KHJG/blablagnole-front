import { Carpool } from "@/types/carpool";

export type CarpoolCancellationEmailPayload = {
  recipients: {
    email: string;
    passengerName: string;
  }[];
  driverName: string;
  tripRoute: string;
  tripDate: string;
  tripTime: string;
};

/**
 * Construit le payload d'envoi d'email d'annulation a partir d'un covoiturage.
 * Retourne null si aucun destinataire valide n'est trouve.
 */
export function buildCarpoolCancellationEmailPayload(
  carpool?: Carpool,
): CarpoolCancellationEmailPayload | null {
  const recipients = (carpool?.passengers ?? [])
    .filter((passenger) => !!passenger.email?.trim())
    .map((passenger) => ({
      email: passenger.email as string,
      passengerName: passenger.firstName || passenger.fullName,
    }));

  if (recipients.length === 0) {
    return null;
  }

  const departureDate = carpool?.departureAt ? new Date(carpool.departureAt) : null;
  const hasValidDepartureDate = departureDate && !isNaN(departureDate.getTime());

  return {
    recipients,
    driverName: carpool?.driver?.fullName || "Conducteur inconnu",
    tripRoute: `${carpool?.fromAddress?.city || "N/A"} vers ${carpool?.toAddress?.city || "N/A"}`,
    tripDate: hasValidDepartureDate
      ? departureDate.toLocaleDateString("fr-FR")
      : "Date inconnue",
    tripTime: hasValidDepartureDate
      ? departureDate.toLocaleTimeString("fr-FR", {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "Heure inconnue",
  };
}

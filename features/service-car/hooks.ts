import { Car } from "@/types/car";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ServiceCarSchema } from "./schemas";

type CancelledBookingEmailItem = {
  collaboratorName?: string;
  collaboratorEmail?: string;
  vehicleLabel?: string;
  registrationPlate?: string;
  startAt?: string;
  endAt?: string;
};

type UpdateServiceCarResponse = {
  message?: string;
  serviceCar?: Car;
  cancelledBookings?: CancelledBookingEmailItem[];
};

async function sendServiceCarCancellationEmails(
  cancelledBookings: CancelledBookingEmailItem[],
  fallbackStatus?: string,
) {
  const recipients = cancelledBookings
    .filter((booking) => !!booking.collaboratorEmail?.trim())
    .map((booking) => ({
      email: booking.collaboratorEmail as string,
      collaboratorName: booking.collaboratorName || "Collaborateur",
      startAt: booking.startAt || "Date inconnue",
      endAt: booking.endAt || "Date inconnue",
    }));

  if (recipients.length === 0) return;

  await fetch("/api/emails/service-car-booking-cancellation", {
    method: "POST",
    credentials: "include",
    cache: "no-store",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      recipients,
      vehicleLabel: cancelledBookings[0]?.vehicleLabel || "Véhicule de service",
      registrationPlate:
        cancelledBookings[0]?.registrationPlate || "Plaque inconnue",
      reason:
        fallbackStatus === "UNDER_REPAIR"
          ? "Véhicule en réparation"
          : "Véhicule hors service",
    }),
  });
}

/** Récupère la liste des véhicules de service. */
export function useGetServiceCars() {
  return useQuery<Car[]>({
    queryKey: ["service-cars"],
    queryFn: async () => {
      const res = await fetch("/api/service-cars", {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok)
        throw new Error(
          "Erreur lors de la récupération des véhicules de service",
        );
      const data = await res.json();
      return data.content;
    },
    staleTime: 30_000,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    retry: false,
  });
}

/**
 * Récupère un véhicule de service par son identifiant.
 * @param id Identifiant du véhicule (optionnel, désactive la requête si absent).
 */
export function useGetServiceCarById(id?: string) {
  return useQuery<Car>({
    queryKey: ["service-cars", id],
    queryFn: async () => {
      const res = await fetch(`/api/service-cars/${id}`, {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok)
        throw new Error(
          "Erreur lors de la récupération du véhicule de service",
        );
      const data = await res.json();
      return data;
    },
    staleTime: 30_000,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    retry: false,
  });
}

/** Ajoute un véhicule de service puis actualise la liste des véhicules de service. */
export function useAddServiceCar() {
  const qc = useQueryClient();
  return useMutation<Car, Error, ServiceCarSchema>({
    mutationFn: async (input) => {
      const res = await fetch("/api/service-cars", {
        method: "POST",
        credentials: "include",
        cache: "no-store",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      if (!res.ok) {
        const error = await res.json().catch(() => ({
          message: "Erreur lors de l'ajout du véhicule de service",
        }));
        throw new Error(
          error.message || "Erreur lors de l'ajout du véhicule de service",
        );
      }
      return res.json() as Promise<Car>;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["service-cars"] });
    },
  });
}

/** Modifie un véhicule de service puis actualise la liste des véhicules de service. */
export function useEditServiceCar() {
  const qc = useQueryClient();
  return useMutation<Car, Error, ServiceCarSchema>({
    mutationFn: async (input) => {
      const res = await fetch("/api/service-cars", {
        method: "PUT",
        credentials: "include",
        cache: "no-store",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      if (!res.ok) {
        const error = await res.json().catch(() => ({
          message: "Erreur lors de la modification du véhicule de service",
        }));
        throw new Error(
          error.message ||
            "Erreur lors de la modification du véhicule de service",
        );
      }

      const payload = (await res.json()) as UpdateServiceCarResponse;
      console.log("PUT /api/service-cars response:", payload);
      const updatedCar = payload?.serviceCar ?? (payload as unknown as Car);

      const shouldTrySendEmails =
        (input.status === "UNDER_REPAIR" ||
          input.status === "OUT_OF_SERVICE") &&
        Array.isArray(payload?.cancelledBookings) &&
        payload.cancelledBookings.length > 0;

      if (shouldTrySendEmails) {
        await sendServiceCarCancellationEmails(
          payload.cancelledBookings as CancelledBookingEmailItem[],
          input.status,
        );
      }

      return updatedCar;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["service-cars"] });
    },
  });
}

/** Supprime un véhicule de service à partir de son id, met à jour le cache puis actualise la liste. */
export function useDeleteServiceCar() {
  const qc = useQueryClient();
  return useMutation<void, Error, number>({
    mutationFn: async (id) => {
      const res = await fetch(`/api/service-cars/${id}`, {
        method: "DELETE",
        credentials: "include",
        cache: "no-store",
      });
      if (!res.ok) {
        const error = await res.json().catch(() => ({
          message: "Erreur lors de la suppression du véhicule de service",
        }));
        throw new Error(
          error.message ||
            "Erreur lors de la suppression du véhicule de service",
        );
      }
    },
    onSuccess: (_, deletedId) => {
      qc.setQueriesData<Car[] | Car | undefined>(
        { queryKey: ["service-cars"] },
        (old) =>
          Array.isArray(old) ? old.filter((c) => c.id !== deletedId) : old,
      );
      qc.invalidateQueries({ queryKey: ["service-cars"] });
    },
  });
}

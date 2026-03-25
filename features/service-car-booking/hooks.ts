import { ServiceCarBooking } from "@/types/service-car-booking";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ServiceCarBookingSchema } from "./schemas";

/** Récupère la liste des réservations de véhicules de service. */
export function useGetServiceCarBookings() {
  return useQuery<ServiceCarBooking[]>({
    queryKey: ["service-car-bookings"],
    queryFn: async () => {
      const res = await fetch("/api/service-car-bookings", {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok)
        throw new Error(
          "Erreur lors de la récupération des réservations de véhicule de service",
        );
      const data = await res.json();
      return data.content;
    },
    retry: false,
    staleTime: 30_000,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
}

/**
 * Récupère une réservation de véhicule de service par identifiant.
 * @param id Identifiant de la réservation (optionnel, désactive la requête si absent).
 */
export function useGetServiceCarBookingById(id?: string) {
  return useQuery<ServiceCarBooking>({
    queryKey: ["service-car-bookings", id],
    queryFn: async () => {
      const res = await fetch(`/api/service-car-bookings/${id}`, {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok)
        throw new Error(
          "Erreur lors de la récupération de la réservation de véhicule de service",
        );
      const data = await res.json();
      return data;
    },
    retry: false,
    staleTime: 30_000,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
}

/**
 * Récupère les réservations de véhicules de service d’un conducteur.
 * @param id Identifiant du conducteur (optionnel, désactive la requête si absent).
 */
export function useGetServiceCarBookingsByDriverId(id?: number) {
  return useQuery<ServiceCarBooking[]>({
    queryKey: ["service-car-bookings", id],
    queryFn: async () => {
      const res = await fetch(`/api/service-car-bookings/driver/${id}`, {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok)
        throw new Error(
          "Erreur lors de la récupération des réservations de véhicule de service",
        );
      const data = await res.json();
      return data.content;
    },
    retry: false,
    staleTime: 30_000,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
}

/** Crée une réservation de véhicule de service puis actualise la liste des réservations. */
export function useBookServiceCar() {
  const qc = useQueryClient();
  return useMutation<ServiceCarBooking, Error, ServiceCarBookingSchema>({
    mutationFn: async (input) => {
      const res = await fetch("/api/service-car-bookings", {
        method: "POST",
        credentials: "include",
        cache: "no-store",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      if (!res.ok) {
        const error = await res.json().catch(() => ({
          message: "Erreur lors de la réservation du véhicule de service",
        }));
        throw new Error(
          error.message ||
            "Erreur lors de la réservation du véhicule de service",
        );
      }
      return res.json() as Promise<ServiceCarBooking>;
    },
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["service-car-bookings"],
      });
    },
  });
}

/** Marque une réservation de véhicule de service comme terminée à partir de son id puis actualise la liste des réservations. */
export function useCompleteServiceCarBooking() {
  const qc = useQueryClient();
  return useMutation<ServiceCarBooking, Error, number>({
    mutationFn: async (id) => {
      const res = await fetch(`/api/service-car-bookings/${id}/complete`, {
        method: "PATCH",
        credentials: "include",
        cache: "no-store",
      });
      if (!res.ok) {
        const error = await res.json().catch(() => ({
          message:
            "Erreur lors de la complétion de la réservation de véhicule de service",
        }));
        throw new Error(
          error.message ||
            "Erreur lors de la complétion de la réservation de véhicule de service",
        );
      }
      return res.json() as Promise<ServiceCarBooking>;
    },
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["service-car-bookings"],
      });
    },
  });
}

/** Annule une réservation de véhicule de service à partir de son id puis actualise la liste des réservations. */
export function useCancelServiceCarBooking() {
  const qc = useQueryClient();
  return useMutation<ServiceCarBooking, Error, number>({
    mutationFn: async (id) => {
      const res = await fetch(`/api/service-car-bookings/${id}/cancel`, {
        method: "PATCH",
        credentials: "include",
        cache: "no-store",
      });
      if (!res.ok) {
        const error = await res.json().catch(() => ({
          message:
            "Erreur lors de l'annulation de la réservation de véhicule de service",
        }));
        throw new Error(
          error.message ||
            "Erreur lors de l'annulation de la réservation de véhicule de service",
        );
      }
      return res.json() as Promise<ServiceCarBooking>;
    },
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["service-car-bookings"],
      });
    },
  });
}

/** Modifie une réservation de véhicule de service puis actualise la liste des réservations. */
export function useEditServiceCarBooking() {
  const qc = useQueryClient();
  return useMutation<ServiceCarBooking, Error, ServiceCarBookingSchema>({
    mutationFn: async (input) => {
      const res = await fetch("/api/service-car-bookings", {
        method: "PUT",
        credentials: "include",
        cache: "no-store",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      if (!res.ok) {
        const error = await res.json().catch(() => ({
          message:
            "Erreur lors de la modification de la réservation de véhicule de service",
        }));
        throw new Error(
          error.message ||
            "Erreur lors de la modification de la réservation de véhicule de service",
        );
      }
      return res.json() as Promise<ServiceCarBooking>;
    },
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["service-car-bookings"],
      });
    },
  });
}

/** Supprime une réservation de véhicule de service à partir de son id, met à jour le cache puis actualise la liste. */
export function useDeleteServiceCarBooking() {
  const qc = useQueryClient();
  return useMutation<void, Error, number>({
    mutationFn: async (id) => {
      const res = await fetch(`/api/service-car-bookings/${id}`, {
        method: "DELETE",
        credentials: "include",
        cache: "no-store",
      });
      if (!res.ok) {
        const error = await res.json().catch(() => ({
          message:
            "Erreur lors de la suppression de la réservation de véhicule de service",
        }));
        throw new Error(
          error.message ||
            "Erreur lors de la suppression de la réservation de véhicule de service",
        );
      }
    },
    onSuccess: (_, deletedId) => {
      qc.setQueriesData<ServiceCarBooking[] | ServiceCarBooking | undefined>(
        { queryKey: ["service-car-bookings"] },
        (old) =>
          Array.isArray(old) ? old.filter((c) => c.id !== deletedId) : old,
      );
      qc.invalidateQueries({ queryKey: ["service-car-bookings"] });
    },
  });
}

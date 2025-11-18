import { CarpoolBookingSchema } from "@/features/carpool-booking/schemas";
import { CarpoolBooking } from "@/types/carpool-booking";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useGetCarpoolBookings() {
  return useQuery<CarpoolBooking[]>({
    queryKey: ["carpool-bookings"],
    queryFn: async () => {
      const res = await fetch("/api/carpool-bookings", {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok)
        throw new Error(
          "Erreur lors de la récupération des réservations de covoiturage"
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

export function useGetCarpoolBookingById(id?: string) {
  return useQuery<CarpoolBooking>({
    queryKey: ["carpool-bookings", id],
    queryFn: async () => {
      const res = await fetch(`/api/carpool-bookings/${id}`, {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok)
        throw new Error(
          "Erreur lors de la récupération de la réservation de covoiturage"
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

export function useGetCarpoolBookingByPassengerId(id?: number) {
  return useQuery<CarpoolBooking[]>({
    queryKey: ["carpool-bookings", id],
    queryFn: async () => {
      const res = await fetch(`/api/carpool-bookings/passenger/${id}`, {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok)
        throw new Error(
          "Erreur lors de la récupération des réservations de covoiturage de l'utilisateur"
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

export function useBookCarpool() {
  const qc = useQueryClient();
  return useMutation<CarpoolBooking, Error, CarpoolBookingSchema>({
    mutationFn: async (input) => {
      const res = await fetch("/api/carpool-bookings", {
        method: "POST",
        credentials: "include",
        cache: "no-store",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      if (!res.ok) {
        const error = await res.json().catch(() => ({
          message: "Erreur lors de la réservation du covoiturage",
        }));
        throw new Error(
          error.message || "Erreur lors de la réservation du covoiturage"
        );
      }
      return res.json() as Promise<CarpoolBooking>;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["carpool-bookings"] });
    },
  });
}

export function useConfirmCarpoolBooking() {
  const qc = useQueryClient();
  return useMutation<CarpoolBooking, Error, number>({
    mutationFn: async (id) => {
      const res = await fetch(`/api/carpool-bookings/${id}/confirm`, {
        method: "PATCH",
        credentials: "include",
        cache: "no-store",
      });
      if (!res.ok) {
        const error = await res.json().catch(() => ({
          message:
            "Erreur lors de la confirmation de la réservation de covoiturage",
        }));
        throw new Error(
          error.message ||
            "Erreur lors de la confirmation de la réservation de covoiturage"
        );
      }
      return res.json() as Promise<CarpoolBooking>;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["carpool-bookings"] });
    },
  });
}

export function useCompleteCarpoolBooking() {
  const qc = useQueryClient();
  return useMutation<CarpoolBooking, Error, number>({
    mutationFn: async (id) => {
      const res = await fetch(`/api/carpool-bookings/${id}/complete`, {
        method: "PATCH",
        credentials: "include",
        cache: "no-store",
      });
      if (!res.ok) {
        const error = await res.json().catch(() => ({
          message:
            "Erreur lors de la complétion de la réservation de covoiturage",
        }));
        throw new Error(
          error.message ||
            "Erreur lors de la complétion de la réservation de covoiturage"
        );
      }
      return res.json() as Promise<CarpoolBooking>;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["carpool-bookings"] });
    },
  });
}

export function useCancelCarpoolBooking() {
  const qc = useQueryClient();
  return useMutation<CarpoolBooking, Error, number>({
    mutationFn: async (id) => {
      const res = await fetch(`/api/carpool-bookings/${id}/cancel`, {
        method: "PATCH",
        credentials: "include",
        cache: "no-store",
      });
      if (!res.ok) {
        const error = await res.json().catch(() => ({
          message:
            "Erreur lors de l'annulation de la réservation de covoiturage",
        }));
        throw new Error(
          error.message ||
            "Erreur lors de l'annulation de la réservation de covoiturage"
        );
      }
      return res.json() as Promise<CarpoolBooking>;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["carpool-bookings"] });
    },
  });
}

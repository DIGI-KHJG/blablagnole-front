import { CarpoolSchema } from "@/features/carpool/schemas";
import { Carpool } from "@/types/carpool";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

/** Récupère la liste de tous les covoiturages. */
export function useGetCarpools() {
  return useQuery<Carpool[]>({
    queryKey: ["carpools"],
    queryFn: async () => {
      const res = await fetch("/api/carpools", {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok)
        throw new Error("Erreur lors de la récupération des covoiturages");
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
 * Récupère les covoiturages dont l’utilisateur est conducteur.
 * @param id Identifiant du conducteur (optionnel, désactive la requête si absent).
 */
export function useGetCarpoolsByDriverId(id?: number) {
  return useQuery<Carpool[]>({
    queryKey: ["carpools", id],
    queryFn: async () => {
      const res = await fetch(`/api/carpools/driver/${id}`, {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok)
        throw new Error(
          "Erreur lors de la récupération des covoiturages de l'utilisateur	",
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
 * Récupère un covoiturage par son identifiant.
 * @param id Identifiant du covoiturage (optionnel, désactive la requête si absent).
 */
export function useGetCarpoolById(id?: string) {
  return useQuery<Carpool>({
    queryKey: ["carpools", id],
    queryFn: async () => {
      const res = await fetch(`/api/carpools/${id}`, {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok)
        throw new Error("Erreur lors de la récupération du covoiturage");
      const data = await res.json();
      return data;
    },
    staleTime: 30_000,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    retry: false,
  });
}

/** Ajoute un covoiturage puis actualise la liste des covoiturages. */
export function useAddCarpool() {
  const qc = useQueryClient();
  return useMutation<Carpool, Error, CarpoolSchema>({
    mutationFn: async (input) => {
      const res = await fetch("/api/carpools", {
        method: "POST",
        credentials: "include",
        cache: "no-store",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      if (!res.ok) {
        const error = await res.json().catch(() => ({
          message: "Erreur lors de l'ajout du covoiturage",
        }));
        throw new Error(
          error.message || "Erreur lors de l'ajout du covoiturage",
        );
      }
      return res.json() as Promise<Carpool>;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["carpools"] });
    },
  });
}

/** Modifie un covoiturage puis actualise la liste des covoiturages. */
export function useEditCarpool() {
  const qc = useQueryClient();
  return useMutation<Carpool, Error, CarpoolSchema>({
    mutationFn: async (input) => {
      const res = await fetch("/api/carpools", {
        method: "PUT",
        credentials: "include",
        cache: "no-store",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      if (!res.ok) {
        const error = await res.json().catch(() => ({
          message: "Erreur lors de la modification du covoiturage",
        }));
        throw new Error(
          error.message || "Erreur lors de la modification du covoiturage",
        );
      }
      return res.json() as Promise<Carpool>;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["carpools"] });
    },
  });
}

/** Supprime un covoiturage à partir de son id, met à jour le cache puis actualise la liste. */
export function useDeleteCarpool() {
  const qc = useQueryClient();
  return useMutation<void, Error, number>({
    mutationFn: async (id) => {
      const res = await fetch(`/api/carpools/${id}`, {
        method: "DELETE",
        credentials: "include",
        cache: "no-store",
      });
      if (!res.ok) {
        const error = await res.json().catch(() => ({
          message: "Erreur lors de la suppression du covoiturage",
        }));
        throw new Error(
          error.message || "Erreur lors de la suppression du covoiturage",
        );
      }
    },
    onSuccess: (_, deletedId) => {
      // Retirer immédiatement le covoiturage de toutes les listes en cache (évite d’attendre le refetch)
      qc.setQueriesData<Carpool[] | Carpool | undefined>(
        { queryKey: ["carpools"] },
        (old) =>
          Array.isArray(old) ? old.filter((c) => c.id !== deletedId) : old,
      );
      qc.invalidateQueries({ queryKey: ["carpools"] });
    },
  });
}

type SendCarpoolCancellationEmailsInput = {
  recipients: {
    email: string;
    passengerName: string;
  }[];
  driverName: string;
  tripRoute: string;
  tripDate: string;
  tripTime: string;
};

/** Envoie les emails d'annulation de covoiturage aux passagers ayant réservé. */
export function useSendCarpoolCancellationEmails() {
  return useMutation<
    { sent: number; message: string },
    Error,
    SendCarpoolCancellationEmailsInput
  >({
    mutationFn: async (input) => {
      const res = await fetch("/api/emails/carpool-cancellation", {
        method: "POST",
        credentials: "include",
        cache: "no-store",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      const responseBody = await res
        .json()
        .catch(() => ({ message: "Erreur lors de l'envoi des emails" }));

      if (!res.ok) {
        throw new Error(
          responseBody.message || "Erreur lors de l'envoi des emails",
        );
      }

      return responseBody as { sent: number; message: string };
    },
  });
}

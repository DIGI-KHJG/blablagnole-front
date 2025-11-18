import { CarpoolSchema } from "@/features/carpool/schemas";
import { Carpool } from "@/types/carpool";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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
    retry: false,
    staleTime: 30_000,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
}

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
          "Erreur lors de la récupération des covoiturages de l'utilisateur	"
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
    retry: false,
    staleTime: 30_000,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
}

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
          error.message || "Erreur lors de l'ajout du covoiturage"
        );
      }
      return res.json() as Promise<Carpool>;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["carpools"] });
    },
  });
}

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
          error.message || "Erreur lors de la modification du covoiturage"
        );
      }
      return res.json() as Promise<Carpool>;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["carpools"] });
    },
  });
}

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
          error.message || "Erreur lors de la suppression du covoiturage"
        );
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["carpools"] });
    },
  });
}

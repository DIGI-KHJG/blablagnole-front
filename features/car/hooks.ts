import { Car } from "@/types/car";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CarSchema } from "./schemas";

export function useGetDriverCarById(id?: number) {
  return useQuery<Car[]>({
    queryKey: ["cars", id],
    queryFn: async () => {
      const res = await fetch(`/api/cars/driver/${id}`, {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok)
        throw new Error(
          "Erreur lors de la récupération des véhicules personnels"
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

export function useAddCar() {
  const qc = useQueryClient();
  return useMutation<Car, Error, CarSchema>({
    mutationFn: async (input) => {
      const res = await fetch("/api/cars", {
        method: "POST",
        credentials: "include",
        cache: "no-store",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      if (!res.ok) {
        const error = await res
          .json()
          .catch(() => ({ message: "Erreur lors de l'ajout du véhicule" }));
        throw new Error(error.message || "Erreur lors de l'ajout du véhicule");
      }
      return res.json() as Promise<Car>;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["cars"] });
    },
  });
}

export function useEditCar() {
  const qc = useQueryClient();
  return useMutation<Car, Error, CarSchema>({
    mutationFn: async (input) => {
      const res = await fetch("/api/cars", {
        method: "PUT",
        credentials: "include",
        cache: "no-store",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      if (!res.ok) {
        const error = await res.json().catch(() => ({
          message: "Erreur lors de la modification du véhicule",
        }));
        throw new Error(
          error.message || "Erreur lors de la modification du véhicule"
        );
      }
      return res.json() as Promise<Car>;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["cars"] });
    },
  });
}

export function useDeleteCar() {
  const qc = useQueryClient();
  return useMutation<void, Error, number>({
    mutationFn: async (id) => {
      const res = await fetch(`/api/cars/${id}`, {
        method: "DELETE",
        credentials: "include",
        cache: "no-store",
      });
      if (!res.ok) {
        const error = await res.json().catch(() => ({
          message: "Erreur lors de la suppression du véhicule",
        }));
        throw new Error(
          error.message || "Erreur lors de la suppression du véhicule"
        );
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["cars"] });
    },
  });
}

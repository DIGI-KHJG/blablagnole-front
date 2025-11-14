import { Car } from "@/types/car";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ServiceCarSchema } from "./schemas";

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
          "Erreur lors de la récupération des véhicules de service"
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
          "Erreur lors de la récupération du véhicule de service"
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
          error.message || "Erreur lors de l'ajout du véhicule de service"
        );
      }
      return res.json() as Promise<Car>;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["service-cars"] });
    },
  });
}

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
            "Erreur lors de la modification du véhicule de service"
        );
      }
      return res.json() as Promise<Car>;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["service-cars"] });
    },
  });
}

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
            "Erreur lors de la suppression du véhicule de service"
        );
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["service-cars"] });
    },
  });
}

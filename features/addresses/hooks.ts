import { AddressSchema } from "@/features/addresses/schemas";
import { Address } from "@/types/address";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useGetAddresses() {
  return useQuery<Address[]>({
    queryKey: ["addresses"],
    queryFn: async () => {
      const res = await fetch("/api/addresses", {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok)
        throw new Error("Erreur lors de la récupération des adresses");
      const data = await res.json();
      return data.content;
    },
    retry: false,
    staleTime: 30_000,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
}

export function useGetAddressById(id?: string) {
  return useQuery<Address>({
    queryKey: ["addresses", id],
    queryFn: async () => {
      const res = await fetch(`/api/addresses/${id}`, {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok)
        throw new Error("Erreur lors de la récupération de l'adresse");
      const data = await res.json();
      return data;
    },
    retry: false,
    staleTime: 30_000,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
}

export function useAddAddress() {
  const qc = useQueryClient();
  return useMutation<Address, Error, AddressSchema>({
    mutationFn: async (input) => {
      const res = await fetch("/api/addresses", {
        method: "POST",
        credentials: "include",
        cache: "no-store",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      if (!res.ok) {
        const error = await res.json().catch(() => ({
          message: "Erreur lors de l'ajout de l'adresse",
        }));
        throw new Error(error.message || "Erreur lors de l'ajout de l'adresse");
      }
      return res.json() as Promise<Address>;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["addresses"] });
    },
  });
}

export function useEditAddress() {
  const qc = useQueryClient();
  return useMutation<Address, Error, AddressSchema>({
    mutationFn: async (input) => {
      const res = await fetch("/api/addresses", {
        method: "PUT",
        credentials: "include",
        cache: "no-store",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      if (!res.ok) {
        const error = await res.json().catch(() => ({
          message: "Erreur lors de la modification de l'adresse",
        }));
        throw new Error(
          error.message || "Erreur lors de la modification de l'adresse"
        );
      }
      return res.json() as Promise<Address>;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["addresses"] });
    },
  });
}

export function useDeleteAddress() {
  const qc = useQueryClient();
  return useMutation<void, Error, number>({
    mutationFn: async (id) => {
      const res = await fetch(`/api/addresses/${id}`, {
        method: "DELETE",
        credentials: "include",
        cache: "no-store",
      });
      if (!res.ok) {
        const error = await res.json().catch(() => ({
          message: "Erreur lors de la suppression de l'adresse",
        }));
        throw new Error(
          error.message || "Erreur lors de la suppression de l'adresse"
        );
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["addresses"] });
    },
  });
}

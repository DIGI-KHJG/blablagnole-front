import { User } from "@/types/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useGetUsers() {
  return useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch("/api/users", {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok)
        throw new Error("Erreur lors de la récupération des utilisateurs");
      const data = await res.json();
      return data.content;
    },
    retry: false,
    staleTime: 30_000,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
}

export function useGetUserById(id?: string) {
  return useQuery<User>({
    queryKey: ["users", id],
    queryFn: async () => {
      const res = await fetch(`/api/users/${id}`, {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok)
        throw new Error("Erreur lors de la récupération de l'utilisateur");
      const data = await res.json();
      return data;
    },
    retry: false,
    staleTime: 30_000,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
}

export function useDeleteUser() {
  const qc = useQueryClient();
  return useMutation<void, Error, number>({
    mutationFn: async (id) => {
      const res = await fetch(`/api/users/${id}`, {
        method: "DELETE",
        credentials: "include",
        cache: "no-store",
      });
      if (!res.ok) {
        const error = await res.json().catch(() => ({
          message: "Erreur lors de la suppression de l'utilisateur",
        }));
        throw new Error(
          error.message || "Erreur lors de la suppression de l'utilisateur"
        );
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["users"] });
    },
  });
}

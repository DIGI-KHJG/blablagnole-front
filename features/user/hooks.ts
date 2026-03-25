import { User } from "@/types/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

/** Récupère la liste des utilisateurs (réservé aux admins). */
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

/**
 * Récupère un utilisateur par son identifiant.
 * @param id Identifiant de l’utilisateur (optionnel, désactive la requête si absent).
 */
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

/** Supprime un utilisateur à partir de son id, met à jour le cache puis actualise la liste des utilisateurs. */
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
          error.message || "Erreur lors de la suppression de l'utilisateur",
        );
      }
    },
    onSuccess: (_, deletedId) => {
      qc.setQueriesData<User[] | User | undefined>(
        { queryKey: ["users"] },
        (old) =>
          Array.isArray(old) ? old.filter((c) => c.id !== deletedId) : old,
      );
      qc.invalidateQueries({ queryKey: ["users"] });
    },
  });
}

import { User } from "@/types/user";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Collaborateur } from "./ui/columns";


export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`/api/users/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Erreur lors de la suppression");
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });
}
export function useGetUser(id: number) {
  return useQuery<User>({
    queryKey: ["user", id],
    queryFn: async () => {
      const res = await fetch(`/api/users/${id}`, {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Impossible de récupérer l'utilisateur");
      }

      return res.json();
    },
    retry: false,
    staleTime: 30_000,
  });
}
export function useGetUserById(id: number) {
  return useQuery({
    queryKey: ["user", id],
    queryFn: async () => {
      const res = await fetch(`/api/users/${id}`, {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Erreur lors du chargement de l'utilisateur");
      }

      const data = await res.json();

      return {
        id: data.id,
        firstName: data.firstName ?? data.first_name,
        lastName: data.lastName ?? data.last_name,
        full_name: data.fullName ?? data.full_name,
        email: data.email,
        role: data.role,
        profilePicture: data.profilePicture ?? data.profile_picture,
      };
    },
  });
}
export function useGetUsers() {
  return useQuery<Collaborateur[]>({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch("/api/users", {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok)
        throw new Error("Erreur lors de la récupération des utilisateurs");

      const data = await res.json();

      const users = data.content ?? data; // 👈 sécurise le format

      return users.map((u: any) => ({
        id: u.id,
        firstName: u.firstName ?? u.first_name,
        lastName: u.lastName ?? u.last_name,
        full_name: u.fullName ?? u.full_name,
        email: u.email,
        role: u.role,
        profilePicture: u.profilePicture ?? u.profile_picture,
      }));
    },
  });
}

"use client";

import { Role, User } from "@/types/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useGetCurrentUser() {
  return useQuery<User>({
    queryKey: ["auth", "me"],
    queryFn: async () => {
      const res = await fetch("/api/auth/me", {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Non connecté");
      return res.json();
    },
    retry: false,
    staleTime: 30_000,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
}

export function useRegister() {
  const qc = useQueryClient();
  return useMutation<
    User,
    Error,
    {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
      role: Role;
      profilePicture: string;
    }
  >({
    mutationFn: async (input) => {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        credentials: "include",
        cache: "no-store",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      if (!res.ok) {
        const error = await res
          .json()
          .catch(() => ({ message: "Inscription échouée" }));
        throw new Error(error.message || "Inscription échouée");
      }
      return res.json() as Promise<User>;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["auth", "me"] });
    },
  });
}

export function useLogin() {
  const qc = useQueryClient();
  return useMutation<User, Error, { email: string; password: string }>({
    mutationFn: async (input) => {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        credentials: "include",
        cache: "no-store",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      if (!res.ok) {
        const error = await res
          .json()
          .catch(() => ({ message: "Connexion échouée" }));
        throw new Error(error.message || "Connexion échouée");
      }
      return res.json() as Promise<User>;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["auth", "me"] });
    },
  });
}

export function useLogout() {
  const qc = useQueryClient();
  return useMutation<void, Error, void>({
    mutationFn: async () => {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
        cache: "no-store",
      });
      if (!res.ok) {
        const error = await res
          .json()
          .catch(() => ({ message: "Déconnexion échouée" }));
        throw new Error(error.message || "Déconnexion échouée");
      }
    },
    onSuccess: () => {
      qc.removeQueries({ queryKey: ["auth", "me"] });
    },
  });
}

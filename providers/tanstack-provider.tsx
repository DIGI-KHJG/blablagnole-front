"use client";

import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useState } from "react";

/**
 * Enveloppe l'application pour activer React Query (TanStack Query).
 *
 * Rôle principal : fournir un `QueryClient` unique à tous les écrans, avec :
 * - des valeurs par défaut pour les requêtes (fraîcheur du cache, refocus) ;
 * - une gestion d'erreur globale qui resynchronise l'utilisateur connecté (`auth/me`)
 *   ou redirige vers la connexion si la session est invalide sur le dashboard.
 */
export function TanstackProvider({ children }: { children: React.ReactNode }) {
  const [client] = useState(() => {
    const qc = new QueryClient({
      queryCache: new QueryCache({
        onError: (_error, query) => {
          // React Query appelle ce hook quand une requête GET (useQuery) échoue.
          const isAuthQuery =
            query.queryKey[0] === "auth" && query.queryKey[1] === "me";

          if (isAuthQuery) {
            // La requête `/api/auth/me` à échoué.
            // On efface donc toute donnée "utilisateur" gardée par React Query :
            // sinon l'interface pourrait encore afficher quelqu'un de connecté alors que la requête a échoué.
            qc.removeQueries({ queryKey: ["auth", "me"] });
            if (
              typeof window !== "undefined" &&
              window.location.pathname.startsWith("/dashboard")
            ) {
              // Sur le dashboard, une session expirée doit renvoyer vers la page de connexion.
              window.location.href = "/connexion";
            }
          } else {
            // Échec d'une autre API (voitures, réservations, etc.) : parfois c'est un 401 caché.
            // En forçant un nouveau fetch de auth/me, l'UI se met d'accord avec le vrai état de connexion
            // (connecté, déconnecté, ou rôle mis à jour).
            qc.invalidateQueries({ queryKey: ["auth", "me"] });
          }
        },
      }),
      mutationCache: new MutationCache({
        onError: () => {
          // Les mutations = actions POST / PUT / PATCH / DELETE (useMutation), pas les simples lectures.
          // Si l'action échoue, les cookies de session peuvent être invalides sans qu'une query ait encore tourné.
          // Invalider auth/me déclenche une re-vérification.
          qc.invalidateQueries({ queryKey: ["auth", "me"] });
        },
      }),
      defaultOptions: {
        queries: {
          // Les données sont considérées "encore valides" pendant 1 minute avant un refetch automatique.
          staleTime: 60_000,
          // Quand l'utilisateur revient sur l'onglet du navigateur, les requêtes peuvent se rafraîchir.
          refetchOnWindowFocus: true,
        },
      },
    });
    return qc;
  });

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

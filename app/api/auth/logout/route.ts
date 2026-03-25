import { proxyToSpring } from "@/lib/api/proxyToSpring";
import { route } from "@/lib/api/zodRoute";

/**
 * Déconnecte l'utilisateur.
 * La requête est transmise au backend.
 */
export const POST = route.handler(async () => {
  return proxyToSpring("/auth/logout", {
    method: "POST",
  });
});

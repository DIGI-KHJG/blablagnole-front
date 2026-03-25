import { proxyToSpring } from "@/lib/api/proxyToSpring";
import { route } from "@/lib/api/zodRoute";

/**
 * Récupère l'utilisateur connecté depuis le backend.
 */
export const GET = route.handler(async () => {
  return proxyToSpring("/auth/me", {
    method: "GET",
  });
});

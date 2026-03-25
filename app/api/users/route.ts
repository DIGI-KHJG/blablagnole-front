import { proxyToSpring } from "@/lib/api/proxyToSpring";
import { route } from "@/lib/api/zodRoute";

/**
 * Récupère la liste des utilisateurs depuis le backend.
 */
export const GET = route.handler(async () => {
  return proxyToSpring("/users", {
    method: "GET",
  });
});

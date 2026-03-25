import { proxyToSpring } from "@/lib/api/proxyToSpring";
import { route } from "@/lib/api/zodRoute";

/**
 * Renouvelle la session.
 * La requête est transmise au backend.
 */
export const POST = route.handler(async () => {
  return proxyToSpring("/auth/refresh", {
    method: "POST",
  });
});

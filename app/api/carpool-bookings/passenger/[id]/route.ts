import { proxyToSpring } from "@/lib/api/proxyToSpring";
import { route } from "@/lib/api/zodRoute";
import { z } from "zod";

/**
 * Récupère les réservations d'un passager avec `id`.
 * La requête est transmise au backend.
 */
export const GET = route
  .params(z.object({ id: z.string() }))
  .handler(async (request, { params }) => {
    return proxyToSpring(`/carpool-bookings/passenger/${params.id}`, {
      method: "GET",
    });
  });

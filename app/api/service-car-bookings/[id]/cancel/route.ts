import { proxyToSpring } from "@/lib/api/proxyToSpring";
import { route } from "@/lib/api/zodRoute";
import { z } from "zod";

/**
 * Annule la réservation de véhicule de service avec `id`.
 * La requête est transmise au backend.
 */
export const PATCH = route
  .params(z.object({ id: z.string() }))
  .handler(async (request, { params }) => {
    return proxyToSpring(`/service-car-bookings/${params.id}/cancel`, {
      method: "PATCH",
    });
  });

import { proxyToSpring } from "@/lib/api/proxyToSpring";
import { route } from "@/lib/api/zodRoute";
import { z } from "zod";

/**
 * Annule la réservation de covoiturage avec `id`.
 * La requête est transmise au backend.
 */
export const PATCH = route

  .params(z.object({ id: z.string() }))
  .handler(async (request, { params }) => {
    return proxyToSpring(`/carpool-bookings/${params.id}/cancel`, {
      method: "PATCH",
    });
  });

import { proxyToSpring } from "@/lib/api/proxyToSpring";
import { route } from "@/lib/api/zodRoute";
import { z } from "zod";

/**
 * Récupère ou supprime la réservation de covoiturage avec `id`.
 * La requête est transmise au backend.
 */
export const GET = route
  .params(z.object({ id: z.string() }))
  .handler(async (request, { params }) => {
    return proxyToSpring(`/carpool-bookings/${params.id}`, {
      method: "GET",
    });
  });

export const DELETE = route
  .params(z.object({ id: z.string() }))
  .handler(async (request, { params }) => {
    return proxyToSpring(`/carpool-bookings/${params.id}`, {
      method: "DELETE",
    });
  });

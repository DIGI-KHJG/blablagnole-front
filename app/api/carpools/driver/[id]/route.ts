import { proxyToSpring } from "@/lib/api/proxyToSpring";
import { route } from "@/lib/api/zodRoute";
import { z } from "zod";

/**
 * Récupère les covoiturages du conducteur avec `id`.
 */
export const GET = route
  .params(z.object({ id: z.string() }))
  .handler(async (request, { params }) => {
    return proxyToSpring(`/carpools/driver/${params.id}`, {
      method: "GET",
    });
  });

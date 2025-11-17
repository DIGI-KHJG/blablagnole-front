import { proxyToSpring } from "@/lib/api/proxyToSpring";
import { route } from "@/lib/api/zodRoute";
import { z } from "zod";

export const GET = route
  .params(z.object({ id: z.string() }))
  .handler(async (request, { params }) => {
    return proxyToSpring(`/service-car-bookings/driver/${params.id}`, {
      method: "GET",
    });
  });

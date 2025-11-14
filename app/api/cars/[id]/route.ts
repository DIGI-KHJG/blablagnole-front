import { proxyToSpring } from "@/lib/api/proxyToSpring";
import { route } from "@/lib/api/zodRoute";
import { z } from "zod";

export const DELETE = route
  .params(z.object({ id: z.string() }))
  .handler(async (request, { params }) => {
    return proxyToSpring(`/cars/${params.id}`, {
      method: "DELETE",
    });
  });

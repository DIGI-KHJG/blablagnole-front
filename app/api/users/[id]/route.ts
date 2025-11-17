import { proxyToSpring } from "@/lib/api/proxyToSpring";
import { route } from "@/lib/api/zodRoute";

export const DELETE = route
  .handler(async (request, { params }) => {
    const { id } = params;

    return proxyToSpring(`/users/${id}`, {
      method: "DELETE",
    });
  });

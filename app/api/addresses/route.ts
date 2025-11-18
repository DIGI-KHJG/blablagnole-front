import { proxyToSpring } from "@/lib/api/proxyToSpring";
import { route } from "@/lib/api/zodRoute";

export const POST = route.handler(async (request, { body }) => {
  return proxyToSpring("/addresses", {
    method: "POST",
    body: {
      street: body.street,
      city: body.city,
      postalCode: body.postalCode,
      country: body.country,
    },
  });
});

export const PUT = route.handler(async (request, { body }) => {
  return proxyToSpring("/addresses", {
    method: "PUT",
    body: {
      id: body.id,
      street: body.street,
      city: body.city,
      postalCode: body.postalCode,
      country: body.country,
    },
  });
});

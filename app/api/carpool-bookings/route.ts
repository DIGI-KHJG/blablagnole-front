import { proxyToSpring } from "@/lib/api/proxyToSpring";
import { route } from "@/lib/api/zodRoute";

export const POST = route.handler(async (request, { body }) => {
  return proxyToSpring("/carpool-bookings", {
    method: "POST",
    body: {
      carpoolId: body.carpoolId,
      passengerId: body.passengerId,
      status: body.status,
    },
  });
});

export const PUT = route.handler(async (request, { body }) => {
  return proxyToSpring("/carpool-bookings", {
    method: "PUT",
    body: {
      id: body.id,
      carpoolId: body.carpoolId,
      passengerId: body.passengerId,
      status: body.status,
    },
  });
});

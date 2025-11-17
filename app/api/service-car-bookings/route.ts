import { proxyToSpring } from "@/lib/api/proxyToSpring";
import { route } from "@/lib/api/zodRoute";

export const POST = route.handler(async (request, { body }) => {
  return proxyToSpring("/service-car-bookings", {
    method: "POST",
    body: {
      serviceCarId: body.serviceCarId,
      driverId: body.driverId,
      startAt: body.startAt,
      endAt: body.endAt,
      status: body.status,
    },
  });
});

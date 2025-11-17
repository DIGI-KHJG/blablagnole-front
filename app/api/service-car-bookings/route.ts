import { proxyToSpring } from "@/lib/api/proxyToSpring";
import { route } from "@/lib/api/zodRoute";

export const GET = route.handler(async () => {
  return proxyToSpring("/service-car-bookings", {
    method: "GET",
  });
});

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

export const PUT = route.handler(async (request, { body }) => {
  return proxyToSpring("/service-car-bookings", {
    method: "PUT",
    body: {
      id: body.id,
      serviceCarId: body.serviceCarId,
      driverId: body.driverId,
      startAt: body.startAt,
      endAt: body.endAt,
      status: body.status,
    },
  });
});

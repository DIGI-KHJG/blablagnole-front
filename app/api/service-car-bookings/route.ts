import { proxyToSpring } from "@/lib/api/proxyToSpring";
import { toLocalDateTimeString } from "@/lib/utils";
import { route } from "@/lib/api/zodRoute";

/**
 * Selon la méthode HTTP, récupère la liste, crée ou met à jour une réservation de véhicule de service.
 */
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
      startAt: toLocalDateTimeString(body.startAt),
      endAt: toLocalDateTimeString(body.endAt),
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
      startAt: toLocalDateTimeString(body.startAt),
      endAt: toLocalDateTimeString(body.endAt),
      status: body.status,
    },
  });
});

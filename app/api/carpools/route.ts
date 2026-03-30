import { proxyToSpring } from "@/lib/api/proxyToSpring";
import { toLocalDateTimeString } from "@/lib/utils";
import { route } from "@/lib/api/zodRoute";

/**
 * Selon la méthode HTTP, récupère la liste, crée ou met à jour un covoiturage.
 */
export const GET = route.handler(async () => {
  return proxyToSpring("/carpools", {
    method: "GET",
  });
});

export const POST = route.handler(async (request, { body }) => {
  return proxyToSpring("/carpools", {
    method: "POST",
    body: {
      driverId: body.driverId,
      carId: body.carId,
      fromAddress: {
        street: body.fromAddress.street,
        city: body.fromAddress.city,
        postalCode: body.fromAddress.postalCode,
        country: body.fromAddress.country,
      },
      toAddress: {
        street: body.toAddress.street,
        city: body.toAddress.city,
        postalCode: body.toAddress.postalCode,
        country: body.toAddress.country,
      },
      distanceKm: body.distanceKm,
      durationMin: body.durationMin,
      seatsTotal: body.seatsTotal,
      seatsRemaining: body.seatsRemaining,
      departureAt: toLocalDateTimeString(body.departureAt),
      status: body.status,
    },
  });
});

export const PUT = route.handler(async (request, { body }) => {
  return proxyToSpring("/carpools", {
    method: "PUT",
    body: {
      id: body.id,
      driverId: body.driverId,
      carId: body.carId,
      fromAddress: {
        street: body.fromAddress.street,
        city: body.fromAddress.city,
        postalCode: body.fromAddress.postalCode,
        country: body.fromAddress.country,
      },
      toAddress: {
        street: body.toAddress.street,
        city: body.toAddress.city,
        postalCode: body.toAddress.postalCode,
        country: body.toAddress.country,
      },
      distanceKm: body.distanceKm,
      durationMin: body.durationMin,
      seatsTotal: body.seatsTotal,
      seatsRemaining: body.seatsRemaining,
      departureAt: toLocalDateTimeString(body.departureAt),
      status: body.status,
    },
  });
});

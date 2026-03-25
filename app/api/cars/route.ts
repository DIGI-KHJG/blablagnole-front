import { proxyToSpring } from "@/lib/api/proxyToSpring";
import { route } from "@/lib/api/zodRoute";

/**
 * Ajoute ou modifie une voiture.
 * La requête est transmise au backend.
 */
export const POST = route.handler(async (request, { body }) => {
  return proxyToSpring("/cars", {
    method: "POST",
    body: {
      driverId: body.driverId,
      registrationPlate: body.registrationPlate,
      brand: body.brand,
      model: body.model,
      category: body.category,
      motorisation: body.motorisation,
      co2Emission: body.co2Emission,
      seats: body.seats,
      color: body.color,
      imageUrl: body.imageUrl,
    },
  });
});

export const PUT = route.handler(async (request, { body }) => {
  return proxyToSpring("/cars", {
    method: "PUT",
    body: {
      id: body.id,
      driverId: body.driverId,
      registrationPlate: body.registrationPlate,
      brand: body.brand,
      model: body.model,
      category: body.category,
      motorisation: body.motorisation,
      co2Emission: body.co2Emission,
      seats: body.seats,
      color: body.color,
      imageUrl: body.imageUrl,
    },
  });
});

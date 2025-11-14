import { proxyToSpring } from "@/lib/api/proxyToSpring";
import { route } from "@/lib/api/zodRoute";

export const GET = route.handler(async () => {
  return proxyToSpring("/service-cars", {
    method: "GET",
  });
});

export const POST = route.handler(async (request, { body }) => {
  return proxyToSpring("/service-cars", {
    method: "POST",
    body: {
      registrationPlate: body.registrationPlate,
      brand: body.brand,
      model: body.model,
      category: body.category,
      motorisation: body.motorisation,
      co2Emission: body.co2Emission,
      seats: body.seats,
      color: body.color,
      imageUrl: body.imageUrl,
      status: body.status,
    },
  });
});

export const PUT = route.handler(async (request, { body }) => {
  return proxyToSpring("/service-cars", {
    method: "PUT",
    body: {
      id: body.id,
      registrationPlate: body.registrationPlate,
      brand: body.brand,
      model: body.model,
      category: body.category,
      motorisation: body.motorisation,
      co2Emission: body.co2Emission,
      seats: body.seats,
      color: body.color,
      imageUrl: body.imageUrl,
      status: body.status,
    },
  });
});

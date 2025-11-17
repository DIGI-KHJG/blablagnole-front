import { proxyToSpring } from "@/lib/api/proxyToSpring";
import { route } from "@/lib/api/zodRoute";

export const GET = route.handler(async () => {
  return proxyToSpring("/users", {
    method: "GET",
  });
});

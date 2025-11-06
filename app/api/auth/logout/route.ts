import { proxyToSpring } from "@/lib/api/proxyToSpring";
import { route } from "@/lib/api/zodRoute";
export const POST = route.handler(async () => {
  return proxyToSpring("/auth/logout", {
    method: "POST",
  });
});

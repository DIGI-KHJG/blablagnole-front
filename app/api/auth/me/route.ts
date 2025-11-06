import { proxyToSpring } from "@/lib/api/proxyToSpring";
import { route } from "@/lib/api/zodRoute";

export const GET = route.handler(async (request) => {
  return proxyToSpring("/auth/me", {
    method: "GET",
    headers: {
      cookie: request.headers.get("cookie") ?? "",
      authorization: request.headers.get("authorization") ?? "",
    },
  });
});

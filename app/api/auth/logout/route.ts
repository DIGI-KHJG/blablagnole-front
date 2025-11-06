import { proxyToSpring } from "@/lib/api/proxyToSpring";
import { route } from "@/lib/api/zodRoute";
export const POST = route.handler(async (request) => {return proxyToSpring("/auth/logout", {
    method: "POST",
    headers: {
      cookie: request.headers.get("cookie") ?? "",
      authorization: request.headers.get("authorization") ?? "",
    },
  });
});
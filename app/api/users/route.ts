import { proxyToSpring } from "@/lib/api/proxyToSpring";
import { route } from "@/lib/api/zodRoute";
import { z } from "zod";

export const GET = route
  .handler(async (request, { params }) => {
    return proxyToSpring("/users", {
      method: "GET",
    });
  });

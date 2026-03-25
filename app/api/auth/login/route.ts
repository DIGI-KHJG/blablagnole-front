import { loginSchema } from "@/features/auth/schemas";
import { proxyToSpring } from "@/lib/api/proxyToSpring";
import { route } from "@/lib/api/zodRoute";

/**
 * Connecte un utilisateur avec `email` et `password`.
 * La requête est transmise au backend.
 */
export const POST = route
  .body(loginSchema)
  .handler(async (request, { body }) => {
    return proxyToSpring("/auth/login", {
      method: "POST",
      body: {
        email: body.email,
        password: body.password,
      },
    });
  });

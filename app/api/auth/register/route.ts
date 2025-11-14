import { registerSchema } from "@/features/auth/schemas";
import { proxyToSpring } from "@/lib/api/proxyToSpring";
import { route } from "@/lib/api/zodRoute";

const registerBodySchema = registerSchema.omit({ passwordConfirmation: true });

export const POST = route
  .body(registerBodySchema)
  .handler(async (request, { body }) => {
    return proxyToSpring("/auth/register", {
      method: "POST",
      body: {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        password: body.password,
        role: body.role,
        profilePicture: body.profilePicture,
      },
    });
  });

import { createZodRoute } from "next-zod-route";

export const route = createZodRoute({
  handleServerError: (error: Error) => {
    return new Response(
      JSON.stringify({ message: error.message || "Internal server error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  },
});

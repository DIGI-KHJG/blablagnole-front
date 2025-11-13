import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1) Vérifie l'authentification UNIQUEMENT pour les pages /dashboard/*
  if (pathname.startsWith("/dashboard")) {
    // Vérifie la session en appelant le BFF /api/auth/me
    //    (les cookies httpOnly du domaine Next sont envoyés automatiquement)
    let meRes = await fetch(new URL("/api/auth/me", request.url), {
      method: "GET",
      headers: {
        Cookie: request.headers.get("cookie") ?? "",
      },
      cache: "no-store",
    });

    // Si 401 → on tente un refresh
    if (meRes.status === 401) {
      const refreshRes = await fetch(
        new URL("/api/auth/refresh", request.url),
        {
          method: "POST",
          headers: { Cookie: request.headers.get("cookie") ?? "" },
          cache: "no-store",
        }
      );

      // refresh KO → redirect vers /connexion
      if (!refreshRes.ok) {
        const url = request.nextUrl.clone();
        url.pathname = "/connexion";
        return NextResponse.redirect(url);
      }

      // refresh OK → re-check /me
      meRes = await fetch(new URL("/api/auth/me", request.url), {
        method: "GET",
        headers: { Cookie: request.headers.get("cookie") ?? "" },
        cache: "no-store",
      });
    }

    // Si la réponse n'est toujours pas OK → redirect vers /connexion
    if (!meRes.ok) {
      const url = request.nextUrl.clone();
      url.pathname = "/connexion";
      return NextResponse.redirect(url);
    }

    // Ici on est authentifié → vérification des permissions par rôle
    const user = (await meRes
      .clone()
      .json()
      .catch(() => null)) as { role?: "ADMIN" | "COLLABORATOR" } | null;

    // COLLABORATOR n'a pas accès à /dashboard/vehicules et /dashboard/collaborateurs
    if (user?.role === "COLLABORATOR") {
      if (
        pathname.startsWith("/dashboard/parc-de-vehicules") ||
        pathname.startsWith("/dashboard/collaborateurs")
      ) {
        // Pas autorisé → redirection vers le dashboard principal
        const url = request.nextUrl.clone();
        url.pathname = "/dashboard";
        return NextResponse.redirect(url);
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api/|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};

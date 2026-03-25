import { NextResponse, type NextRequest } from "next/server";

/**
 * Vérifie l'accès aux pages du dashboard avant d'afficher la page.
 *
 * Ce middleware fait 3 choses principales :
 * - vérifie si l'utilisateur est connecté (via `/api/auth/me`) ;
 * - tente un refresh de session si l'utilisateur n'est plus authentifié ;
 * - bloque certaines pages pour le rôle `COLLABORATOR` et redirige vers une page autorisée.
 *
 * @param request Requête entrante.
 * @returns Continue la navigation (`NextResponse.next()`) ou redirige l'utilisateur.
 */
export async function proxy(request: NextRequest) {
  // Adresse demandée par l'utilisateur (ex: "/dashboard/covoiturages").
  const { pathname } = request.nextUrl;

  // On ne contrôle la connexion que pour le tableau de bord.
  // Le reste du site (accueil, connexion, etc.) passe sans cette vérification.
  if (pathname.startsWith("/dashboard")) {
    // Demande au backend : "qui est connecté ?".
    // On recopie les cookies de la requête pour que la session soit reconnue.
    let meRes = await fetch(new URL("/api/auth/me", request.url), {
      method: "GET",
      headers: {
        Cookie: request.headers.get("cookie") ?? "",
      },
      cache: "no-store",
    });

    // Code 401 = plus connecté (ou session expirée). On tente de la renouveler.
    if (meRes.status === 401) {
      const refreshRes = await fetch(
        new URL("/api/auth/refresh", request.url),
        {
          method: "POST",
          headers: { Cookie: request.headers.get("cookie") ?? "" },
          cache: "no-store",
        },
      );

      // Le renouvellement a échoué : on envoie l'utilisateur sur la page de connexion.
      if (!refreshRes.ok) {
        const url = request.nextUrl.clone();
        url.pathname = "/connexion";
        return NextResponse.redirect(url);
      }

      // Renouvellement OK : on redemande "qui est connecté ?" avec les nouveaux cookies.
      meRes = await fetch(new URL("/api/auth/me", request.url), {
        method: "GET",
        headers: { Cookie: request.headers.get("cookie") ?? "" },
        cache: "no-store",
      });
    }

    // Toujours pas OK après tout ça : accès refusé, même destination que ci-dessus.
    if (!meRes.ok) {
      const url = request.nextUrl.clone();
      url.pathname = "/connexion";
      return NextResponse.redirect(url);
    }

    // À ce stade on a un utilisateur connecté. On lit son rôle pour les règles d'accès.
    // `.clone()` évite de "consommer" le corps de la réponse une seule fois.
    const user = (await meRes
      .clone()
      .json()
      .catch(() => null)) as { role?: "ADMIN" | "COLLABORATOR" } | null;

    // Un collaborateur ne doit pas voir certaines sections réservées à l'admin.
    if (user?.role === "COLLABORATOR") {
      if (
        pathname === "/dashboard/covoiturages" ||
        pathname.startsWith("/dashboard/parc-de-vehicules") ||
        pathname.startsWith("/dashboard/collaborateurs")
      ) {
        // On le renvoie vers une page du dashboard qui lui est autorisée.
        const url = request.nextUrl.clone();
        url.pathname = "/dashboard/covoiturages/mes-annonces";
        return NextResponse.redirect(url);
      }
    }
  }

  // Aucun blocage : la page demandée peut s'afficher normalement.
  return NextResponse.next();
}

// Limite l'interception aux navigations "pages", pas aux assets ni aux routes /api/*.
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api/|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};

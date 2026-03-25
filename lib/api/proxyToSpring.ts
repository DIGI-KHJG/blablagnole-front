import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const SPRING = process.env.SPRING_API_URL!;

type Opts = {
  method?: string;
  headers?: Record<string, string>;
  body?: unknown;
  rawBody?: BodyInit | null;
  contentType?: string | null;
};

/**
 * Envoie une requête au backend Spring et renvoie une réponse compatible Next.js.
 *
 * Cette fonction sert de "pont" entre les routes API Next.js et l'API Spring :
 * - elle reprend les cookies de la requête courante et les transmet au backend ;
 * - elle prépare le body (JSON ou brut) selon les options passées ;
 * - elle renvoie la réponse avec le bon statut, le bon contenu et les `set-cookie`.
 *
 * @param path Chemin backend à appeler (ex: `/cars`).
 * @param opts Configuration de la requête (méthode HTTP, headers, body JSON ou body brut).
 * @returns Une `NextResponse` prête à être renvoyée par la route API.
 */
export async function proxyToSpring(path: string, opts: Opts = {}) {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${encodeURIComponent(c.value)}`)
    .join("; ");

  const headers: Record<string, string> = {
    ...(opts.headers || {}),
    Cookie: cookieHeader,
  };

  let body: BodyInit | null | undefined;

  if (opts.rawBody !== undefined) {
    body = opts.rawBody ?? null;
    if (opts.contentType) headers["Content-Type"] = opts.contentType;
  } else if (opts.body !== undefined) {
    headers["Content-Type"] = opts.contentType ?? "application/json";
    body = JSON.stringify(opts.body);
  }

  const upstream = await fetch(`${SPRING}${path}`, {
    method: opts.method ?? "GET",
    headers,
    body,
    cache: "no-store",
  });

  // Pour une réponse 204 No Content, ne pas inclure de corps.
  if (upstream.status === 204) {
    const out = new NextResponse(null, {
      status: 204,
    });

    upstream.headers.forEach((value, key) => {
      if (key.toLowerCase() === "set-cookie") {
        out.headers.append("set-cookie", value);
      }
    });

    return out;
  }

  const text = await upstream.text();
  const isJson = upstream.headers
    .get("content-type")
    ?.includes("application/json");
  const out = new NextResponse(text, {
    status: upstream.status,
    headers: { "Content-Type": isJson ? "application/json" : "text/plain" },
  });

  upstream.headers.forEach((value, key) => {
    if (key.toLowerCase() === "set-cookie") {
      out.headers.append("set-cookie", value);
    }
  });

  return out;
}

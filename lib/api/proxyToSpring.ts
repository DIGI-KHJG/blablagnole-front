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

  // For 204 No Content, we must not include a body
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

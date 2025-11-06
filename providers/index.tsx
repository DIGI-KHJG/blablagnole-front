"use client";

import { TanstackProvider } from "./tanstack-provider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return <TanstackProvider>{children}</TanstackProvider>;
}

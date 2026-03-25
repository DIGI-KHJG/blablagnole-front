"use client";

import { NuqsAdapter } from "nuqs/adapters/next/app";
import { TanstackProvider } from "./tanstack-provider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <NuqsAdapter>
      <TanstackProvider>{children}</TanstackProvider>
    </NuqsAdapter>
  );
}

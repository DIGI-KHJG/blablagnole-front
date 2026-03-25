"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function SearchCarpoolCardSkeleton() {
  return (
    <div className="rounded-2xl border border-border border-l-4 border-l-border bg-card p-6 shadow-sm">
      <div className="mb-6 flex items-start justify-between">
        <div className="flex items-center gap-4">
          <Skeleton className="h-14 w-14 rounded-full" />
          <Skeleton className="h-5 w-28" />
        </div>
        <Skeleton className="h-8 w-16 rounded-full" />
      </div>
      <div className="mb-6 flex items-center gap-4">
        <div className="flex flex-col items-center">
          <Skeleton className="h-3 w-3 rounded-full" />
          <Skeleton className="my-1 h-8 w-0.5" />
          <Skeleton className="h-3 w-3 rounded-full" />
        </div>
        <div className="flex-1 space-y-4">
          <div className="flex items-baseline gap-2">
            <Skeleton className="h-4 w-10" />
            <Skeleton className="h-4 w-40" />
          </div>
          <div className="flex items-baseline gap-2">
            <Skeleton className="h-4 w-10" />
            <Skeleton className="h-4 w-36" />
          </div>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-7 w-20 rounded-full" />
        </div>
        <Skeleton className="h-11 w-28 rounded-full" />
      </div>
    </div>
  );
}

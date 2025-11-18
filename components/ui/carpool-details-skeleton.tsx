import { DetailRowSkeleton } from "@/components/shared/details-row";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function CarpoolDetailsSkeleton() {
  return (
    <div className="bg-background">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <Skeleton className="h-6 w-24 rounded-full" />
          </div>
          <Skeleton className="h-10 w-96 mb-2" />
          <Skeleton className="h-6 w-64" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 items-stretch">
        <div className="col-span-1 flex">
          {/* Détails du trajet skeleton */}
          <Card className="border-border flex-1 h-full">
            <CardHeader>
              <CardTitle className="text-lg">
                <Skeleton className="h-6 w-40" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex flex-col items-center pt-1">
                    <Skeleton className="w-3 h-3 rounded-full" />
                    <Skeleton className="w-0.5 h-8 my-1" />
                    <Skeleton className="w-3 h-3 rounded-full" />
                  </div>
                  <div className="flex-1 min-w-0 space-y-4">
                    <div>
                      <Skeleton className="h-4 w-16 mb-1" />
                      <Skeleton className="h-5 w-32 mb-1" />
                      <Skeleton className="h-4 w-48 mb-1" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                    <div>
                      <Skeleton className="h-4 w-16 mb-1" />
                      <Skeleton className="h-5 w-32 mb-1" />
                      <Skeleton className="h-4 w-48 mb-1" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <DetailRowSkeleton />
                    <DetailRowSkeleton />
                    <DetailRowSkeleton />
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-border">
                <Skeleton className="h-10 w-full rounded-md" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="col-span-1">
          {/* Conducteur et Véhicule skeleton */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg">
                <Skeleton className="h-6 w-48" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Informations du conducteur skeleton */}
              <div className="mb-6 pb-6 border-b border-border">
                <div className="flex items-center gap-4">
                  <Skeleton className="h-16 w-16 rounded-full" />
                  <div className="flex-1">
                    <Skeleton className="h-6 w-40 mb-2" />
                    <Skeleton className="h-4 w-56" />
                  </div>
                </div>
              </div>

              {/* Image du véhicule skeleton */}
              <div className="relative h-64 w-full overflow-hidden rounded-lg mb-6 bg-muted">
                <Skeleton className="h-full w-full" />
                <div className="absolute inset-0 bg-linear-to-t from-black/40 via-black/0 to-transparent" />
                <div className="absolute bottom-4 left-4 flex gap-2 flex-wrap">
                  <Skeleton className="h-6 w-20 rounded-full" />
                  <Skeleton className="h-6 w-24 rounded-full" />
                </div>
              </div>

              {/* Titre du véhicule skeleton */}
              <div className="mb-4">
                <Skeleton className="h-7 w-64" />
              </div>

              {/* Détails du véhicule skeleton */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <DetailRowSkeleton />
                  <DetailRowSkeleton />
                  <DetailRowSkeleton />
                </div>

                <div className="space-y-4">
                  <DetailRowSkeleton />
                  <DetailRowSkeleton />
                  <DetailRowSkeleton />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

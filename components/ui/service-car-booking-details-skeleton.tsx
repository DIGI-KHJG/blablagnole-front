import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ServiceCarBookingDetailsSkeleton() {
  return (
    <div className="bg-background">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="col-span-1">
          {/* Bloc skeleton : image du véhicule */}
          <div className="relative h-96 w-full overflow-hidden rounded-lg mb-6 bg-muted">
            <Skeleton className="h-full w-full" />
            <div className="absolute bottom-4 left-4 flex gap-2 flex-wrap">
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-24 rounded-full" />
            </div>
          </div>

          {/* Bloc skeleton : titre */}
          <div className="mb-4">
            <Skeleton className="h-10 w-64 mb-2" />
          </div>

          {/* Bloc skeleton : carte détails véhicule */}
          <Card className="border-border flex-1">
            <CardHeader>
              <CardTitle className="text-lg">
                <Skeleton className="h-6 w-40" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-5 w-5 rounded" />
                    <div className="flex-1">
                      <Skeleton className="h-4 w-20 mb-1" />
                      <Skeleton className="h-5 w-32" />
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-5 w-5 rounded" />
                    <div className="flex-1">
                      <Skeleton className="h-4 w-24 mb-1" />
                      <Skeleton className="h-5 w-24" />
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-5 w-5 rounded" />
                    <div className="flex-1">
                      <Skeleton className="h-4 w-28 mb-1" />
                      <Skeleton className="h-5 w-32" />
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-5 w-5 rounded" />
                    <div className="flex-1">
                      <Skeleton className="h-4 w-28 mb-1" />
                      <Skeleton className="h-5 w-24" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-5 w-5 rounded" />
                    <div className="flex-1">
                      <Skeleton className="h-4 w-36 mb-1" />
                      <Skeleton className="h-5 w-32" />
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-5 w-5 rounded" />
                    <div className="flex-1">
                      <Skeleton className="h-4 w-20 mb-1" />
                      <Skeleton className="h-5 w-28" />
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-5 w-5 rounded" />
                    <div className="flex-1">
                      <Skeleton className="h-4 w-16 mb-1" />
                      <Skeleton className="h-5 w-24" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="col-span-1">
          {/* Bloc skeleton : carte détails réservation */}
          <Card className="border-border h-full">
            <CardHeader>
              <CardTitle className="text-2xl font-bold flex items-center justify-between gap-2">
                <Skeleton className="h-7 w-48" />
                <Skeleton className="h-6 w-24 rounded-full" />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Bloc skeleton : carte dates */}
              <Card className="border-border bg-white">
                <CardHeader>
                  <CardTitle className="text-lg">
                    <Skeleton className="h-6 w-40" />
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Card className="flex-1 bg-primary/5">
                      <CardContent className="pt-6">
                        <div className="flex items-center gap-2">
                          <Skeleton className="h-4 w-4 rounded" />
                          <div className="flex-1">
                            <Skeleton className="h-3 w-12 mb-1" />
                            <Skeleton className="h-4 w-32" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="flex-1 bg-primary/5">
                      <CardContent className="pt-6">
                        <div className="flex items-center gap-2">
                          <Skeleton className="h-4 w-4 rounded" />
                          <div className="flex-1">
                            <Skeleton className="h-3 w-12 mb-1" />
                            <Skeleton className="h-4 w-32" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>

              {/* Bloc skeleton : carte conducteur */}
              <Card className="border-border bg-white">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Skeleton className="h-6 w-32" />
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <Skeleton className="h-5 w-32" />
                  </div>
                  <Skeleton className="h-6 w-20 rounded-full" />
                </CardContent>
              </Card>

              {/* Bloc skeleton : carte actions */}
              <Card className="border-border bg-white">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Skeleton className="h-6 w-24" />
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-between gap-2">
                  <div className="flex gap-3 pt-4 w-full">
                    <Skeleton className="h-10 flex-1 rounded-md" />
                    <Skeleton className="h-10 flex-1 rounded-md" />
                  </div>
                  <div className="flex gap-3 pt-4 w-full">
                    <Skeleton className="h-10 flex-1 rounded-md" />
                    <Skeleton className="h-10 flex-1 rounded-md" />
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

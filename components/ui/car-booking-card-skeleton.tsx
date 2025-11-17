import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function CarBookingCardSkeleton() {
  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 flex flex-col bg-card border-border p-0 gap-2">
      <div className="relative h-44 w-full overflow-hidden">
        <Skeleton className="h-full w-full rounded-b-none" />
        <div className="absolute top-3 right-3 z-20">
          <Skeleton className="h-6 w-24 rounded-full" />
        </div>
        <div className="absolute bottom-3 left-3 right-3 flex gap-2 flex-wrap">
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-24 rounded-full" />
        </div>
      </div>

      <CardHeader className="py-2">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <Skeleton className="h-5 w-32 mb-1.5" />
            <Skeleton className="h-6 w-24 rounded-md" />
          </div>
          <div className="text-right shrink-0">
            <Skeleton className="h-3 w-12 ml-auto mb-0.5" />
            <Skeleton className="h-4 w-16 ml-auto" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 pb-4 pt-0 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-lg bg-muted/60 p-3 flex-1 border border-border/50">
            <Skeleton className="h-7 w-7 rounded-md" />
            <div>
              <Skeleton className="h-3 w-12 mb-0.5" />
              <Skeleton className="h-4 w-8" />
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-muted/60 p-3 flex-1 border border-border/50">
            <Skeleton className="h-7 w-7 rounded-md" />
            <div>
              <Skeleton className="h-3 w-12 mb-0.5" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-lg bg-muted/60 p-3 pt-2 border-t border-border/50">
          <Skeleton className="h-7 w-7 rounded-md" />
          <div className="flex-1 min-w-0">
            <Skeleton className="h-3 w-16 mb-0.5" />
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

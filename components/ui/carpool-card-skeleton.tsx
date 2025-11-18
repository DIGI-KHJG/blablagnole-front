import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function CarpoolCardSkeleton() {
  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 flex flex-col bg-card border-border relative">
      {/* Barre de status colorée à gauche */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-muted" />

      <CardHeader className="pb-3 pt-4 pl-4 pr-12">
        {/* Trajet avec ligne verticale */}
        <div className="flex items-start gap-3 mb-4">
          <div className="flex flex-col items-center pt-1">
            <Skeleton className="w-3 h-3 rounded-full" />
            <Skeleton className="w-0.5 h-8 my-1" />
            <Skeleton className="w-3 h-3 rounded-full" />
          </div>
          <div className="flex-1 min-w-0 space-y-3">
            <div className="space-y-1">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-40" />
            </div>
            <div className="space-y-1">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-40" />
            </div>
          </div>
        </div>

        {/* Badge de status et date */}
        <div className="flex items-center justify-between gap-2">
          <Skeleton className="h-5 w-20 rounded-full" />
          <div className="flex items-center gap-1.5">
            <Skeleton className="h-3.5 w-3.5 rounded" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-4 pb-4 pt-0">
        {/* Stats en ligne */}
        <div className="flex items-center gap-3 border-t border-border/50 pt-3">
          <div className="flex items-center gap-1.5">
            <Skeleton className="h-4 w-4 rounded" />
            <Skeleton className="h-3 w-12" />
          </div>
          <div className="w-px h-4 bg-border" />
          <div className="flex items-center gap-1.5">
            <Skeleton className="h-4 w-4 rounded" />
            <Skeleton className="h-3 w-12" />
          </div>
          <div className="w-px h-4 bg-border" />
          <div className="flex items-center gap-1.5">
            <Skeleton className="h-4 w-4 rounded" />
            <Skeleton className="h-3 w-12" />
          </div>
          <div className="w-px h-4 bg-border" />
          <div className="flex items-center gap-1.5">
            <Skeleton className="h-7 w-7 rounded-full" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

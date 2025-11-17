import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ProfileHeaderSkeleton() {
  return (
    <Card className="sticky top-6 bg-white dark:bg-slate-800 border-none shadow-lg">
      <CardContent className="p-6">
        <div className="flex justify-center mb-6">
          <Skeleton className="w-32 h-32 rounded-full border-4 border-blue-500" />
        </div>

        <div className="text-center mb-6">
          <Skeleton className="h-8 w-48 mx-auto mb-3" />
          <Skeleton className="h-6 w-24 mx-auto rounded-full" />
        </div>

        <div className="h-px bg-slate-200 dark:bg-slate-700 my-6" />

        <div className="space-y-4 flex flex-col gap-4 justify-center">
          <div className="flex items-center gap-3 justify-between">
            <div className="flex items-center gap-3">
              <Skeleton className="w-5 h-5 rounded" />
              <div>
                <Skeleton className="h-3 w-16 mb-2" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Skeleton className="w-5 h-5 rounded" />
              <div>
                <Skeleton className="h-3 w-12 mb-2" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Skeleton className="w-5 h-5 rounded" />
              <div>
                <Skeleton className="h-3 w-16 mb-2" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

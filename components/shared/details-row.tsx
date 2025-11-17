import { Skeleton } from "@/components/ui/skeleton";

export function DetailRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="text-primary mt-0.5 shrink-0">{icon}</div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-muted-foreground font-medium">{label}</p>
        <p className="text-base font-semibold text-card-foreground truncate">
          {value}
        </p>
      </div>
    </div>
  );
}

export function DetailRowSkeleton() {
  return (
    <div className="flex items-start gap-3">
      <Skeleton className="h-5 w-5 mt-0.5 shrink-0 rounded-md" />
      <div className="flex-1 min-w-0 space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-5 w-24" />
      </div>
    </div>
  );
}

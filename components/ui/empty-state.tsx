import { cn } from "@/lib/utils";
import type { ComponentType } from "react";

export interface EmptyStateProps {
  icon: ComponentType<{ className?: string }>;
  title: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
  iconClassName?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  className,
  iconClassName,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-12 text-center",
        className
      )}
    >
      <Icon
        className={cn(
          "w-12 h-12 text-muted-foreground mb-3 opacity-50",
          iconClassName
        )}
      />
      <p className="text-sm text-muted-foreground">{title}</p>
      {description != null && (
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      )}
    </div>
  );
}

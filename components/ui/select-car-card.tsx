"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Car,
  getCategoryLabel,
  getMotorisationColor,
  getMotorisationLabel,
} from "@/types/car";
import { Check } from "lucide-react";
import Image from "next/image";

interface CarCardProps {
  car: Car;
  isSelected: boolean;
  onClick: () => void;
}

export default function SelectCarCard({
  car,
  isSelected,
  onClick,
}: CarCardProps) {
  return (
    <Button
      onClick={onClick}
      variant="outline"
      className={cn(
        "group relative flex flex-row h-40 sm:h-48 md:h-52 overflow-hidden rounded-lg border-2 transition-all duration-300 hover:shadow-lg p-0",
        isSelected
          ? "border-primary shadow-lg"
          : "border-border hover:border-primary/50"
      )}
    >
      <div className="relative w-32 h-full overflow-hidden bg-muted sm:w-40 md:w-44">
        <Image
          src={car?.imageUrl ?? "/misc/placeholder.svg"}
          alt={`${car?.brand} ${car?.model}`}
          fill
          sizes="(max-width: 640px) 128px, (max-width: 768px) 160px, 176px"
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-r from-black/5 to-transparent pointer-events-none z-10" />
        {isSelected && (
          <Badge className="absolute top-2 left-4 flex items-center gap-2 text-xs font-semibold bg-primary text-primary-foreground rounded-full px-3 py-1 shadow-md z-20">
            <Check className="h-4 w-4" />
            <span>Sélectionné</span>
          </Badge>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 sm:gap-4 p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <h3 className="text-base font-bold text-foreground sm:text-lg">
              {car?.brand}
            </h3>
            <p className="text-sm font-medium text-muted-foreground sm:text-base">
              {car?.model}
            </p>
          </div>
          {car?.category && (
            <Badge
              variant="outline"
              className="bg-background text-foreground text-xs font-semibold"
            >
              {getCategoryLabel(car?.category)}
            </Badge>
          )}
        </div>

        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium text-muted-foreground">
              Places
            </span>
            <span className="font-semibold text-foreground">{car?.seats}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium text-muted-foreground">
              Couleur
            </span>
            <span className="font-semibold text-foreground">{car?.color}</span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-2">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 rounded-lg border border-border bg-muted/50 px-3 py-1.5">
              <span className="text-xs font-mono font-bold text-foreground">
                {car?.registrationPlate}
              </span>
            </div>
          </div>
          <Badge
            variant="outline"
            className={`${getMotorisationColor(
              car?.motorisation
            )} text-xs font-semibold text-white border-none`}
          >
            {getMotorisationLabel(car?.motorisation)}
          </Badge>
        </div>
      </div>
    </Button>
  );
}

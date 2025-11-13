"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Car } from "@/types/car";
import { Check } from "lucide-react";
import Image from "next/image";

interface CarCardProps {
  car: Car;
  isSelected: boolean;
  onClick: () => void;
}

function getBadgeColor(motorization: string) {
  switch (motorization.toLowerCase()) {
    case "électrique":
      return "bg-green-500/20 text-green-700 dark:text-green-400 border border-green-500/30";
    case "diesel":
      return "bg-blue-500/20 text-blue-700 dark:text-blue-400 border border-blue-500/30";
    case "essence":
      return "bg-amber-500/20 text-amber-700 dark:text-amber-400 border border-amber-500/30";
    default:
      return "bg-secondary text-secondary-foreground";
  }
}

export default function CarCard({ car, isSelected, onClick }: CarCardProps) {
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
      <div className="relative w-32  h-full overflow-hidden bg-muted sm:w-40 md:w-44">
        <Image
          src="/misc/placeholder.svg"
          alt={`${car.brand} ${car.model}`}
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
        {/* Header: Brand, Model and Type */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <h3 className="text-base font-bold text-foreground sm:text-lg">
              {car.brand}
            </h3>
            <p className="text-sm font-medium text-muted-foreground sm:text-base">
              {car.model}
            </p>
          </div>
          <span className="whitespace-nowrap rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            {car.type}
          </span>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium text-muted-foreground">
              Année
            </span>
            <span className="font-semibold text-foreground">{car.year}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium text-muted-foreground">
              Places
            </span>
            <span className="font-semibold text-foreground">{car.seats}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium text-muted-foreground">
              Couleur
            </span>
            <span className="font-semibold text-foreground">{car.color}</span>
          </div>
        </div>

        {/* Bottom Row: Plate and Motorization */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 rounded-lg border border-border bg-muted/50 px-3 py-1.5">
              <span className="text-xs font-mono font-bold text-foreground">
                {car.plate}
              </span>
            </div>
          </div>
          <span
            className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold ${getBadgeColor(
              car.motorization
            )}`}
          >
            {car.motorization}
          </span>
        </div>
      </div>
    </Button>
  );
}

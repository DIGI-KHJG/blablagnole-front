"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { formatDateShort } from "@/lib/utils";
import {
  getCategoryLabel,
  getMotorisationColor,
  getMotorisationLabel,
} from "@/types/car";
import {
  ServiceCarBooking,
  getBookingStatusColor,
  getBookingStatusLabel,
} from "@/types/service-car-booking";
import { Calendar, Leaf } from "lucide-react";
import Image from "next/image";
import { LuUsers } from "react-icons/lu";

type CarBookingCardProps = {
  booking?: ServiceCarBooking;
  onClick?: () => void;
};

export function CarBookingCard({ booking, onClick }: CarBookingCardProps) {
  const car = booking?.serviceCar;

  return (
    <Card
      className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 flex flex-col bg-white border-border p-0 gap-2 cursor-pointer"
      onClick={onClick}
    >
      <div className="relative h-44 w-full overflow-hidden">
        <Image
          src={car?.imageUrl || "/misc/placeholder.svg"}
          alt={`${car?.brand} ${car?.model}`}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/0 to-transparent pointer-events-none" />
        <div className="absolute top-0 left-0 z-20">
          <Badge
            variant="outline"
            className={`${getBookingStatusColor(
              booking?.status
            )} text-sm font-semibold text-white border-none rounded-l-none rounded-tr-none py-1 px-4`}
          >
            {getBookingStatusLabel(booking?.status)}
          </Badge>
        </div>
        <div className="absolute bottom-3 left-3 right-3 flex gap-2 flex-wrap">
          <Badge
            variant="outline"
            className={`${getMotorisationColor(
              car?.motorisation
            )} text-sm font-semibold text-white border-none`}
          >
            {getMotorisationLabel(car?.motorisation)}
          </Badge>
          {car?.category && (
            <Badge
              variant="outline"
              className="bg-background text-foreground text-sm font-semibold border-none"
            >
              {getCategoryLabel(car?.category)}
            </Badge>
          )}
        </div>
      </div>

      <CardHeader className="py-2">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h3 className="text-base font-bold text-card-foreground truncate">
              {car?.brand} {car?.model}
            </h3>
            <p className="text-sm  text-muted-foreground mt-1.5 truncate bg-muted/50 px-2 py-1 rounded-md inline-block">
              {car?.registrationPlate}
            </p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-xs text-muted-foreground font-bold mb-0.5">
              Couleur
            </p>
            <p className="text-sm font-medium text-card-foreground">
              {car?.color}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 pb-4 pt-0 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-lg bg-primary/10 p-3 flex-1 border border-border/50">
            <div className="p-1.5 rounded-md bg-primary/80">
              <LuUsers className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-bold mb-0.5">
                Places
              </p>
              <p className="font-medium text-sm text-card-foreground">
                {car?.seats}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-primary/10 p-3 flex-1 border border-border/50">
            <div className="p-1.5 rounded-md bg-primary/80">
              <Leaf className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-bold mb-0.5">
                CO₂
              </p>
              <p className="font-medium text-sm text-card-foreground">
                {car?.co2Emission ? `${car.co2Emission}g/km` : "N/A"}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-lg bg-muted/50 p-3 pt-2 border-t border-border/50">
          <div className="p-1.5 rounded-md bg-primary/80">
            <Calendar className="h-4 w-4 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-muted-foreground font-bold mb-0.5">
              Période
            </p>
            <p className="font-medium text-sm text-card-foreground">
              Du {booking?.startAt ? formatDateShort(booking.startAt) : "N/A"}{" "}
              Au {booking?.endAt ? formatDateShort(booking.endAt) : "N/A"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

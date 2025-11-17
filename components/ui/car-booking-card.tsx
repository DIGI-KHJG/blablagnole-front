"use client";

import { DeleteConfirmationDialog } from "@/components/shared/delete-confirmation-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { Calendar, Leaf, MoreVertical } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { LuPencil, LuTrash2, LuUsers } from "react-icons/lu";

type CarBookingCardProps = {
  booking?: ServiceCarBooking;
  onClick?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
};

export function CarBookingCard({
  booking,
  onClick,
  onEdit,
  onDelete,
}: CarBookingCardProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const car = booking?.serviceCar;
  const driver = booking?.driver;

  const handleDelete = () => {
    setShowDeleteDialog(false);
    onDelete?.();
  };

  const handleEdit = () => {
    onEdit?.();
  };

  return (
    <>
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

          {driver && (onEdit || onDelete) && (
            <div className="absolute bottom-0 right-0 flex items-center gap-2 z-20 bg-primary text-white px-2 py-1 rounded-none rounded-tl-md">
              <Avatar className="w-7 h-7">
                <AvatarImage
                  src={driver.profilePicture || "/misc/placeholder.svg"}
                  alt={`${driver.firstName} ${driver.lastName}`}
                />
                <AvatarFallback>
                  {driver.firstName.charAt(0)} {driver.lastName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <p className="text-sm font-medium">
                {driver.firstName} {driver.lastName}
              </p>
            </div>
          )}
          {(onEdit || onDelete) && (
            <div className="absolute top-3 right-3 z-20">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    className="h-9 w-9 bg-background/90 hover:bg-background text-foreground backdrop-blur-sm shadow-md border border-border/50"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <MoreVertical className="h-4 w-4" />
                    <span className="sr-only">Menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {onEdit && (
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit();
                      }}
                      className="cursor-pointer"
                    >
                      <LuPencil className="h-4 w-4" />
                      Modifier
                    </DropdownMenuItem>
                  )}
                  {onDelete && (
                    <DropdownMenuItem
                      variant="destructive"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowDeleteDialog(true);
                      }}
                      className="cursor-pointer"
                    >
                      <LuTrash2 className="h-4 w-4" />
                      Supprimer
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
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

          <div className="flex items-center gap-2 rounded-lg bg-primary/10 p-3 pt-2 border-t border-border/50">
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
      <DeleteConfirmationDialog
        showDeleteDialog={showDeleteDialog}
        setShowDeleteDialog={setShowDeleteDialog}
        handleDelete={handleDelete}
        title="Supprimer la location"
        description={`supprimer la location : ${booking?.serviceCar?.brand} ${booking?.serviceCar?.model} (${booking?.serviceCar?.registrationPlate}) pour le conducteur ${driver?.firstName} ${driver?.lastName}`}
      />
    </>
  );
}

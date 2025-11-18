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
import { formatDateShort, formatDuration } from "@/lib/utils";
import { Carpool, getStatusColor, getStatusLabel } from "@/types/carpool";
import {
  CarpoolBookingStatus,
  getStatusColor as getBookingStatusColor,
  getStatusLabel as getBookingStatusLabel,
} from "@/types/carpool-booking";
import { Calendar, Clock, MoreVertical, Route, Users } from "lucide-react";
import { useState } from "react";
import { LuPencil, LuTrash2 } from "react-icons/lu";

type CarpoolCardProps = {
  carpool?: Carpool;
  bookingStatus?: CarpoolBookingStatus;
  onClick?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
};

export function CarpoolCard({
  carpool,
  bookingStatus,
  onClick,
  onEdit,
  onDelete,
}: CarpoolCardProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleDelete = () => {
    setShowDeleteDialog(false);
    onDelete?.();
  };

  const handleEdit = () => {
    onEdit?.();
  };

  // Utiliser le statut de la réservation si fourni, sinon celui du covoiturage
  const isCancelled = bookingStatus === "CANCELLED";
  const statusColor = bookingStatus
    ? getBookingStatusColor(bookingStatus)
    : getStatusColor(carpool?.status);
  const statusLabel = bookingStatus
    ? getBookingStatusLabel(bookingStatus)
    : getStatusLabel(carpool?.status);

  return (
    <>
      <Card
        className={`group overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 hover:border-primary/20 flex flex-col bg-white border-border cursor-pointer relative ${
          isCancelled ? "opacity-75" : ""
        }`}
        onClick={onClick}
      >
        <div
          className={`absolute left-0 top-0 bottom-0 w-1 transition-all duration-300 group-hover:w-1.5 ${
            isCancelled ? "bg-red-500" : statusColor
          }`}
        />

        {carpool?.id && (onEdit || onDelete) && (
          <div className="absolute top-3 right-3 z-20">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="h-8 w-8 bg-background/80 hover:bg-background text-foreground backdrop-blur-sm shadow-sm border border-border/50"
                  onClick={(e) => e.stopPropagation()}
                >
                  <MoreVertical className="h-4 w-4" />
                  <span className="sr-only">Menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
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
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}

        <CardHeader className="pb-3 pt-4 pl-4 pr-12">
          {/* Trajet avec ligne verticale */}
          <div className="flex items-start gap-3 mb-4">
            <div className="flex flex-col items-center pt-1">
              <div className="w-3 h-3 rounded-full bg-primary border-2 border-background shadow-sm group-hover:scale-125 group-hover:shadow-md transition-all duration-300" />
              <div className="w-0.5 h-8 bg-linear-to-b from-primary to-destructive my-1 group-hover:w-1 transition-all duration-300" />
              <div className="w-3 h-3 rounded-full bg-destructive border-2 border-background shadow-sm group-hover:scale-125 group-hover:shadow-md transition-all duration-300" />
            </div>
            <div className="flex-1 min-w-0 space-y-3">
              <div>
                <p className="text-base font-semibold text-card-foreground truncate group-hover:text-primary transition-colors">
                  {carpool?.fromAddress?.city || "N/A"}
                </p>
                <p className="text-sm text-muted-foreground truncate">
                  {carpool?.fromAddress?.street}
                </p>
              </div>
              <div>
                <p className="text-base font-semibold text-card-foreground truncate group-hover:text-destructive transition-colors">
                  {carpool?.toAddress?.city || "N/A"}
                </p>
                <p className="text-sm text-muted-foreground truncate">
                  {carpool?.toAddress?.street}
                </p>
              </div>
            </div>
          </div>

          {/* Badge de status et date */}
          <div className="flex items-center justify-between gap-2">
            <Badge
              variant="outline"
              className={`${
                isCancelled ? "bg-red-500" : statusColor
              } text-sm font-semibold text-white border-none px-3 py-1 transition-all duration-300 group-hover:scale-105`}
            >
              {statusLabel}
            </Badge>
            <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors">
              <Calendar className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
              <span className="font-semibold">
                {carpool?.departureAt
                  ? (() => {
                      const dateObj = new Date(carpool.departureAt);
                      const date = formatDateShort(dateObj);
                      const time = dateObj.toLocaleTimeString("fr-FR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      });
                      return `${date} à ${time}`;
                    })()
                  : "N/A"}
              </span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="px-4 pb-4 pt-0">
          {/* Stats en ligne */}
          <div className="flex items-center gap-3 border-t border-border/50 group-hover:border-primary/30 pt-3 transition-colors">
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground group-hover:text-foreground transition-colors">
              <Clock className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
              <span className="font-semibold text-card-foreground">
                {carpool?.durationMin
                  ? formatDuration(carpool.durationMin)
                  : "N/A"}
              </span>
            </div>
            <div className="w-px h-4 bg-border" />
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground group-hover:text-foreground transition-colors">
              <Route className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
              <span className="font-semibold text-card-foreground">
                {carpool?.distanceKm
                  ? `${carpool.distanceKm.toFixed(1)} km`
                  : "N/A"}
              </span>
            </div>
            <div className="w-px h-4 bg-border" />
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground group-hover:text-foreground transition-colors">
              <Users className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
              <span className="font-semibold text-card-foreground">
                {carpool?.seatsRemaining !== undefined &&
                carpool?.seatsTotal !== undefined
                  ? carpool.seatsRemaining === 0
                    ? "Complet"
                    : `${carpool.seatsRemaining}/${carpool.seatsTotal}`
                  : "N/A"}
              </span>
            </div>
            <div className="w-px h-4 bg-border" />
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground group-hover:text-foreground transition-colors">
              <Avatar className="h-7 w-7">
                <AvatarImage
                  src={carpool?.driver?.profilePicture}
                  alt={carpool?.driver?.firstName || "Organisateur"}
                />
                <AvatarFallback className="text-xs">
                  {carpool?.driver?.firstName?.[0]?.toUpperCase() || "?"}
                </AvatarFallback>
              </Avatar>
              <span className="font-semibold text-card-foreground">
                Par {carpool?.driver?.firstName || "N/A"}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
      <DeleteConfirmationDialog
        showDeleteDialog={showDeleteDialog}
        setShowDeleteDialog={setShowDeleteDialog}
        handleDelete={handleDelete}
        title="Supprimer l'annonce"
        description={`Supprimer l'annonce de ${carpool?.fromAddress?.city} vers ${carpool?.toAddress?.city}`}
      />
    </>
  );
}

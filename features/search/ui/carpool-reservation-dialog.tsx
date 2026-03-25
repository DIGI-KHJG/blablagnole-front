"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CarCard } from "@/components/ui/car-card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { EmptyState } from "@/components/ui/empty-state";
import { useGetCurrentUser } from "@/features/auth/hooks";
import { useBookCarpool } from "@/features/carpool-booking/hooks";
import { formatDepartureDisplay, formatDurationCompact } from "@/lib/format";
import { getDisplayName, getInitials } from "@/lib/user";
import type { Carpool } from "@/types/carpool";
import { format } from "date-fns";
import { ArrowRight, Calendar, Clock, User, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type CarpoolReservationDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  carpool: Carpool | null;
};

/**
 * Dialogue de réservation d’un covoiturage : affiche les détails du trajet et permet de réserver (nombre de places).
 * @param open Contrôle l’ouverture du dialogue.
 * @param onOpenChange Callback de changement d’état d’ouverture.
 * @param carpool Covoiturage à réserver (null masque le contenu).
 */
export function CarpoolReservationDialog({
  open,
  onOpenChange,
  carpool,
}: CarpoolReservationDialogProps) {
  const router = useRouter();
  const { data: currentUser } = useGetCurrentUser();
  const { mutate: bookCarpool, isPending: isBooking } = useBookCarpool();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        {carpool && (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                Confirmer la réservation :{" "}
                <span className="font-bold text-primary bg-primary/10 rounded-full px-3 py-2">
                  {carpool.fromAddress?.city}
                </span>{" "}
                <ArrowRight className="h-4 w-4 text-primary" strokeWidth={5} />
                <span className="font-bold text-primary bg-primary/10 rounded-full px-3 py-2">
                  {carpool.toAddress?.city}
                </span>
              </DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-2 items-stretch">
              <div className="flex flex-col gap-4 min-h-0">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    {carpool.driver?.profilePicture ? (
                      <AvatarImage
                        src={carpool.driver.profilePicture}
                        alt={getDisplayName(carpool.driver, "Conducteur")}
                      />
                    ) : null}
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {getInitials(carpool.driver)}
                    </AvatarFallback>
                  </Avatar>
                  <p className="font-semibold text-foreground">
                    {getDisplayName(carpool.driver, "Conducteur")}
                  </p>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="flex flex-col items-center">
                    <div className="h-2.5 w-2.5 rounded-full bg-primary" />
                    <div className="my-1 h-6 w-0.5 bg-primary/70 rounded-full" />
                    <div className="h-2.5 w-2.5 rounded-full bg-primary" />
                  </div>
                  <div className="flex-1 space-y-2 min-w-0">
                    <div className="flex items-baseline gap-2">
                      <span className="text-muted-foreground min-w-[2.5rem] shrink-0">
                        {format(
                          typeof carpool.departureAt === "string"
                            ? new Date(carpool.departureAt)
                            : carpool.departureAt,
                          "HH:mm",
                        )}
                      </span>
                      <span className="font-medium truncate">
                        {[
                          carpool.fromAddress?.city,
                          carpool.fromAddress?.street,
                        ]
                          .filter(Boolean)
                          .join(" - ") || "Départ"}
                      </span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-muted-foreground min-w-[2.5rem] shrink-0">
                        {(() => {
                          const d =
                            typeof carpool.departureAt === "string"
                              ? new Date(carpool.departureAt)
                              : carpool.departureAt;
                          const totalM =
                            d.getHours() * 60 +
                            d.getMinutes() +
                            carpool.durationMin;
                          const h = Math.floor(totalM / 60) % 24;
                          const m = totalM % 60;
                          return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
                        })()}
                      </span>
                      <span className="font-medium truncate">
                        {[carpool.toAddress?.city, carpool.toAddress?.street]
                          .filter(Boolean)
                          .join(" - ") || "Arrivée"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5 text-primary bg-white border border-primary rounded-full px-3 py-1 text-sm font-bold">
                    <Calendar className="h-4 w-4" />
                    {formatDepartureDisplay(carpool.departureAt).date}
                  </span>
                  <span className="flex items-center gap-1.5 text-primary bg-white border border-primary rounded-full px-3 py-1 text-sm font-bold">
                    <Clock className="h-4 w-4" />
                    {formatDurationCompact(carpool.durationMin)}
                  </span>
                  <span className="flex items-center gap-1.5 text-primary bg-white border border-primary rounded-full px-3 py-1 text-sm font-bold">
                    <Users className="h-4 w-4" />
                    {(carpool.seatsRemaining ?? carpool.seatsTotal ?? 0) === 0
                      ? "Aucune place disponible"
                      : `${carpool.seatsRemaining ?? carpool.seatsTotal ?? 0} place${(carpool.seatsRemaining ?? carpool.seatsTotal ?? 0) > 1 ? "s" : ""}`}
                  </span>
                </div>

                <div className="flex-1 min-h-0 flex flex-col rounded-lg border border-border bg-muted/30 p-3">
                  <p className="text-sm font-semibold text-foreground flex items-center gap-2 shrink-0">
                    <Users className="size-6 text-primary bg-primary/10 rounded-full p-1" />
                    Passagers
                  </p>
                  <div className="space-y-2 min-h-0 flex-1 overflow-auto">
                    {carpool.passengers && carpool.passengers.length > 0 ? (
                      <ul className="space-y-2">
                        {carpool.passengers.map((passenger) => (
                          <li
                            key={passenger.id ?? passenger.email}
                            className="flex items-center gap-2 text-sm"
                          >
                            <Avatar className="h-8 w-8">
                              {passenger.profilePicture ? (
                                <AvatarImage
                                  src={passenger.profilePicture}
                                  alt={getDisplayName(passenger, "Passager")}
                                />
                              ) : null}
                              <AvatarFallback className="bg-primary/10 text-primary text-xs font-medium">
                                {getInitials(passenger)}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-medium text-foreground">
                              {getDisplayName(passenger, "Passager")}
                            </span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <EmptyState
                        icon={User}
                        title="Aucun passager pour le moment"
                        className="py-6"
                        iconClassName="w-8 h-8"
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {carpool.car && <CarCard car={carpool.car} type="display" />}
              </div>
            </div>

            <DialogFooter className="gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Annuler
              </Button>
              <Button
                type="button"
                disabled={!currentUser || isBooking}
                onClick={() => {
                  if (!currentUser?.id) {
                    toast.error("Connectez-vous pour réserver");
                    return;
                  }
                  if (carpool.id == null) return;
                  bookCarpool(
                    {
                      carpoolId: carpool.id,
                      passengerId: currentUser.id,
                      status: "CONFIRMED",
                    },
                    {
                      onSuccess: () => {
                        onOpenChange(false);
                        toast.success("Covoiturage réservé avec succès");
                        router.push("/dashboard/covoiturages/mes-reservations");
                      },
                      onError: (error) => {
                        toast.error(error.message);
                      },
                    },
                  );
                }}
              >
                {isBooking ? "Réservation..." : "Confirmer la réservation"}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

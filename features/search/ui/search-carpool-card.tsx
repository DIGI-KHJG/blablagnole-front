"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGetCurrentUser } from "@/features/auth/hooks";
import { formatDepartureDisplay, formatDurationCompact } from "@/lib/format";
import { getDisplayName, getInitials } from "@/lib/user";
import { type Carpool, getStatusBorderColor } from "@/types/carpool";
import type { CarpoolBookingStatus } from "@/types/carpool-booking";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { Calendar, Clock, Users } from "lucide-react";

type SearchCarpoolCardProps = {
  carpool: Carpool;
  index?: number;
  onReserve?: (carpool: Carpool) => void;
  /** Statut de la réservation de l'utilisateur pour ce covoiturage (si existante). */
  userBookingStatus?: CarpoolBookingStatus;
};

/**
 * Carte d’affichage d’un covoiturage dans les résultats de recherche (trajet, conducteur, horaire, places, bouton réserver).
 * @param carpool Données du covoiturage.
 * @param index Index pour l’animation (optionnel).
 * @param onReserve Callback appelé au clic sur réserver (optionnel).
 */
export function SearchCarpoolCard({
  carpool,
  index = 0,
  onReserve,
  userBookingStatus,
}: SearchCarpoolCardProps) {
  const { data: currentUser } = useGetCurrentUser();

  const { date } = formatDepartureDisplay(carpool.departureAt);
  const durationStr = formatDurationCompact(carpool.durationMin);
  const depTime = format(
    typeof carpool.departureAt === "string"
      ? new Date(carpool.departureAt)
      : carpool.departureAt,
    "HH:mm",
  );
  const arrTime = (() => {
    const d =
      typeof carpool.departureAt === "string"
        ? new Date(carpool.departureAt)
        : carpool.departureAt;
    const totalM = d.getHours() * 60 + d.getMinutes() + carpool.durationMin;
    const h = Math.floor(totalM / 60) % 24;
    const m = totalM % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
  })();
  const fromLabel =
    [carpool.fromAddress?.city, carpool.fromAddress?.street]
      .filter(Boolean)
      .join(" - ") || "Départ";
  const toLabel =
    [carpool.toAddress?.city, carpool.toAddress?.street]
      .filter(Boolean)
      .join(" - ") || "Arrivée";

  const isDriver =
    currentUser?.id != null &&
    (currentUser.id === carpool.driverId ||
      currentUser.id === carpool.driver?.id);
  const isFull =
    (carpool.seatsRemaining ?? 0) === 0 || carpool.status === "FULL";
  const isAlreadyBooked =
    userBookingStatus === "PENDING" ||
    userBookingStatus === "CONFIRMED" ||
    userBookingStatus === "COMPLETED" ||
    Boolean(
      currentUser?.id &&
      carpool.passengers?.some((p) => p.id === currentUser.id),
    );

  function renderAction() {
    if (isDriver) return null;
    if (carpool.status === "CANCELLED") {
      return (
        <span className="inline-flex items-center rounded-full border border-destructive/50 bg-destructive/10 px-6 py-3 font-semibold text-destructive opacity-90 cursor-not-allowed">
          Annulé
        </span>
      );
    }
    if (userBookingStatus === "CANCELLED") {
      return (
        <span className="inline-flex items-center rounded-full border border-destructive/50 bg-destructive/10 px-6 py-3 font-semibold text-destructive cursor-not-allowed">
          Réservation annulée
        </span>
      );
    }
    if (isFull) {
      return (
        <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-6 py-3 font-semibold text-primary/80 cursor-not-allowed">
          Complet
        </span>
      );
    }
    if (isAlreadyBooked) {
      return (
        <span className="inline-flex items-center rounded-full border border-muted bg-muted/50 px-6 py-3 font-semibold text-muted-foreground cursor-not-allowed">
          Déjà réservé
        </span>
      );
    }
    return (
      <motion.button
        type="button"
        disabled={carpool.id == null}
        whileHover={carpool.id != null ? { scale: 1.05 } : {}}
        whileTap={carpool.id != null ? { scale: 0.95 } : {}}
        className="inline-block relative overflow-hidden rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-lg transition-all hover:shadow-primary/25 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => carpool.id != null && onReserve?.(carpool)}
      >
        Réserver
      </motion.button>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4, scale: 1.01 }}
      className={`group relative overflow-hidden rounded-2xl border border-border border-l-4 bg-card p-6 shadow-sm transition-shadow hover:shadow-lg ${getStatusBorderColor(carpool.status)}`}
    >
      <div className="absolute inset-0 bg-linear-to-r from-primary/5 via-transparent to-primary/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative">
        <div className="mb-6 flex items-start justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-14 w-14">
              {carpool.driver?.profilePicture ? (
                <AvatarImage
                  src={carpool.driver.profilePicture}
                  alt={getDisplayName(carpool.driver, "Conducteur")}
                />
              ) : null}
              <AvatarFallback className="bg-linear-to-br from-primary to-primary/70 text-lg font-semibold text-primary-foreground">
                {getInitials(carpool.driver)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-foreground">
                {getDisplayName(carpool.driver, "Conducteur")}
              </p>
            </div>
          </div>
          <div className="rounded-full bg-background px-3 py-1 text-sm font-bold text-primary border border-primary flex items-center gap-2">
            <Clock className="h-4 w-4" />
            {durationStr}
          </div>
        </div>

        <div className="mb-6 flex items-center gap-4">
          <div className="flex flex-col items-center">
            <div className="flex h-3 w-3 items-center justify-center rounded-full bg-primary" />
            <div className="my-1 h-8 w-0.5 bg-linear-to-b from-primary to-primary/70 rounded-full" />
            <div className="flex h-3 w-3 items-center justify-center rounded-full bg-primary" />
          </div>
          <div className="flex-1">
            <div className="mb-4">
              <div className="flex items-baseline gap-2">
                <span className="text-sm font-bold text-muted-foreground">
                  {depTime}
                </span>
                <span className="font-medium text-foreground">{fromLabel}</span>
              </div>
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-sm font-bold text-muted-foreground">
                  {arrTime}
                </span>
                <span className="font-medium text-foreground">{toLabel}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-muted-foreground bg-white border border-primary rounded-full px-3 py-1 text-sm font-bold">
              <Calendar className="h-4 w-4 text-primary" />
              <span className="text-primary">{date}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground bg-white border border-primary rounded-full px-3 py-1 text-sm font-bold">
              <Users className="h-4 w-4 text-primary" />
              <span className="text-primary">
                {carpool.status === "FULL" ||
                (carpool.seatsRemaining ?? carpool.seatsTotal ?? 0) === 0
                  ? "Aucune place disponible"
                  : `${carpool.seatsRemaining ?? carpool.seatsTotal ?? 0} place${(carpool.seatsRemaining ?? carpool.seatsTotal ?? 0) > 1 ? "s" : ""}`}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">{renderAction()}</div>
        </div>
      </div>
    </motion.div>
  );
}

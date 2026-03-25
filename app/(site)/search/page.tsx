"use client";

import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetCurrentUser } from "@/features/auth/hooks";
import { useGetCarpoolBookingByPassengerId } from "@/features/carpool-booking/hooks";
import { useGetCarpools } from "@/features/carpool/hooks";
import { CarpoolReservationDialog } from "@/features/search/ui/carpool-reservation-dialog";
import { SearchCarpoolCard } from "@/features/search/ui/search-carpool-card";
import { SearchCarpoolCardSkeleton } from "@/features/search/ui/search-carpool-card-skeleton";
import type { CarpoolBookingStatus } from "@/types/carpool-booking";
import type { Carpool } from "@/types/carpool";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  Clock,
  Edit3,
  MapPin,
  Search,
} from "lucide-react";
import Link from "next/link";
import { useQueryState } from "nuqs";
import { useMemo, useState } from "react";
import { toast } from "sonner";

function matchesDeparture(carpool: Carpool, departure: string | null): boolean {
  if (!departure?.trim()) return true;
  const city = carpool.fromAddress?.city ?? "";
  return city.toLowerCase().includes(departure.trim().toLowerCase());
}

function matchesArrival(carpool: Carpool, arrival: string | null): boolean {
  if (!arrival?.trim()) return true;
  const city = carpool.toAddress?.city ?? "";
  return city.toLowerCase().includes(arrival.trim().toLowerCase());
}

function matchesDateTime(carpool: Carpool, dateTime: string | null): boolean {
  if (!dateTime?.trim()) return true;
  const searchDate = new Date(dateTime);
  if (isNaN(searchDate.getTime())) return true;
  const dep = carpool.departureAt;
  const carpoolDate = typeof dep === "string" ? new Date(dep) : dep;
  if (isNaN(carpoolDate.getTime())) return true;
  return (
    searchDate.getFullYear() === carpoolDate.getFullYear() &&
    searchDate.getMonth() === carpoolDate.getMonth() &&
    searchDate.getDate() === carpoolDate.getDate()
  );
}

export default function SearchPage() {
  const [departure] = useQueryState("departure");
  const [arrival] = useQueryState("arrival");
  const [dateTime] = useQueryState("dateTime");
  const [selectedCarpool, setSelectedCarpool] = useState<Carpool | null>(null);
  const { data: currentUser } = useGetCurrentUser();
  const { data: carpools = [], isLoading, isError } = useGetCarpools();
  const { data: myBookings = [] } = useGetCarpoolBookingByPassengerId(
    currentUser?.id ?? undefined,
  );

  const bookingStatusByCarpoolId = useMemo(() => {
    const map = new Map<number, CarpoolBookingStatus>();
    for (const b of myBookings) {
      const id = b.carpool?.id ?? (b.carpool as unknown as { id?: number })?.id;
      if (id != null) map.set(id, b.status);
    }
    return map;
  }, [myBookings]);

  const handleReserve = (carpool: Carpool) => {
    if (!currentUser) {
      toast.error("Connectez-vous pour réserver ce trajet.");
      return;
    }
    setSelectedCarpool(carpool);
  };

  const filteredCarpools = useMemo(() => {
    return carpools.filter(
      (c) =>
        c.status !== "COMPLETED" &&
        matchesDeparture(c, departure) &&
        matchesArrival(c, arrival) &&
        matchesDateTime(c, dateTime),
    );
  }, [carpools, departure, arrival, dateTime]);

  const hasParams = departure?.trim() || arrival?.trim() || dateTime?.trim();

  const recapDate = dateTime?.trim()
    ? (() => {
        const d = new Date(dateTime);
        return isNaN(d.getTime()) ? null : d;
      })()
    : null;

  return (
    <div className="min-h-screen bg-background">
      {/* Barre récap recherche - uniquement quand on a des paramètres */}
      {hasParams && (
        <div className="border-y border-border bg-card/50 backdrop-blur-sm mt-25">
          <div className="mx-auto max-w-7xl px-6 py-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3 text-foreground">
                {departure?.trim() && (
                  <>
                    <div className="flex items-center gap-2">
                      <MapPin className="size-6 text-primary bg-primary/10 rounded-full p-1" />
                      <span className="font-bold text-primary">
                        {departure}
                      </span>
                    </div>
                    {(arrival?.trim() || recapDate) && (
                      <ArrowRight
                        className="h-4 w-4 text-primary"
                        strokeWidth={5}
                      />
                    )}
                  </>
                )}
                {arrival?.trim() && (
                  <div className="flex items-center gap-2">
                    <MapPin className="size-6 text-primary bg-primary/10 rounded-full p-1" />
                    <span className="font-bold text-primary">{arrival}</span>
                  </div>
                )}
                {recapDate && (
                  <>
                    {(departure?.trim() || arrival?.trim()) && (
                      <span className="mx-2  text-primary font-black">-</span>
                    )}
                    <div className="flex items-center gap-2 text-muted-foreground bg-white border border-primary rounded-full px-3 py-1 text-sm font-bold">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span className="text-primary">
                        {format(recapDate, "EEE d MMM", { locale: fr })}
                      </span>
                    </div>
                    <span className="mx-2  text-primary font-black">-</span>
                    <div className="flex items-center gap-2 text-primary bg-white border border-primary rounded-full px-3 py-1 text-sm font-bold">
                      <Clock className="h-4 w-4" />
                      <span>{format(recapDate, "HH:mm")}</span>
                    </div>
                  </>
                )}
              </div>
              <Link href="/">
                <Button variant="outline" size="sm" className="gap-2">
                  <Edit3 className="h-4 w-4" />
                  Modifier
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Résultats */}
      <main className="mx-auto max-w-4xl px-6 py-8">
        {isLoading && (
          <div className="space-y-4">
            <div className="mb-8 space-y-2">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-4 w-32" />
            </div>
            {[1, 2, 3].map((i) => (
              <SearchCarpoolCardSkeleton key={i} />
            ))}
          </div>
        )}

        {isError && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-destructive text-center py-8"
          >
            Erreur lors du chargement des trajets.
          </motion.p>
        )}

        {!isLoading && !isError && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-2xl font-bold text-foreground">
              {filteredCarpools.length === 0
                ? "Aucun trajet disponible"
                : `${filteredCarpools.length} trajet${filteredCarpools.length !== 1 ? "s" : ""} disponible${filteredCarpools.length !== 1 ? "s" : ""}`}
            </h1>
          </motion.div>
        )}

        {!isLoading && !isError && filteredCarpools.length === 0 && (
          <EmptyState
            icon={Search}
            title="Aucun trajet ne correspond à vos critères."
          />
        )}

        {!isLoading && !isError && filteredCarpools.length > 0 && (
          <div className="space-y-4">
            {filteredCarpools.map((carpool, index) => (
              <SearchCarpoolCard
                key={carpool.id ?? index}
                carpool={carpool}
                index={index}
                onReserve={handleReserve}
                userBookingStatus={
                  carpool.id != null
                    ? bookingStatusByCarpoolId.get(carpool.id)
                    : undefined
                }
              />
            ))}
          </div>
        )}
      </main>

      <CarpoolReservationDialog
        open={selectedCarpool != null}
        onOpenChange={(open) => !open && setSelectedCarpool(null)}
        carpool={selectedCarpool}
      />
    </div>
  );
}

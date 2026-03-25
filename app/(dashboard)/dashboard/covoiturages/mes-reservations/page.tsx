"use client";

import DashboardPageTitle from "@/components/shared/dashboard-page-title";
import DashboardStatusTabs, {
  type StatusTabValue,
} from "@/components/shared/dashboard-statut-tabs";
import { CarpoolCard } from "@/components/ui/carpool-card";
import { CarpoolCardSkeleton } from "@/components/ui/carpool-card-skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { useGetCurrentUser } from "@/features/auth/hooks";
import { useGetCarpoolBookingByPassengerId } from "@/features/carpool-booking/hooks";
import { CarpoolBooking, CarpoolBookingStatus } from "@/types/carpool-booking";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";

const CURRENT_BOOKING_STATUSES: CarpoolBookingStatus[] = [
  "PENDING",
  "CONFIRMED",
];
const PAST_BOOKING_STATUSES: CarpoolBookingStatus[] = [
  "CANCELLED",
  "COMPLETED",
];

function filterBookingsByTab(
  bookings: CarpoolBooking[] | undefined,
  tab: StatusTabValue,
): CarpoolBooking[] {
  if (!bookings) return [];
  if (tab === "all") return bookings;
  if (tab === "current")
    return bookings.filter((b) => CURRENT_BOOKING_STATUSES.includes(b.status));
  return bookings.filter((b) => PAST_BOOKING_STATUSES.includes(b.status));
}

export default function MesReservations() {
  const router = useRouter();
  const [statusTab, setStatusTab] = useState<StatusTabValue>("current");
  const { data: currentUser } = useGetCurrentUser();
  const { data: bookings, isPending } = useGetCarpoolBookingByPassengerId(
    currentUser?.id,
  );

  const filteredBookings = useMemo(
    () => filterBookingsByTab(bookings, statusTab),
    [bookings, statusTab],
  );

  const handleClickCarpoolBooking = (id: number) => {
    router.push(`/dashboard/covoiturages/mes-reservations/${id}`);
  };

  return (
    <>
      <DashboardPageTitle
        title="Mes réservations"
        description="Gérez mes réservations de covoiturage"
        icon={FaCalendarAlt}
      >
        <DashboardStatusTabs value={statusTab} onValueChange={setStatusTab} />
      </DashboardPageTitle>

      {isPending ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 min-h-[200px]">
          {Array.from({ length: 4 }).map((_, index) => (
            <CarpoolCardSkeleton key={index} />
          ))}
        </div>
      ) : filteredBookings.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 min-h-[200px]">
          {filteredBookings.map((booking) => (
            <CarpoolCard
              key={booking.id}
              carpool={booking.carpool}
              bookingStatus={booking.status}
              onClick={() =>
                booking.id && handleClickCarpoolBooking(booking.id)
              }
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={FaCalendarAlt}
          iconClassName="w-10 h-10"
          title={
            <>
              {statusTab === "all" &&
                "Aucune réservation de covoiturage pour le moment"}
              {statusTab === "current" && "Aucune réservation en cours"}
              {statusTab === "past" && "Aucune réservation passée"}
            </>
          }
          description={
            <>
              {statusTab === "all" &&
                "Aucune réservation de covoiturage n'a été effectuée pour le moment."}
              {statusTab === "current" &&
                "Vos réservations en attente ou confirmées apparaîtront ici"}
              {statusTab === "past" &&
                "Vos réservations annulées ou terminées apparaîtront ici"}
            </>
          }
        />
      )}
    </>
  );
}

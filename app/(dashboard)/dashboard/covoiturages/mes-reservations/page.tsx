"use client";

import DashboardPageTitle from "@/components/shared/dashboard-page-title";
import { CarpoolCard } from "@/components/ui/carpool-card";
import { CarpoolCardSkeleton } from "@/components/ui/carpool-card-skeleton";
import { useGetCurrentUser } from "@/features/auth/hooks";
import { useGetCarpoolBookingByPassengerId } from "@/features/carpool-booking/hooks";
import { useRouter } from "next/navigation";
import { FaCalendarAlt } from "react-icons/fa";

export default function MesReservations() {
  const router = useRouter();
  const { data: currentUser } = useGetCurrentUser();
  const { data: bookings, isPending } = useGetCarpoolBookingByPassengerId(
    currentUser?.id
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
      ></DashboardPageTitle>

      {isPending ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 min-h-[200px]">
          {Array.from({ length: 4 }).map((_, index) => (
            <CarpoolCardSkeleton key={index} />
          ))}
        </div>
      ) : bookings && bookings.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 min-h-[200px]">
          {bookings.map((booking) => (
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
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <FaCalendarAlt className="w-12 h-12 text-muted-foreground mb-3 opacity-50" />
          <p className="text-sm text-muted-foreground">
            Aucune réservation de covoiturage pour le moment
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Aucune réservation de covoiturage n&apos;a été effectuée pour le
            moment.
          </p>
        </div>
      )}
    </>
  );
}

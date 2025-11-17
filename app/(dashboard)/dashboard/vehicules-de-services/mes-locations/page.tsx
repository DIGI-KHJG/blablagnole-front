"use client";

import DashboardPageTitle from "@/components/shared/dashboard-page-title";
import { CarBookingCard } from "@/components/ui/car-booking-card";
import { CarBookingCardSkeleton } from "@/components/ui/car-booking-card-skeleton";
import { useGetCurrentUser } from "@/features/auth/hooks";
import { useGetServiceCarBookingsByDriverId } from "@/features/service-car-booking/hooks";
import { useRouter } from "next/navigation";
import { FaAddressCard } from "react-icons/fa";

export default function MesLocations() {
  const router = useRouter();
  const { data: currentUser } = useGetCurrentUser();
  const { data: serviceCarBookings, isPending } =
    useGetServiceCarBookingsByDriverId(currentUser?.id);

  const handleClickServiceCarBooking = (id: number) => {
    router.push(`/dashboard/vehicules-de-services/mes-locations/${id}`);
  };

  return (
    <>
      <DashboardPageTitle
        title="Mes Locations"
        description="Gérez mes locations de véhicules de services"
        icon={FaAddressCard}
      ></DashboardPageTitle>

      {isPending ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 min-h-[200px]">
          {Array.from({ length: 4 }).map((_, index) => (
            <CarBookingCardSkeleton key={index} />
          ))}
        </div>
      ) : serviceCarBookings && serviceCarBookings.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 min-h-[200px]">
          {serviceCarBookings.map((booking) => (
            <CarBookingCard
              key={booking.id}
              booking={booking}
              onClick={() =>
                booking.id && handleClickServiceCarBooking(booking.id)
              }
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <FaAddressCard className="w-12 h-12 text-muted-foreground mb-3 opacity-50" />
          <p className="text-sm text-muted-foreground">
            Aucune location de véhicule de service
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Vous n&apos;avez pas encore de location de véhicule de service pour
            le moment.
          </p>
        </div>
      )}
    </>
  );
}

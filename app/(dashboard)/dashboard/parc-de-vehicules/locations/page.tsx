"use client";

import DashboardPageTitle from "@/components/shared/dashboard-page-title";
import { CarBookingCard } from "@/components/ui/car-booking-card";
import { CarBookingCardSkeleton } from "@/components/ui/car-booking-card-skeleton";
import {
  useDeleteServiceCarBooking,
  useGetServiceCarBookings,
} from "@/features/service-car-booking/hooks";
import ServiceCarBookingFormDialog from "@/features/service-car-booking/ui/service-car-booking-form-dialog";
import { ServiceCarBooking } from "@/types/service-car-booking";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaAddressCard } from "react-icons/fa";
import { toast } from "sonner";

export default function ParcDeVehiculesLocations() {
  const router = useRouter();

  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [selectedServiceCarBooking, setSelectedServiceCarBooking] =
    useState<ServiceCarBooking | null>(null);

  const { data: serviceCarBookings, isPending } = useGetServiceCarBookings();
  const { mutate: deleteServiceCarBooking } = useDeleteServiceCarBooking();

  const handleClickServiceCarBooking = (id: number) => {
    router.push(`/dashboard/parc-de-vehicules/locations/${id}`);
  };

  const handleDeleteServiceCarBooking = async (id: number) => {
    deleteServiceCarBooking(id, {
      onSuccess: () => {
        toast.success("Location supprimée avec succès");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  return (
    <>
      <DashboardPageTitle
        title="Locations"
        description="Gérez les locations de véhicules de services"
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
              onEdit={() => {
                setSelectedServiceCarBooking(booking);
                setIsFormDialogOpen(true);
              }}
              onClick={() =>
                booking.id && handleClickServiceCarBooking(booking.id)
              }
              onDelete={() =>
                booking.id && handleDeleteServiceCarBooking(booking.id)
              }
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <FaAddressCard className="w-12 h-12 text-muted-foreground mb-3 opacity-50" />
          <p className="text-sm text-muted-foreground">Aucune location</p>
          <p className="text-xs text-muted-foreground mt-1">
            Vous n&apos;avez pas encore de location pour le moment.
          </p>
        </div>
      )}
      <ServiceCarBookingFormDialog
        isOpen={isFormDialogOpen}
        onClose={() => setIsFormDialogOpen(false)}
        showStatusField={true}
        initialData={selectedServiceCarBooking ?? undefined}
      />
    </>
  );
}

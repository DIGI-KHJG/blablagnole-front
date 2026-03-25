"use client";

import DashboardPageTitle from "@/components/shared/dashboard-page-title";
import DashboardStatusTabs, {
  type StatusTabValue,
} from "@/components/shared/dashboard-statut-tabs";
import VehicleFiltersBar from "@/components/shared/vehicle-filters-bar";
import { CarBookingCard } from "@/components/ui/car-booking-card";
import { CarBookingCardSkeleton } from "@/components/ui/car-booking-card-skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import {
  useDeleteServiceCarBooking,
  useGetServiceCarBookings,
} from "@/features/service-car-booking/hooks";
import ServiceCarBookingFormDialog from "@/features/service-car-booking/ui/service-car-booking-form-dialog";
import {
  filterBookingsByVehicleFilters,
  type VehicleFilters,
} from "@/lib/filters/vehicle-filters";
import {
  ServiceCarBooking,
  ServiceCarBookingStatus,
} from "@/types/service-car-booking";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { FaAddressCard } from "react-icons/fa";
import { toast } from "sonner";

const DEFAULT_FILTERS: VehicleFilters = {
  brand: "",
  category: "",
  motorisation: "",
  immatriculation: "",
  status: "",
};

const CURRENT_BOOKING_STATUSES: ServiceCarBookingStatus[] = [
  "PENDING",
  "CONFIRMED",
];
const PAST_BOOKING_STATUSES: ServiceCarBookingStatus[] = [
  "CANCELLED",
  "COMPLETED",
];

function filterBookingsByTab(
  bookings: ServiceCarBooking[] | undefined,
  tab: StatusTabValue,
): ServiceCarBooking[] {
  if (!bookings) return [];
  if (tab === "all") return bookings;
  if (tab === "current")
    return bookings.filter((b) => CURRENT_BOOKING_STATUSES.includes(b.status));
  return bookings.filter((b) => PAST_BOOKING_STATUSES.includes(b.status));
}

export default function ParcDeVehiculesLocations() {
  const router = useRouter();
  const [statusTab, setStatusTab] = useState<StatusTabValue>("current");
  const [vehicleFilters, setVehicleFilters] =
    useState<VehicleFilters>(DEFAULT_FILTERS);
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [selectedServiceCarBooking, setSelectedServiceCarBooking] =
    useState<ServiceCarBooking | null>(null);

  const { data: serviceCarBookings, isPending } = useGetServiceCarBookings();
  const { mutate: deleteServiceCarBooking } = useDeleteServiceCarBooking();

  const filteredBookings = useMemo(() => {
    const byTab = filterBookingsByTab(serviceCarBookings, statusTab);
    return filterBookingsByVehicleFilters(byTab, vehicleFilters);
  }, [serviceCarBookings, statusTab, vehicleFilters]);

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
      >
        <div className="flex flex-wrap items-center gap-3">
          <DashboardStatusTabs value={statusTab} onValueChange={setStatusTab} />
          <VehicleFiltersBar
            filters={vehicleFilters}
            onFiltersChange={setVehicleFilters}
          />
        </div>
      </DashboardPageTitle>

      {isPending ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 min-h-[200px]">
          {Array.from({ length: 4 }).map((_, index) => (
            <CarBookingCardSkeleton key={index} />
          ))}
        </div>
      ) : filteredBookings.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 min-h-[200px]">
          {filteredBookings.map((booking) => (
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
        <EmptyState
          icon={FaAddressCard}
          title={
            <>
              {statusTab === "all" && "Aucune location"}
              {statusTab === "current" && "Aucune location en cours"}
              {statusTab === "past" && "Aucune location passée"}
            </>
          }
          description={
            <>
              {statusTab === "all" &&
                "Vous n'avez pas encore de location pour le moment."}
              {statusTab === "current" &&
                "Les locations en attente ou confirmées apparaîtront ici."}
              {statusTab === "past" &&
                "Les locations annulées ou terminées apparaîtront ici."}
            </>
          }
        />
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

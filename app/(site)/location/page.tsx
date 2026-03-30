"use client";

import { LocationHeroSection } from "@/components/site/location-hero-section";
import SiteLocationFiltersBar, {
  SiteLocationCategoryBadges,
} from "@/components/site/site-location-filters-bar";
import { CarCard } from "@/components/ui/car-card";
import { CarCardSkeleton } from "@/components/ui/car-card-skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/text-animations";
import { useGetCurrentUser } from "@/features/auth/hooks";
import { useGetServiceCarBookings } from "@/features/service-car-booking/hooks";
import { ServiceCarBookingRangeDialog } from "@/features/service-car-booking/ui/service-car-booking-range-dialog";
import { useGetServiceCars } from "@/features/service-car/hooks";
import {
  filterCarsByVehicleFilters,
  type VehicleFilters,
} from "@/lib/filters/vehicle-filters";
import type { Car } from "@/types/car";
import type { ServiceCarBooking } from "@/types/service-car-booking";
import { Car as CarIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

const DEFAULT_FILTERS: VehicleFilters = {
  brand: "",
  category: "",
  motorisation: "",
  immatriculation: "",
};

/**
 * Construit l’ensemble des ids de véhicules actuellement réservés par l'utilisateur connecté
 * (PENDING/CONFIRMED) et dont la période de réservation recouvre "maintenant".
 * @param bookings Liste des réservations de véhicules de service.
 * @param currentUserId Id de l'utilisateur connecté.
 * @returns Ensemble des ids de véhicules indisponibles à l’instant T pour cet utilisateur.
 */
function getReservedServiceCarIds(
  bookings: ServiceCarBooking[] | undefined,
  currentUserId?: number,
): Set<number> {
  const reserved = new Set<number>();
  if (!bookings || currentUserId == null) return reserved;
  const now = Date.now();
  for (const b of bookings) {
    if (b.status !== "PENDING" && b.status !== "CONFIRMED") continue;
    const bookingUserId = b.driverId ?? b.driver?.id;
    if (bookingUserId !== currentUserId) continue;
    const carId = b.serviceCarId ?? b.serviceCar?.id;
    if (carId == null) continue;
    const start =
      b.startAt instanceof Date
        ? b.startAt.getTime()
        : new Date(b.startAt as string).getTime();
    const end =
      b.endAt instanceof Date
        ? b.endAt.getTime()
        : new Date(b.endAt as string).getTime();
    if (Number.isNaN(start) || Number.isNaN(end)) continue;
    if (now >= start && now <= end) reserved.add(carId);
  }
  return reserved;
}

/** Page de location : liste des véhicules disponibles avec filtres et réservation via un dialogue. */
export default function LocationPage() {
  const [vehicleFilters, setVehicleFilters] =
    useState<VehicleFilters>(DEFAULT_FILTERS);
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);

  const { data: currentUser } = useGetCurrentUser();
  const { data: serviceCars, isPending: isPendingCars } = useGetServiceCars();
  const { data: serviceCarBookings, isPending: isPendingBookings } =
    useGetServiceCarBookings();

  const filteredCars = useMemo(() => {
    const inService = (serviceCars ?? []).filter(
      (car) => car.status === "IN_SERVICE",
    );
    const reservedIds = getReservedServiceCarIds(
      serviceCarBookings,
      currentUser?.id,
    );
    const available = inService.filter(
      (car) => car.id != null && !reservedIds.has(car.id),
    );
    return filterCarsByVehicleFilters(available, vehicleFilters);
  }, [serviceCars, serviceCarBookings, currentUser?.id, vehicleFilters]);

  const isPending = isPendingCars || isPendingBookings;

  const handleLouerClick = (car: Car) => {
    if (!currentUser) {
      toast.error("Connectez-vous pour réserver un véhicule.");
      return;
    }
    setSelectedCar(car);
    setBookingDialogOpen(true);
  };

  const gridClassName =
    "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 pt-8 pb-4";

  return (
    <main className="min-h-screen bg-background">
      <LocationHeroSection />

      <section
        className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10"
        aria-labelledby="vehicules-disponibles-title"
      >
        <header className="mb-8 sm:mb-10">
          <FadeIn>
            <h2
              id="vehicules-disponibles-title"
              className="text-2xl sm:text-3xl font-bold text-foreground mb-1.5"
            >
              Véhicules disponibles
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              Parc de véhicules de service à réserver pour vos trajets
            </p>
          </FadeIn>
        </header>

        <FadeIn delay={0.1}>
          <div className="bg-background rounded-2xl border border-border p-5 sm:p-6 shadow-lg -mt-6 sm:-mt-8 relative z-20">
            <SiteLocationFiltersBar
              filters={vehicleFilters}
              onFiltersChange={setVehicleFilters}
            />
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="pt-6 pb-2">
            <SiteLocationCategoryBadges
              filters={vehicleFilters}
              onFiltersChange={setVehicleFilters}
            />
          </div>
        </FadeIn>

        {isPending ? (
          <FadeIn delay={0.2}>
            <div className={gridClassName}>
              {Array.from({ length: 6 }).map((_, index) => (
                <CarCardSkeleton key={index} />
              ))}
            </div>
          </FadeIn>
        ) : filteredCars.length > 0 ? (
          <StaggerContainer staggerDelay={0.08} className={gridClassName}>
            {filteredCars.map((serviceCar) => (
              <StaggerItem key={serviceCar.id}>
                <CarCard
                  car={serviceCar}
                  type="location"
                  hideRegistrationPlate
                  onClick={() =>
                    serviceCar.id != null && handleLouerClick(serviceCar)
                  }
                />
              </StaggerItem>
            ))}
          </StaggerContainer>
        ) : (
          <FadeIn delay={0.2}>
            <EmptyState
              icon={CarIcon}
              title="Aucun véhicule disponible"
              description="Aucun véhicule ne correspond aux filtres ou il n'y a pas de véhicule de service disponible pour la location pour le moment."
              className="pt-10 pb-6"
            />
          </FadeIn>
        )}
      </section>

      <ServiceCarBookingRangeDialog
        open={bookingDialogOpen}
        onOpenChange={(open) => {
          setBookingDialogOpen(open);
          if (!open) setSelectedCar(null);
        }}
        serviceCar={selectedCar}
      />
    </main>
  );
}

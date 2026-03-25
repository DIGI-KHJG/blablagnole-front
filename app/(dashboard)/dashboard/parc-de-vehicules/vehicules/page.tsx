"use client";

import DashboardPageTitle from "@/components/shared/dashboard-page-title";
import VehicleFiltersBar from "@/components/shared/vehicle-filters-bar";
import { CarCard } from "@/components/ui/car-card";
import { CarCardSkeleton } from "@/components/ui/car-card-skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import {
  filterCarsByVehicleFilters,
  type VehicleFilters,
} from "@/lib/filters/vehicle-filters";
import {
  useDeleteServiceCar,
  useGetServiceCars,
} from "@/features/service-car/hooks";
import ServiceCarFormDialog from "@/features/service-car/ui/service-car-form-dialog";
import { Car } from "@/types/car";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { FaCar } from "react-icons/fa";
import { toast } from "sonner";

const DEFAULT_FILTERS: VehicleFilters = {
  brand: "",
  category: "",
  motorisation: "",
  immatriculation: "",
  status: "",
};

export default function ParcDeVehicules() {
  const router = useRouter();
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [selectedServiceCar, setSelectedServiceCar] = useState<Car | null>(
    null
  );
  const [vehicleFilters, setVehicleFilters] =
    useState<VehicleFilters>(DEFAULT_FILTERS);
  const { data: serviceCars, isPending } = useGetServiceCars();
  const { mutate: deleteServiceCar } = useDeleteServiceCar();

  const filteredCars = useMemo(
    () => filterCarsByVehicleFilters(serviceCars, vehicleFilters),
    [serviceCars, vehicleFilters]
  );

  const handleClickServiceCar = (id: number) => {
    router.push(`/dashboard/parc-de-vehicules/vehicules/${id}`);
  };

  const handleDeleteServiceCar = async (id: number) => {
    deleteServiceCar(id, {
      onSuccess: () => {
        toast.success("Véhicule de service supprimé avec succès");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  return (
    <>
      <DashboardPageTitle
        title="Parc de véhicules"
        description="Gérez le parc de véhicules de l'entreprise"
        icon={FaCar}
        buttonText="Ajouter un véhicule de service"
        onButtonClick={() => setIsFormDialogOpen(true)}
      >
        <VehicleFiltersBar
          filters={vehicleFilters}
          onFiltersChange={setVehicleFilters}
          showStatus
        />
      </DashboardPageTitle>

      {isPending ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 min-h-[200px]">
          {Array.from({ length: 4 }).map((_, index) => (
            <CarCardSkeleton key={index} />
          ))}
        </div>
      ) : filteredCars.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 min-h-[200px]">
          {filteredCars.map((serviceCar) => (
            <CarCard
              key={serviceCar.id}
              car={serviceCar}
              onEdit={() => {
                setSelectedServiceCar(serviceCar);
                setIsFormDialogOpen(true);
              }}
              onDelete={() =>
                serviceCar.id && handleDeleteServiceCar(serviceCar.id)
              }
              onClick={() =>
                serviceCar.id && handleClickServiceCar(serviceCar.id)
              }
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={FaCar}
          title="Aucun véhicule de service enregistré"
          description="Aucun véhicule ne correspond aux filtres ou ajoutez votre premier véhicule de service pour commencer"
        />
      )}
      <ServiceCarFormDialog
        isOpen={isFormDialogOpen}
        onClose={() => setIsFormDialogOpen(false)}
        initialData={selectedServiceCar ?? undefined}
      />
    </>
  );
}

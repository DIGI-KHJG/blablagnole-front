"use client";
import DashboardPageTitle from "@/components/shared/dashboard-page-title";
import { CarCard, CarCardSkeleton } from "@/components/ui/car-card";
import {
  useDeleteServiceCar,
  useGetServiceCars,
} from "@/features/service-car/hooks";
import ServiceCarFormDialog from "@/features/service-car/ui/service-car-form-dialog";
import { Car } from "@/types/car";
import { useRouter } from "next/navigation";

import { useState } from "react";
import { FaTruck } from "react-icons/fa";
import { toast } from "sonner";

export default function ParcDeVehicules() {
  const router = useRouter();
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [selectedServiceCar, setSelectedServiceCar] = useState<Car | null>(
    null
  );
  const { data: serviceCars, isPending } = useGetServiceCars();
  const { mutate: deleteServiceCar } = useDeleteServiceCar();

  const handleClickServiceCar = (id: number) => {
    router.push(`/dashboard/parc-de-vehicules/${id}`);
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
        icon={FaTruck}
        buttonText="Ajouter un véhicule de service"
        onButtonClick={() => setIsFormDialogOpen(true)}
      ></DashboardPageTitle>

      {isPending ? (
        <CarCardSkeleton />
      ) : serviceCars && serviceCars.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 min-h-[200px]">
          {serviceCars.map((serviceCar) => (
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
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <FaTruck className="w-12 h-12 text-muted-foreground mb-3 opacity-50" />
          <p className="text-sm text-muted-foreground">
            Aucun véhicule de service enregistré
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Ajoutez votre premier véhicule de service pour commencer
          </p>
        </div>
      )}
      <ServiceCarFormDialog
        isOpen={isFormDialogOpen}
        onClose={() => setIsFormDialogOpen(false)}
        initialData={selectedServiceCar ?? undefined}
      />
    </>
  );
}

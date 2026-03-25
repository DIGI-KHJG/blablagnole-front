"use client";

import { Button } from "@/components/ui/button";
import { CarCard } from "@/components/ui/car-card";
import { CarCardSkeleton } from "@/components/ui/car-card-skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { useGetCurrentUser } from "@/features/auth/hooks";
import { useDeleteCar, useGetDriverCarById } from "@/features/car/hooks";
import CarFormDialog from "@/features/car/ui/car-form-dialog";
import { ProfileHeader } from "@/features/profile/ui/profile-header";
import { ProfileHeaderSkeleton } from "@/features/profile/ui/profile-header-skeleton";
import { Car } from "@/types/car";
import { useState } from "react";
import { LuCar, LuPlus } from "react-icons/lu";
import { toast } from "sonner";

export default function ProfilePage() {
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);

  const { data: user, isPending: isPendingUser } = useGetCurrentUser();
  const { data: car, isPending } = useGetDriverCarById(user?.id);
  const { mutate: deleteCar } = useDeleteCar();

  const handleDeleteCar = async (carId: number) => {
    deleteCar(carId, {
      onSuccess: () => {
        toast.success("Véhicule supprimé avec succès");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-8 h-[88vh]">
      <div className="md:col-span-3 border border-border rounded-lg p-4">
        {isPendingUser ? (
          <ProfileHeaderSkeleton />
        ) : (
          <ProfileHeader user={user ?? null} />
        )}
      </div>

      <div className="md:col-span-2 bg-card rounded-lg p-4 border border-border">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <LuCar className="w-6 h-6 text-primary" />
            {car?.length === 1 ? "Mon véhicule" : "Mes véhicules"}
          </h2>
          <Button onClick={() => setIsFormDialogOpen(true)}>
            <LuPlus className="w-4 h-4" /> Ajouter une voiture
          </Button>
        </div>
        {isPending ? (
          <CarCardSkeleton />
        ) : car && car.length > 0 ? (
          <div className="flex flex-col gap-4">
            {car.map((car) => (
              <CarCard
                key={car.id}
                car={car}
                onEdit={() => {
                  setSelectedCar(car);
                  setIsFormDialogOpen(true);
                }}
                onDelete={() => car.id && handleDeleteCar(car.id)}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={LuCar}
            title="Aucun véhicule enregistré"
            description="Ajoutez votre premier véhicule pour commencer"
          />
        )}
      </div>

      <CarFormDialog
        isOpen={isFormDialogOpen}
        onClose={() => {
          setIsFormDialogOpen(false);
          setSelectedCar(null);
        }}
        initialData={selectedCar ?? undefined}
      />
    </div>
  );
}

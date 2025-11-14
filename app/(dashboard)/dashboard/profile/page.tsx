"use client";

import { Button } from "@/components/ui/button";
import { useGetCurrentUser } from "@/features/auth/hooks";
import { useDeleteCar, useGetDriverCarById } from "@/features/car/hooks";
import { CarCard, CarCardSkeleton } from "@/features/car/ui/car-card";
import CarFormDialog from "@/features/car/ui/car-form-dialog";
import { ProfileHeader } from "@/features/profile/ui/profile-header";
import { useState } from "react";
import { LuCar, LuPlus } from "react-icons/lu";
import { toast } from "sonner";

export default function ProfilePage() {
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);

  const { data: user } = useGetCurrentUser();
  const { data: car, isPending } = useGetDriverCarById(user?.id ?? "");
  const { mutate: deleteCar } = useDeleteCar();

  const handleDeleteCar = async (carId: string) => {
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
        <ProfileHeader user={user ?? null} />
      </div>

      <div className="md:col-span-2 bg-primary/5 rounded-lg p-4 border border-border">
        <div className="sticky top-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <LuCar className="w-6 h-6 text-blue-500" />
              Mon Véhicule
            </h2>
            <Button onClick={() => setIsFormDialogOpen(true)}>
              <LuPlus className="w-4 h-4" /> Ajouter une voiture
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          {isPending ? (
            <CarCardSkeleton />
          ) : car && car.length > 0 ? (
            car.map((car) => (
              <CarCard
                key={car.id}
                car={car}
                onDelete={() => car.id && handleDeleteCar(car.id)}
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <LuCar className="w-12 h-12 text-muted-foreground mb-3 opacity-50" />
              <p className="text-sm text-muted-foreground">
                Aucun véhicule enregistré
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Ajoutez votre premier véhicule pour commencer
              </p>
            </div>
          )}
        </div>
      </div>

      <CarFormDialog
        isOpen={isFormDialogOpen}
        onClose={() => setIsFormDialogOpen(false)}
      />
    </div>
  );
}

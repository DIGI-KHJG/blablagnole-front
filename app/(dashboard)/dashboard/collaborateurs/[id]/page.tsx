"use client";

import { CarCard } from "@/components/ui/car-card";
import { CarCardSkeleton } from "@/components/ui/car-card-skeleton";
import { useDeleteCar, useGetDriverCarById } from "@/features/car/hooks";
import { ProfileHeader } from "@/features/profile/ui/profile-header";
import { ProfileHeaderSkeleton } from "@/features/profile/ui/profile-header-skeleton";
import { useGetUserById } from "@/features/user/hooks";
import { useParams } from "next/navigation";
import { LuCar } from "react-icons/lu";
import { toast } from "sonner";

export default function CollaborateurProfilePage() {
  const { id } = useParams();

  const { data: user, isPending } = useGetUserById(id as string);
  const { data: cars, isPending: isPendingCars } = useGetDriverCarById(
    user?.id
  );

  console.log("user", user);

  const { mutate: deleteCar } = useDeleteCar();

  const handleDeleteCar = (carId: number) => {
    deleteCar(carId, {
      onSuccess: () => {
        toast.success("Véhicule supprimé avec succès");
      },
      onError: (err) => toast.error(err.message),
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-8 h-[88vh]">
      <div className="md:col-span-3 border border-border rounded-lg p-4">
        {isPending ? (
          <ProfileHeaderSkeleton />
        ) : (
          <ProfileHeader user={user ?? null} />
        )}
      </div>

      <div className="md:col-span-2 bg-card rounded-lg p-4 border border-border">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <LuCar className="w-6 h-6 text-primary" />
            Véhicules
          </h2>
        </div>

        {isPendingCars ? (
          <CarCardSkeleton />
        ) : cars && cars.length > 0 ? (
          <div className="flex flex-col gap-4">
            {cars.map((car) => (
              <CarCard
                key={car.id}
                car={car}
                onDelete={() => car.id && handleDeleteCar(car.id)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <LuCar className="w-12 h-12 text-muted-foreground mb-3 opacity-50" />
            <p className="text-sm text-muted-foreground">
              Aucun véhicule enregistré pour cet utilisateur
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import { useParams } from "next/navigation";
import { useGetUserById } from "@/features/user/hooks";
import { useGetDriverCarById, useDeleteCar } from "@/features/car/hooks";
import { ProfileHeader } from "@/features/profile/ui/profile-header";
import { CarCard } from "@/components/ui/car-card";
import { CarCardSkeleton } from "@/components/ui/car-card-skeleton";
import { LuCar } from "react-icons/lu";
import { toast } from "sonner";

export default function CollaborateurProfilePage() {
  const params = useParams();
  const id = Number(params.id);

  // Récup user
  const { data: user, isPending: loadingUser } = useGetUserById(id);

  // Récup voitures de ce user
  const { data: cars, isPending: loadingCars } = useGetDriverCarById(id);

  const { mutate: deleteCar } = useDeleteCar();

  const handleDeleteCar = (carId: number) => {
    deleteCar(carId, {
      onSuccess: () => {
        toast.success("Véhicule supprimé avec succès");
      },
      onError: (err) => toast.error(err.message),
    });
  };

  if (loadingUser) return <p className="p-4">Chargement...</p>;
  if (!user) return <p className="p-4">Utilisateur introuvable.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-8 h-[88vh]">
      {/* COLONNE GAUCHE — PROFIL */}
      <div className="md:col-span-3 border border-border rounded-lg p-4">
        <ProfileHeader user={user} />
      </div>

      {/* COLONNE DROITE — VEHICULES */}
      <div className="md:col-span-2 bg-card rounded-lg p-4 border border-border">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <LuCar className="w-6 h-6 text-primary" />
            Véhicules
          </h2>
        </div>

        {loadingCars ? (
          <CarCardSkeleton />
        ) : cars && cars.length > 0 ? (
          <div className="flex flex-col gap-4">
            {cars.map((car) => (
              <CarCard
                key={car.id}
                car={car}
                onDelete={() => handleDeleteCar(car.id)}
                // tu peux enlever onEdit si tu ne veux pas qu'on puisse modifier ici
                onEdit={undefined}
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

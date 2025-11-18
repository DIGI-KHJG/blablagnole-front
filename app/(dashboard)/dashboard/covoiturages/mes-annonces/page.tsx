"use client";
import DashboardPageTitle from "@/components/shared/dashboard-page-title";
import { CarpoolCard } from "@/components/ui/carpool-card";
import { CarpoolCardSkeleton } from "@/components/ui/carpool-card-skeleton";
import { useGetCurrentUser } from "@/features/auth/hooks";
import {
  useDeleteCarpool,
  useGetCarpoolsByDriverId,
} from "@/features/carpool/hooks";
import CarpoolFormDialog from "@/features/carpool/ui/carpool-form-dialog";
import { Carpool } from "@/types/carpool";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PiCardsFill } from "react-icons/pi";
import { toast } from "sonner";

export default function MesAnnonces() {
  const router = useRouter();
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [selectedCarpool, setSelectedCarpool] = useState<Carpool | null>(null);
  const { data: user } = useGetCurrentUser();
  const { data: carpools, isPending } = useGetCarpoolsByDriverId(user?.id);
  const { mutate: deleteCarpool } = useDeleteCarpool();

  const handleClickCarpool = (id: number) => {
    router.push(`/dashboard/covoiturages/mes-annonces/${id}`);
  };

  const handleDeleteCarpool = async (id: number) => {
    deleteCarpool(id, {
      onSuccess: () => {
        toast.success("Annonce de covoiturage supprimée avec succès");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  return (
    <>
      <DashboardPageTitle
        title="Mes annonces"
        description="Gérez mes annonces de covoiturage"
        icon={PiCardsFill}
        buttonText="Publier une annonce"
        onButtonClick={() => setIsFormDialogOpen(true)}
      ></DashboardPageTitle>

      {isPending ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 min-h-[200px]">
          {Array.from({ length: 4 }).map((_, index) => (
            <CarpoolCardSkeleton key={index} />
          ))}
        </div>
      ) : carpools && carpools.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 min-h-[200px]">
          {carpools.map((carpool) => (
            <CarpoolCard
              key={carpool.id}
              carpool={carpool}
              onEdit={() => {
                setSelectedCarpool(carpool);
                setIsFormDialogOpen(true);
              }}
              onDelete={() => carpool.id && handleDeleteCarpool(carpool.id)}
              onClick={() => carpool.id && handleClickCarpool(carpool.id)}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <PiCardsFill className="w-12 h-12 text-muted-foreground mb-3 opacity-50" />
          <p className="text-sm text-muted-foreground">
            Aucune annonce de covoiturage enregistrée
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Publiez votre première annonce pour commencer
          </p>
        </div>
      )}

      <CarpoolFormDialog
        isOpen={isFormDialogOpen}
        onClose={() => {
          setIsFormDialogOpen(false);
          setSelectedCarpool(selectedCarpool ?? null);
        }}
      />
    </>
  );
}

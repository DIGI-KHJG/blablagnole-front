"use client";
import DashboardPageTitle from "@/components/shared/dashboard-page-title";
import DashboardStatusTabs, {
  type StatusTabValue,
} from "@/components/shared/dashboard-statut-tabs";
import { CarpoolCard } from "@/components/ui/carpool-card";
import { CarpoolCardSkeleton } from "@/components/ui/carpool-card-skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { useGetCurrentUser } from "@/features/auth/hooks";
import {
  useDeleteCarpool,
  useGetCarpoolsByDriverId,
} from "@/features/carpool/hooks";
import CarpoolFormDialog from "@/features/carpool/ui/carpool-form-dialog";
import { Carpool, CarpoolStatus } from "@/types/carpool";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { PiCardsFill } from "react-icons/pi";
import { toast } from "sonner";

const CURRENT_STATUSES: CarpoolStatus[] = ["OPEN", "FULL"];
const PAST_STATUSES: CarpoolStatus[] = ["CANCELLED", "COMPLETED"];

function filterCarpoolsByTab(
  carpools: Carpool[] | undefined,
  tab: StatusTabValue,
): Carpool[] {
  if (!carpools) return [];
  if (tab === "all") return carpools;
  if (tab === "current")
    return carpools.filter((c) => CURRENT_STATUSES.includes(c.status));
  return carpools.filter((c) => PAST_STATUSES.includes(c.status));
}

export default function MesAnnonces() {
  const router = useRouter();
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [selectedCarpool, setSelectedCarpool] = useState<Carpool | null>(null);
  const [statusTab, setStatusTab] = useState<StatusTabValue>("current");
  const { data: user } = useGetCurrentUser();
  const { data: carpools, isPending } = useGetCarpoolsByDriverId(user?.id);
  const { mutate: deleteCarpool } = useDeleteCarpool();
  const filteredCarpools = useMemo(
    () => filterCarpoolsByTab(carpools, statusTab),
    [carpools, statusTab],
  );

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
        onButtonClick={() => {
          setSelectedCarpool(null);
          setIsFormDialogOpen(true);
        }}
      >
        <DashboardStatusTabs value={statusTab} onValueChange={setStatusTab} />
      </DashboardPageTitle>

      {isPending ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 min-h-[200px]">
          {Array.from({ length: 4 }).map((_, index) => (
            <CarpoolCardSkeleton key={index} />
          ))}
        </div>
      ) : filteredCarpools.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 min-h-[200px]">
          {filteredCarpools.map((carpool) => (
            <CarpoolCard
              key={carpool.id}
              carpool={carpool}
              canEdit={
                (carpool?.passengers?.length ?? 0) === 0 &&
                (carpool?.seatsRemaining == null ||
                  carpool?.seatsTotal == null ||
                  carpool.seatsRemaining >= carpool.seatsTotal)
              }
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
        <EmptyState
          icon={PiCardsFill}
          title={
            <>
              {statusTab === "all" &&
                "Aucune annonce de covoiturage enregistrée"}
              {statusTab === "current" && "Aucune annonce en cours"}
              {statusTab === "past" && "Aucun covoiturage passé"}
            </>
          }
          description={
            <>
              {statusTab === "all" &&
                "Publiez votre première annonce pour commencer"}
              {statusTab === "current" &&
                "Vos annonces ouvertes ou complètes apparaîtront ici"}
              {statusTab === "past" &&
                "Vos annonces annulées ou terminées apparaîtront ici"}
            </>
          }
        />
      )}

      <CarpoolFormDialog
        isOpen={isFormDialogOpen}
        initialData={selectedCarpool ?? undefined}
        onClose={() => {
          setIsFormDialogOpen(false);
          setSelectedCarpool(null);
        }}
      />
    </>
  );
}

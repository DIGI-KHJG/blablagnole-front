"use client";

import DashboardPageTitle from "@/components/shared/dashboard-page-title";
import { CarpoolCard } from "@/components/ui/carpool-card";
import { CarpoolCardSkeleton } from "@/components/ui/carpool-card-skeleton";
import { useGetCarpools } from "@/features/carpool/hooks";
import { useRouter } from "next/navigation";
import { FaCar } from "react-icons/fa";

export default function CarpoolsPage() {
  const router = useRouter();
  const { data: carpools, isPending } = useGetCarpools();

  const handleClickCarpool = (id: number) => {
    router.push(`/dashboard/covoiturages/${id}`);
  };

  return (
    <>
      <DashboardPageTitle
        title="Covoiturages"
        description="Liste des covoiturages disponibles"
        icon={FaCar}
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
              onClick={() => carpool.id && handleClickCarpool(carpool.id)}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <FaCar className="w-12 h-12 text-muted-foreground mb-3 opacity-50" />
          <p className="text-sm text-muted-foreground">
            Aucun covoiturage disponible pour le moment
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Aucune annonce de covoiturage n&apos;a été publiée pour le moment.
          </p>
        </div>
      )}
    </>
  );
}

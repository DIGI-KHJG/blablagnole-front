"use client";

import DashboardPageTitle from "@/components/shared/dashboard-page-title";
import DashboardStatusTabs, {
  type StatusTabValue,
} from "@/components/shared/dashboard-statut-tabs";
import { CarpoolCard } from "@/components/ui/carpool-card";
import { CarpoolCardSkeleton } from "@/components/ui/carpool-card-skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { useGetCarpools } from "@/features/carpool/hooks";
import { Carpool, CarpoolStatus } from "@/types/carpool";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { FaCar } from "react-icons/fa";

const CURRENT_STATUSES: CarpoolStatus[] = ["OPEN", "FULL"];
const PAST_STATUSES: CarpoolStatus[] = ["CANCELLED", "COMPLETED"];

function filterCarpoolsByTab(
  carpools: Carpool[] | undefined,
  tab: StatusTabValue
): Carpool[] {
  if (!carpools) return [];
  if (tab === "all") return carpools;
  if (tab === "current")
    return carpools.filter((c) => CURRENT_STATUSES.includes(c.status));
  return carpools.filter((c) => PAST_STATUSES.includes(c.status));
}

export default function CarpoolsPage() {
  const router = useRouter();
  const [statusTab, setStatusTab] = useState<StatusTabValue>("all");
  const { data: carpools, isPending } = useGetCarpools();

  const filteredCarpools = useMemo(
    () => filterCarpoolsByTab(carpools, statusTab),
    [carpools, statusTab]
  );

  const handleClickCarpool = (id: number) => {
    router.push(`/dashboard/covoiturages/${id}`);
  };

  return (
    <>
      <DashboardPageTitle
        title="Covoiturages"
        description="Liste des covoiturages disponibles"
        icon={FaCar}
      >
        <DashboardStatusTabs
          value={statusTab}
          onValueChange={setStatusTab}
        />
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
              onClick={() => carpool.id && handleClickCarpool(carpool.id)}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={FaCar}
          title={
            <>
              {statusTab === "all" && "Aucun covoiturage disponible pour le moment"}
              {statusTab === "current" && "Aucun covoiturage en cours"}
              {statusTab === "past" && "Aucun covoiturage passé"}
            </>
          }
          description={
            <>
              {statusTab === "all" &&
                "Aucune annonce de covoiturage n'a été publiée pour le moment."}
              {statusTab === "current" &&
                "Les covoiturages ouverts ou complets apparaîtront ici."}
              {statusTab === "past" &&
                "Les covoiturages annulés ou terminés apparaîtront ici."}
            </>
          }
        />
      )}
    </>
  );
}

"use client";
import DashboardPageTitle from "@/components/shared/dashboard-page-title";
import { CarCard } from "@/components/ui/car-card";
import { CarCardSkeleton } from "@/components/ui/car-card-skeleton";
import { useGetServiceCars } from "@/features/service-car/hooks";
import { useRouter } from "next/navigation";
import { MdOutlinePayments } from "react-icons/md";

export default function Location() {
  const router = useRouter();
  const { data: serviceCars, isPending } = useGetServiceCars();

  const handleClickServiceCar = (id: number) => {
    router.push(`/dashboard/vehicules-de-services/location/${id}`);
  };
  return (
    <>
      <DashboardPageTitle
        title="Location"
        description="Louer un véhicule de service"
        icon={MdOutlinePayments}
      ></DashboardPageTitle>

      {isPending ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 min-h-[200px]">
          {Array.from({ length: 4 }).map((_, index) => (
            <CarCardSkeleton key={index} />
          ))}
        </div>
      ) : serviceCars && serviceCars.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 min-h-[200px]">
          {serviceCars.map((serviceCar) => (
            <CarCard
              key={serviceCar.id}
              car={serviceCar}
              onClick={() =>
                serviceCar.id && handleClickServiceCar(serviceCar.id)
              }
              type="location"
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <MdOutlinePayments className="w-12 h-12 text-muted-foreground mb-3 opacity-50" />
          <p className="text-sm text-muted-foreground">
            Aucun véhicule de service disponible
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Il n&apos;y a pas de véhicule de service disponible pour la location
            pour le moment.
          </p>
        </div>
      )}
    </>
  );
}

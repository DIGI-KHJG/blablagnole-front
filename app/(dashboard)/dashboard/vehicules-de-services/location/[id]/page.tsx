"use client";

import { DetailRow, DetailRowSkeleton } from "@/components/shared/details-row";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ServiceCarBookingForm } from "@/features/service-car-booking/ui/service-car-booking-form";
import { useGetServiceCarById } from "@/features/service-car/hooks";
import {
  Car,
  getCategoryLabel,
  getMotorisationColor,
  getMotorisationLabel,
  getStatusColor,
  getStatusLabel,
} from "@/types/car";
import { AlertCircle, Leaf, Palette, Users } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { BsFuelPump } from "react-icons/bs";
import { MdGarage } from "react-icons/md";
import { TbLicense } from "react-icons/tb";

export default function LocationDetailPage() {
  const { id } = useParams();
  const { data: serviceCar, isPending } = useGetServiceCarById(id as string);

  if (isPending) {
    return <LocationDetailSkeleton />;
  }

  return (
    <div className="bg-background">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="col-span-1">
          <div className="relative h-96 w-full overflow-hidden rounded-lg mb-6 bg-muted">
            <Image
              src={serviceCar?.imageUrl || "/misc/placeholder.svg"}
              alt={`${serviceCar?.brand} ${serviceCar?.model}`}
              fill
              className="object-contain"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/40 via-black/0 to-transparent" />

            {/* Badges en bas à gauche */}
            <div className="absolute bottom-4 left-4 flex gap-2 flex-wrap">
              <Badge
                className={`${getMotorisationColor(
                  serviceCar?.motorisation
                )} text-white text-md font-semibold`}
              >
                {getMotorisationLabel(serviceCar?.motorisation)}
              </Badge>
              {serviceCar?.category && (
                <Badge className="bg-background text-foreground text-md font-semibold">
                  {getCategoryLabel(serviceCar?.category)}
                </Badge>
              )}
              {serviceCar?.status && (
                <Badge
                  className={`${getStatusColor(
                    serviceCar?.status
                  )} text-white text-md font-semibold`}
                >
                  {getStatusLabel(serviceCar?.status)}
                </Badge>
              )}
            </div>
          </div>

          <div className="mb-4">
            <h1 className="text-3xl sm:text-4xl font-bold text-card-foreground mb-2">
              {serviceCar?.brand} {serviceCar?.model}
            </h1>
          </div>

          <Card className="border-border flex-1">
            <CardHeader>
              <CardTitle className="text-lg">Détails du véhicule</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <DetailRow
                    icon={<Palette className="h-5 w-5" />}
                    label="Couleur"
                    value={serviceCar?.color || ""}
                  />
                  <DetailRow
                    icon={<Users className="h-5 w-5" />}
                    label="Places assises"
                    value={`${serviceCar?.seats} places`}
                  />
                  <DetailRow
                    icon={<BsFuelPump className="h-5 w-5" />}
                    label="Motorisation"
                    value={getMotorisationLabel(serviceCar?.motorisation)}
                  />
                  <DetailRow
                    icon={<Leaf className="h-5 w-5" />}
                    label="Émission CO₂"
                    value={`${serviceCar?.co2Emission} g/km`}
                  />
                </div>

                <div className="space-y-4">
                  <DetailRow
                    icon={<TbLicense className="h-5 w-5" />}
                    label="Plaque d'immatriculation"
                    value={serviceCar?.registrationPlate || ""}
                  />
                  <DetailRow
                    icon={<MdGarage className="h-5 w-5" />}
                    label="Catégorie"
                    value={getCategoryLabel(serviceCar?.category)}
                  />
                  <DetailRow
                    icon={<AlertCircle className="h-5 w-5" />}
                    label="Statut"
                    value={getStatusLabel(serviceCar?.status)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="col-span-1">
          <Card className="border-border h-full">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                Louer le véhicule
              </CardTitle>
            </CardHeader>
            <CardContent className="my-auto">
              <ServiceCarBookingForm serviceCar={serviceCar as Car} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function LocationDetailSkeleton() {
  return (
    <div className="bg-background">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="col-span-1">
          <div className="relative h-96 w-full overflow-hidden rounded-lg mb-6 bg-muted">
            <Skeleton className="h-full w-full" />
            <div className="absolute inset-0 bg-linear-to-t from-black/40 via-black/0 to-transparent" />

            <div className="absolute bottom-4 left-4 flex gap-2 flex-wrap">
              <Skeleton className="h-7 w-24 rounded-full" />
              <Skeleton className="h-7 w-20 rounded-full" />
              <Skeleton className="h-7 w-28 rounded-full" />
            </div>
          </div>

          <div className="mb-4">
            <Skeleton className="h-10 w-64 mb-2" />
          </div>

          <Card className="border-border flex-1">
            <CardHeader>
              <Skeleton className="h-6 w-48" />
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <DetailRowSkeleton />
                  <DetailRowSkeleton />
                  <DetailRowSkeleton />
                  <DetailRowSkeleton />
                </div>

                <div className="space-y-4">
                  <DetailRowSkeleton />
                  <DetailRowSkeleton />
                  <DetailRowSkeleton />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="col-span-1">
          <Card className="border-border h-full">
            <CardHeader>
              <Skeleton className="h-6 w-40" />
            </CardHeader>
            <CardContent className="my-auto space-y-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-32" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

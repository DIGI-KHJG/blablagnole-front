"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetServiceCarById } from "@/features/service-car/hooks";
import {
  getCategoryLabel,
  getMotorisationColor,
  getMotorisationLabel,
} from "@/types/car";
import {
  AlertCircle,
  Gauge,
  Leaf,
  Palette,
  Pencil,
  Sparkles,
  Trash2,
  Users,
} from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function ServiceCarDetailsPage() {
  const { id } = useParams();
  // const router = useRouter();
  const { data: serviceCar } = useGetServiceCarById(id as string);
  // const { mutate: deleteServiceCar } = useDeleteServiceCar();

  // const handleDeleteServiceCar = async (id: number) => {
  //   deleteServiceCar(id, {
  //     onSuccess: () => {
  //       toast.success("Véhicule de service supprimé avec succès");
  //       router.push("/dashboard/parc-de-vehicules");
  //     },
  //     onError: (error) => {
  //       toast.error(error.message);
  //     },
  //   });
  // };
  // console.log(serviceCar);
  return (
    <div className="bg-background">
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
            )} text-white text-sm font-semibold`}
          >
            {getMotorisationLabel(serviceCar?.motorisation)}
          </Badge>
          {serviceCar?.category && (
            <Badge variant="secondary" className="text-sm font-semibold">
              {getCategoryLabel(serviceCar?.category)}
            </Badge>
          )}
          {serviceCar?.status && (
            <Badge
              variant={
                serviceCar?.status === "IN_SERVICE" ? "default" : "destructive"
              }
              className="text-sm font-semibold"
            >
              {serviceCar?.status === "IN_SERVICE"
                ? "En service"
                : serviceCar?.status === "UNDER_REPAIR"
                ? "En réparation"
                : "Hors service"}
            </Badge>
          )}
        </div>

        <div
          className="flex justify-end gap-2 absolute top-4 right-4"
          onClick={() => handleDeleteServiceCar(serviceCar?.id as number)}
        >
          <Button variant="outline" size="icon">
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="text-destructive hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="mb-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-card-foreground mb-2">
          {serviceCar?.brand} {serviceCar?.model}
        </h1>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-muted-foreground">
            Plaque d&apos;immatriculation:
          </span>
          <p className="text-lg text-card-foreground font-semibold">
            {serviceCar?.registrationPlate}
          </p>
        </div>
      </div>

      <Card className="border-border mb-6">
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
                icon={<Gauge className="h-5 w-5" />}
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
                icon={<Sparkles className="h-5 w-5" />}
                label="Catégorie"
                value={getCategoryLabel(serviceCar?.category)}
              />
              <DetailRow
                icon={<AlertCircle className="h-5 w-5" />}
                label="Statut"
                value={
                  serviceCar?.status === "IN_SERVICE"
                    ? "En service"
                    : serviceCar?.status === "UNDER_REPAIR"
                    ? "En réparation"
                    : "Hors service"
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function DetailRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="text-primary mt-0.5 shrink-0">{icon}</div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-muted-foreground font-medium">{label}</p>
        <p className="text-base font-semibold text-card-foreground truncate">
          {value}
        </p>
      </div>
    </div>
  );
}

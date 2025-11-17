"use client";

import { DeleteConfirmationDialog } from "@/components/shared/delete-confirmation-dialog";
import { DetailRow, DetailRowSkeleton } from "@/components/shared/details-row";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useDeleteServiceCar,
  useGetServiceCarById,
} from "@/features/service-car/hooks";
import ServiceCarFormDialog from "@/features/service-car/ui/service-car-form-dialog";
import {
  getCategoryLabel,
  getMotorisationColor,
  getMotorisationLabel,
  getStatusColor,
  getStatusLabel,
} from "@/types/car";
import {
  AlertCircle,
  Leaf,
  Palette,
  Pencil,
  Trash2,
  Users,
} from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { BsFuelPump } from "react-icons/bs";
import { MdGarage } from "react-icons/md";
import { TbLicense } from "react-icons/tb";
import { toast } from "sonner";

export default function ServiceCarDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showFormDialog, setShowFormDialog] = useState(false);
  const { data: serviceCar, isPending } = useGetServiceCarById(id as string);
  const { mutate: deleteServiceCar } = useDeleteServiceCar();

  const handleDeleteServiceCar = async (id: number) => {
    deleteServiceCar(id, {
      onSuccess: () => {
        toast.success("Véhicule de service supprimé avec succès");
        router.push("/dashboard/parc-de-vehicules");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  if (isPending) {
    return <ServiceCarDetailsSkeleton />;
  }

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

        <div className="flex justify-end gap-2 absolute top-4 right-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowFormDialog(true)}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="text-destructive hover:text-destructive"
            onClick={() => setShowDeleteDialog(true)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="mb-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-card-foreground mb-2">
          {serviceCar?.brand} {serviceCar?.model}
        </h1>
      </div>

      <Card className="border-border">
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

      <ServiceCarFormDialog
        isOpen={showFormDialog}
        onClose={() => setShowFormDialog(false)}
        initialData={serviceCar}
      />

      <DeleteConfirmationDialog
        showDeleteDialog={showDeleteDialog}
        setShowDeleteDialog={setShowDeleteDialog}
        handleDelete={() => handleDeleteServiceCar(serviceCar?.id as number)}
        title="Supprimer le véhicule de service"
        description={`${serviceCar?.brand} ${serviceCar?.model} (${serviceCar?.registrationPlate})`}
      />
    </div>
  );
}

function ServiceCarDetailsSkeleton() {
  return (
    <div className="bg-background">
      <div className="relative h-96 w-full overflow-hidden rounded-lg mb-6 bg-muted">
        <Skeleton className="h-full w-full" />
        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-black/0 to-transparent" />

        <div className="absolute bottom-4 left-4 flex gap-2 flex-wrap">
          <Skeleton className="h-7 w-24 rounded-full" />
          <Skeleton className="h-7 w-20 rounded-full" />
          <Skeleton className="h-7 w-28 rounded-full" />
        </div>

        <div className="flex justify-end gap-2 absolute top-4 right-4">
          <Skeleton className="h-10 w-10 rounded-md" />
          <Skeleton className="h-10 w-10 rounded-md" />
        </div>
      </div>

      <div className="mb-4">
        <Skeleton className="h-10 w-64 mb-2" />
      </div>

      <Card className="border-border">
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
  );
}

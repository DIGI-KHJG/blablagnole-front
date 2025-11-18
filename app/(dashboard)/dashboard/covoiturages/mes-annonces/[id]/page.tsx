"use client";

import { DeleteConfirmationDialog } from "@/components/shared/delete-confirmation-dialog";
import { DetailRow, DetailRowSkeleton } from "@/components/shared/details-row";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useDeleteCarpool, useGetCarpoolById } from "@/features/carpool/hooks";
import CarpoolFormDialog from "@/features/carpool/ui/carpool-form-dialog";
import { formatDateTime, formatDuration } from "@/lib/utils";
import {
  getCategoryLabel,
  getMotorisationColor,
  getMotorisationLabel,
} from "@/types/car";
import { getStatusColor, getStatusLabel } from "@/types/carpool";
import {
  Car,
  Clock,
  Leaf,
  Palette,
  Pencil,
  Route,
  Trash2,
  User,
  Users,
} from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { BsFuelPump } from "react-icons/bs";
import { TbLicense } from "react-icons/tb";
import { toast } from "sonner";

export default function CarpoolDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showFormDialog, setShowFormDialog] = useState(false);
  const { data: carpool, isPending } = useGetCarpoolById(id as string);
  const { mutate: deleteCarpool } = useDeleteCarpool();

  const handleDeleteCarpool = async (id: number) => {
    deleteCarpool(id, {
      onSuccess: () => {
        toast.success("Covoiturage supprimé avec succès");
        router.push("/dashboard/covoiturages/mes-annonces");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  if (isPending) {
    return <CarpoolDetailsSkeleton />;
  }

  return (
    <div className="bg-background">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <Badge
              className={`${getStatusColor(
                carpool?.status
              )} text-white text-md font-semibold`}
            >
              {getStatusLabel(carpool?.status)}
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-card-foreground mb-2">
            Trajet {carpool?.fromAddress?.city || "N/A"} →{" "}
            {carpool?.toAddress?.city || "N/A"}
          </h1>
          {carpool?.departureAt && (
            <p className="text-lg text-muted-foreground">
              {formatDateTime(carpool.departureAt)}
            </p>
          )}
        </div>
        <div className="flex gap-2">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 items-stretch">
        <div className="col-span-1 flex">
          {/* Détails du trajet */}
          <Card className="border-border flex-1 h-full">
            <CardHeader>
              <CardTitle className="text-lg">Détails du trajet</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex flex-col items-center pt-1">
                    <div className="w-3 h-3 rounded-full bg-primary border-2 border-background shadow-sm" />
                    <div className="w-0.5 h-8 bg-linear-to-b from-primary to-destructive my-1" />
                    <div className="w-3 h-3 rounded-full bg-destructive border-2 border-background shadow-sm" />
                  </div>
                  <div className="flex-1 min-w-0 space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground font-medium mb-1">
                        Départ
                      </p>
                      <p className="text-base font-semibold text-card-foreground">
                        {carpool?.fromAddress?.city || "N/A"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {carpool?.fromAddress?.street}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {carpool?.fromAddress?.postalCode}{" "}
                        {carpool?.fromAddress?.country}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground font-medium mb-1">
                        Arrivée
                      </p>
                      <p className="text-base font-semibold text-card-foreground">
                        {carpool?.toAddress?.city || "N/A"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {carpool?.toAddress?.street}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {carpool?.toAddress?.postalCode}{" "}
                        {carpool?.toAddress?.country}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <DetailRow
                      icon={<Clock className="h-5 w-5" />}
                      label="Durée"
                      value={
                        carpool?.durationMin
                          ? formatDuration(carpool.durationMin)
                          : "N/A"
                      }
                    />
                    <DetailRow
                      icon={<Route className="h-5 w-5" />}
                      label="Distance"
                      value={
                        carpool?.distanceKm
                          ? `${carpool.distanceKm.toFixed(1)} km`
                          : "N/A"
                      }
                    />
                    <DetailRow
                      icon={<Users className="h-5 w-5" />}
                      label="Places disponibles"
                      value={
                        carpool?.seatsRemaining !== undefined &&
                        carpool?.seatsTotal !== undefined
                          ? `${carpool.seatsRemaining}/${carpool.seatsTotal}`
                          : "N/A"
                      }
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="col-span-1">
          {/* Conducteur et Véhicule */}
          {(carpool?.driver || carpool?.car) && (
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-lg">
                  Conducteur et Véhicule
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Informations du conducteur */}
                {carpool?.driver && (
                  <div className="mb-6 pb-6 border-b border-border">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage
                          src={carpool.driver.profilePicture}
                          alt={carpool.driver.fullName}
                        />
                        <AvatarFallback>
                          {carpool.driver.firstName[0]}
                          {carpool.driver.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-lg font-semibold text-card-foreground">
                          {carpool.driver.fullName}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {carpool.driver.email}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Détails du véhicule */}
                {carpool?.car && (
                  <>
                    {/* Image du véhicule */}
                    {carpool.car.imageUrl && (
                      <div className="relative h-64 w-full overflow-hidden rounded-lg mb-6 bg-muted">
                        <Image
                          src={carpool.car.imageUrl}
                          alt={`${carpool.car.brand} ${carpool.car.model}`}
                          fill
                          className="object-contain"
                          priority
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-black/0 to-transparent" />

                        {/* Badges en bas à gauche */}
                        <div className="absolute bottom-4 left-4 flex gap-2 flex-wrap">
                          <Badge
                            className={`${getMotorisationColor(
                              carpool.car.motorisation
                            )} text-white text-md font-semibold`}
                          >
                            {getMotorisationLabel(carpool.car.motorisation)}
                          </Badge>
                          {carpool.car.category && (
                            <Badge className="bg-background text-foreground text-md font-semibold">
                              {getCategoryLabel(carpool.car.category)}
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="mb-4">
                      <h3 className="text-xl font-semibold text-card-foreground">
                        {carpool.car.brand} {carpool.car.model}
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <DetailRow
                          icon={<Palette className="h-5 w-5" />}
                          label="Couleur"
                          value={carpool.car.color || ""}
                        />
                        <DetailRow
                          icon={<Users className="h-5 w-5" />}
                          label="Places assises"
                          value={`${carpool.car.seats} places`}
                        />
                        <DetailRow
                          icon={<BsFuelPump className="h-5 w-5" />}
                          label="Motorisation"
                          value={getMotorisationLabel(carpool.car.motorisation)}
                        />
                      </div>

                      <div className="space-y-4">
                        <DetailRow
                          icon={<Leaf className="h-5 w-5" />}
                          label="Émission CO₂"
                          value={`${carpool.car.co2Emission} g/km`}
                        />
                        <DetailRow
                          icon={<TbLicense className="h-5 w-5" />}
                          label="Plaque d'immatriculation"
                          value={carpool.car.registrationPlate || ""}
                        />
                        <DetailRow
                          icon={<Car className="h-5 w-5" />}
                          label="Catégorie"
                          value={getCategoryLabel(carpool.car.category)}
                        />
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-lg">
            Passagers ({carpool?.passengers?.length || 0}/
            {carpool?.seatsTotal || 0})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {carpool?.passengers && carpool.passengers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {carpool.passengers.map((passenger) => (
                <div
                  key={passenger.id}
                  className="flex items-center gap-3 p-3 rounded-lg border border-border bg-muted/50"
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={passenger.profilePicture}
                      alt={passenger.fullName}
                    />
                    <AvatarFallback>
                      {passenger.firstName[0]}
                      {passenger.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-card-foreground">
                      {passenger.fullName}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {passenger.email}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <User className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>Aucun passager pour le moment</p>
            </div>
          )}
        </CardContent>
      </Card>

      <CarpoolFormDialog
        isOpen={showFormDialog}
        onClose={() => setShowFormDialog(false)}
        initialData={carpool}
      />

      <DeleteConfirmationDialog
        showDeleteDialog={showDeleteDialog}
        setShowDeleteDialog={setShowDeleteDialog}
        handleDelete={() => handleDeleteCarpool(carpool?.id as number)}
        title="Supprimer le covoiturage"
        description={`Supprimer le covoiturage de ${carpool?.fromAddress?.city} vers ${carpool?.toAddress?.city}`}
      />
    </div>
  );
}

function CarpoolDetailsSkeleton() {
  return (
    <div className="bg-background">
      {/* Header avec titre et boutons */}
      <div className="mb-6 flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <Skeleton className="h-7 w-24 rounded-full" />
          </div>
          <Skeleton className="h-10 w-full mb-2" />
          <Skeleton className="h-6 w-64" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-10 w-10 rounded-md" />
          <Skeleton className="h-10 w-10 rounded-md" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 items-stretch">
        <div className="col-span-1 flex">
          <Card className="border-border flex-1 h-full">
            <CardHeader>
              <Skeleton className="h-6 w-48" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Skeleton className="h-32 w-full" />
                <div className="pt-4 border-t border-border">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <DetailRowSkeleton />
                    <DetailRowSkeleton />
                    <DetailRowSkeleton />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="col-span-1">
          <Card className="border-border">
            <CardHeader>
              <Skeleton className="h-6 w-48" />
            </CardHeader>
            <CardContent>
              <div className="mb-6 pb-6 border-b border-border">
                <div className="flex items-center gap-4">
                  <Skeleton className="h-16 w-16 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-5 w-48" />
                    <Skeleton className="h-4 w-64" />
                  </div>
                </div>
              </div>
              <div className="relative h-64 w-full overflow-hidden rounded-lg mb-6 bg-muted">
                <Skeleton className="h-full w-full" />
                <div className="absolute inset-0 bg-linear-to-t from-black/40 via-black/0 to-transparent" />
                <div className="absolute bottom-4 left-4 flex gap-2 flex-wrap">
                  <Skeleton className="h-7 w-24 rounded-full" />
                  <Skeleton className="h-7 w-20 rounded-full" />
                </div>
              </div>
              <Skeleton className="h-6 w-48 mb-4" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
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
      </div>

      {/* Passagers sur sa propre ligne */}
      <Card className="border-border">
        <CardHeader>
          <Skeleton className="h-6 w-40" />
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Skeleton className="h-12 w-12 mx-auto mb-2 rounded-full" />
            <Skeleton className="h-4 w-48 mx-auto" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

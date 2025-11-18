"use client";

import { ConfirmationDialog } from "@/components/shared/confirmation-dialog";
import { DetailRow } from "@/components/shared/details-row";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CarpoolDetailsSkeleton } from "@/components/ui/carpool-details-skeleton";
import { useGetCurrentUser } from "@/features/auth/hooks";
import { useBookCarpool } from "@/features/carpool-booking/hooks";
import { useGetCarpoolById } from "@/features/carpool/hooks";
import { formatDateTime, formatDuration } from "@/lib/utils";
import {
  getCategoryLabel,
  getMotorisationColor,
  getMotorisationLabel,
} from "@/types/car";
import { getStatusColor, getStatusLabel } from "@/types/carpool";
import { Car, Clock, Leaf, Palette, Route, Users } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { BsFuelPump } from "react-icons/bs";
import { TbLicense } from "react-icons/tb";
import { toast } from "sonner";

export default function CarpoolDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const { data: currentUser } = useGetCurrentUser();
  const { data: carpool, isPending } = useGetCarpoolById(id as string);
  const { mutate: bookCarpool } = useBookCarpool();

  const handleConfirmReservation = () => {
    if (carpool?.id && currentUser?.id) {
      bookCarpool(
        {
          carpoolId: carpool.id,
          passengerId: currentUser.id,
          status: "CONFIRMED",
        },
        {
          onSuccess: () => {
            setShowConfirmationDialog(false);
            toast.success("Covoiturage réservé avec succès");
            router.push("/dashboard/covoiturages/mes-reservations");
          },
          onError: (error) => {
            setShowConfirmationDialog(false);
            toast.error(error.message);
          },
        }
      );
    }
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
              <div className="mt-6 pt-4 border-t border-border">
                <Button
                  className="w-full"
                  onClick={() => setShowConfirmationDialog(true)}
                  disabled={
                    carpool?.status === "FULL" ||
                    carpool?.status === "CANCELLED" ||
                    carpool?.status === "COMPLETED" ||
                    carpool?.seatsRemaining === 0 ||
                    !currentUser?.id
                  }
                >
                  {carpool?.status === "FULL" || carpool?.seatsRemaining === 0
                    ? "Complet"
                    : "Réserver"}
                </Button>
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

      <ConfirmationDialog
        showConfirmationDialog={showConfirmationDialog}
        setShowConfirmationDialog={setShowConfirmationDialog}
        handleConfirm={handleConfirmReservation}
        title="Confirmer la réservation"
        description={
          <>
            Êtes-vous sûr de vouloir réserver ce trajet ?{" "}
            <strong>
              {carpool?.fromAddress?.city} vers {carpool?.toAddress?.city}
              {carpool?.departureAt &&
                ` pour le ${formatDateTime(carpool.departureAt)}`}
            </strong>
          </>
        }
      />
    </div>
  );
}

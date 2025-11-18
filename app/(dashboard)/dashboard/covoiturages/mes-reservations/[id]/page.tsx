"use client";

import { DeleteConfirmationDialog } from "@/components/shared/delete-confirmation-dialog";
import { DetailRow } from "@/components/shared/details-row";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  useCancelCarpoolBooking,
  useGetCarpoolBookingById,
} from "@/features/carpool-booking/hooks";
import { formatDateTime, formatDuration } from "@/lib/utils";
import {
  getCategoryLabel,
  getMotorisationColor,
  getMotorisationLabel,
} from "@/types/car";
import { getStatusColor, getStatusLabel } from "@/types/carpool-booking";
import { Car, Clock, Leaf, Palette, Route, Users } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";
import { BsFuelPump } from "react-icons/bs";
import { LuX } from "react-icons/lu";
import { TbLicense } from "react-icons/tb";
import { toast } from "sonner";

export default function CarpoolBookingDetailsPage() {
  const { id } = useParams();
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const { data: carpoolBooking } = useGetCarpoolBookingById(id as string);
  const { mutate: cancelBooking } = useCancelCarpoolBooking();
  console.log(carpoolBooking);

  const handleCancelBooking = (id: number) => {
    cancelBooking(id, {
      onSuccess: () => {
        toast.success("Réservation annulée avec succès");
        setShowConfirmationDialog(false);
      },
      onError: (error) => {
        toast.error(error.message);
        setShowConfirmationDialog(false);
      },
    });
  };

  return (
    <div className="bg-background">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <Badge
              className={`${getStatusColor(
                carpoolBooking?.status
              )} text-white text-md font-semibold`}
            >
              {getStatusLabel(carpoolBooking?.status)}
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-card-foreground mb-2">
            Trajet {carpoolBooking?.carpool?.fromAddress?.city || "N/A"} →{" "}
            {carpoolBooking?.carpool?.toAddress?.city || "N/A"}
          </h1>
          {carpoolBooking?.carpool?.departureAt && (
            <p className="text-lg text-muted-foreground">
              {formatDateTime(carpoolBooking?.carpool?.departureAt)}
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
                        {carpoolBooking?.carpool?.fromAddress?.city || "N/A"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {carpoolBooking?.carpool?.fromAddress?.street}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {carpoolBooking?.carpool?.fromAddress?.postalCode}{" "}
                        {carpoolBooking?.carpool?.fromAddress?.country}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground font-medium mb-1">
                        Arrivée
                      </p>
                      <p className="text-base font-semibold text-card-foreground">
                        {carpoolBooking?.carpool?.toAddress?.city || "N/A"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {carpoolBooking?.carpool?.toAddress?.street}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {carpoolBooking?.carpool?.toAddress?.postalCode}{" "}
                        {carpoolBooking?.carpool?.toAddress?.country}
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
                        carpoolBooking?.carpool?.durationMin
                          ? formatDuration(carpoolBooking?.carpool?.durationMin)
                          : "N/A"
                      }
                    />
                    <DetailRow
                      icon={<Route className="h-5 w-5" />}
                      label="Distance"
                      value={
                        carpoolBooking?.carpool?.distanceKm
                          ? `${carpoolBooking?.carpool?.distanceKm.toFixed(
                              1
                            )} km`
                          : "N/A"
                      }
                    />
                    <DetailRow
                      icon={<Users className="h-5 w-5" />}
                      label="Places disponibles"
                      value={
                        carpoolBooking?.carpool?.seatsRemaining !== undefined &&
                        carpoolBooking?.carpool?.seatsTotal !== undefined
                          ? carpoolBooking.carpool.seatsRemaining === 0
                            ? "Aucune"
                            : `${carpoolBooking?.carpool?.seatsRemaining}/${carpoolBooking?.carpool?.seatsTotal}`
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
                  variant="destructive"
                  disabled={carpoolBooking?.status === "CANCELLED"}
                >
                  <LuX className="h-4 w-4" />
                  {carpoolBooking?.status === "CANCELLED"
                    ? "Réservation annulée"
                    : "Annuler ma réservation"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="col-span-1">
          {/* Conducteur et Véhicule */}
          {(carpoolBooking?.carpool?.driver ||
            carpoolBooking?.carpool?.car) && (
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-lg">
                  Conducteur et Véhicule
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Informations du conducteur */}
                {carpoolBooking?.carpool?.driver && (
                  <div className="mb-6 pb-6 border-b border-border">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage
                          src={carpoolBooking?.carpool?.driver?.profilePicture}
                          alt={carpoolBooking?.carpool?.driver?.fullName}
                        />
                        <AvatarFallback>
                          {carpoolBooking?.carpool?.driver?.firstName[0]}
                          {carpoolBooking?.carpool?.driver?.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-lg font-semibold text-card-foreground">
                          {carpoolBooking?.carpool?.driver?.fullName}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {carpoolBooking?.carpool?.driver?.email}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Détails du véhicule */}
                {carpoolBooking?.carpool?.car && (
                  <>
                    {/* Image du véhicule */}
                    {carpoolBooking?.carpool?.car?.imageUrl && (
                      <div className="relative h-64 w-full overflow-hidden rounded-lg mb-6 bg-muted">
                        <Image
                          src={carpoolBooking?.carpool?.car?.imageUrl}
                          alt={`${carpoolBooking?.carpool?.car?.brand} ${carpoolBooking?.carpool?.car?.model}`}
                          fill
                          className="object-contain"
                          priority
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-black/0 to-transparent" />

                        {/* Badges en bas à gauche */}
                        <div className="absolute bottom-4 left-4 flex gap-2 flex-wrap">
                          <Badge
                            className={`${getMotorisationColor(
                              carpoolBooking?.carpool?.car?.motorisation
                            )} text-white text-md font-semibold`}
                          >
                            {getMotorisationLabel(
                              carpoolBooking?.carpool?.car?.motorisation
                            )}
                          </Badge>
                          {carpoolBooking?.carpool?.car?.category && (
                            <Badge className="bg-background text-foreground text-md font-semibold">
                              {getCategoryLabel(
                                carpoolBooking?.carpool?.car?.category
                              )}
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="mb-4">
                      <h3 className="text-xl font-semibold text-card-foreground">
                        {carpoolBooking?.carpool?.car?.brand}{" "}
                        {carpoolBooking?.carpool?.car?.model}
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <DetailRow
                          icon={<Palette className="h-5 w-5" />}
                          label="Couleur"
                          value={carpoolBooking?.carpool?.car?.color || ""}
                        />
                        <DetailRow
                          icon={<Users className="h-5 w-5" />}
                          label="Places assises"
                          value={`${carpoolBooking?.carpool?.car?.seats} places`}
                        />
                        <DetailRow
                          icon={<BsFuelPump className="h-5 w-5" />}
                          label="Motorisation"
                          value={getMotorisationLabel(
                            carpoolBooking?.carpool?.car?.motorisation
                          )}
                        />
                      </div>

                      <div className="space-y-4">
                        <DetailRow
                          icon={<Leaf className="h-5 w-5" />}
                          label="Émission CO₂"
                          value={`${carpoolBooking?.carpool?.car?.co2Emission} g/km`}
                        />
                        <DetailRow
                          icon={<TbLicense className="h-5 w-5" />}
                          label="Plaque d'immatriculation"
                          value={
                            carpoolBooking?.carpool?.car?.registrationPlate ||
                            ""
                          }
                        />
                        <DetailRow
                          icon={<Car className="h-5 w-5" />}
                          label="Catégorie"
                          value={getCategoryLabel(
                            carpoolBooking?.carpool?.car?.category
                          )}
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

      <DeleteConfirmationDialog
        showDeleteDialog={showConfirmationDialog}
        setShowDeleteDialog={setShowConfirmationDialog}
        handleDelete={() =>
          carpoolBooking?.id && handleCancelBooking(carpoolBooking?.id)
        }
        title="Annuler la réservation"
        description={`annuler la réservation de ${
          carpoolBooking?.carpool?.fromAddress?.city
        } vers ${
          carpoolBooking?.carpool?.toAddress?.city
        } pour le ${formatDateTime(carpoolBooking?.carpool?.departureAt)}`}
      />
    </div>
  );
}

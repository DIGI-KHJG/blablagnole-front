"use client";

import { DeleteConfirmationDialog } from "@/components/shared/delete-confirmation-dialog";
import { DetailRow } from "@/components/shared/details-row";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ServiceCarBookingDetailsSkeleton } from "@/components/ui/service-car-booking-details-skeleton";
import {
  useCancelServiceCarBooking,
  useCompleteServiceCarBooking,
  useDeleteServiceCarBooking,
  useGetServiceCarBookingById,
} from "@/features/service-car-booking/hooks";
import ServiceCarBookingFormDialog from "@/features/service-car-booking/ui/service-car-booking-form-dialog";
import { formatDateTime } from "@/lib/utils";
import {
  getCategoryLabel,
  getMotorisationColor,
  getMotorisationLabel,
  getStatusLabel,
} from "@/types/car";
import {
  getBookingStatusColor,
  getBookingStatusLabel,
} from "@/types/service-car-booking";
import { getRoleColor, getRoleLabel } from "@/types/user";
import {
  AlertCircle,
  Calendar,
  Edit,
  Leaf,
  LucideCheckCircle2,
  Palette,
  Users,
} from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { BsFuelPump } from "react-icons/bs";
import { LuTrash2 } from "react-icons/lu";
import { MdGarage } from "react-icons/md";
import { TbCalendarCancel, TbLicense } from "react-icons/tb";
import { toast } from "sonner";

export default function ParcVehiculesLocationDetails() {
  const { id } = useParams();
  const router = useRouter();
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const { data: serviceCarBooking, isPending } = useGetServiceCarBookingById(
    id as string
  );

  const {
    mutate: deleteServiceCarBooking,
    isPending: isDeletingServiceCarBooking,
  } = useDeleteServiceCarBooking();
  const {
    mutate: completeServiceCarBooking,
    isPending: isCompletingServiceCarBooking,
  } = useCompleteServiceCarBooking();
  const {
    mutate: cancelServiceCarBooking,
    isPending: isCancellingServiceCarBooking,
  } = useCancelServiceCarBooking();

  const handleDeleteServiceCarBooking = async (id: number) => {
    deleteServiceCarBooking(id, {
      onSuccess: () => {
        toast.success("Location annulée avec succès");
        router.push("/dashboard/vehicules-de-services/mes-locations");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  const handleCompleteServiceCarBooking = async (id: number) => {
    completeServiceCarBooking(id, {
      onSuccess: () => {
        toast.success("Location marquée comme terminée avec succès");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  const handleCancelServiceCarBooking = async (id: number) => {
    cancelServiceCarBooking(id, {
      onSuccess: () => {
        toast.success("Location annulée avec succès");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  if (isPending) {
    return <ServiceCarBookingDetailsSkeleton />;
  }

  return (
    <div className="bg-background">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="col-span-1">
          <div className="relative h-96 w-full overflow-hidden rounded-lg mb-6 bg-muted">
            <Image
              src={
                serviceCarBooking?.serviceCar?.imageUrl ||
                "/misc/placeholder.svg"
              }
              alt={`${serviceCarBooking?.serviceCar?.brand} ${serviceCarBooking?.serviceCar?.model}`}
              fill
              className="object-contain"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/40 via-black/0 to-transparent" />

            {/* Badges en bas à gauche */}
            <div className="absolute bottom-4 left-4 flex gap-2 flex-wrap">
              <Badge
                className={`${getMotorisationColor(
                  serviceCarBooking?.serviceCar?.motorisation
                )} text-white text-md font-semibold`}
              >
                {getMotorisationLabel(
                  serviceCarBooking?.serviceCar?.motorisation
                )}
              </Badge>
              {serviceCarBooking?.serviceCar?.category && (
                <Badge className="bg-background text-foreground text-md font-semibold">
                  {getCategoryLabel(serviceCarBooking?.serviceCar?.category)}
                </Badge>
              )}
            </div>
          </div>

          <div className="mb-4">
            <h1 className="text-3xl sm:text-4xl font-bold text-card-foreground mb-2">
              {serviceCarBooking?.serviceCar?.brand}{" "}
              {serviceCarBooking?.serviceCar?.model}
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
                    value={serviceCarBooking?.serviceCar?.color || ""}
                  />
                  <DetailRow
                    icon={<Users className="h-5 w-5" />}
                    label="Places assises"
                    value={`${serviceCarBooking?.serviceCar?.seats} places`}
                  />
                  <DetailRow
                    icon={<BsFuelPump className="h-5 w-5" />}
                    label="Motorisation"
                    value={getMotorisationLabel(
                      serviceCarBooking?.serviceCar?.motorisation
                    )}
                  />
                  <DetailRow
                    icon={<Leaf className="h-5 w-5" />}
                    label="Émission CO₂"
                    value={`${serviceCarBooking?.serviceCar?.co2Emission} g/km`}
                  />
                </div>

                <div className="space-y-4">
                  <DetailRow
                    icon={<TbLicense className="h-5 w-5" />}
                    label="Plaque d'immatriculation"
                    value={
                      serviceCarBooking?.serviceCar?.registrationPlate || ""
                    }
                  />
                  <DetailRow
                    icon={<MdGarage className="h-5 w-5" />}
                    label="Catégorie"
                    value={getCategoryLabel(
                      serviceCarBooking?.serviceCar?.category
                    )}
                  />
                  <DetailRow
                    icon={<AlertCircle className="h-5 w-5" />}
                    label="Statut"
                    value={getStatusLabel(
                      serviceCarBooking?.serviceCar?.status
                    )}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="col-span-1">
          <Card className="border-border h-full">
            <CardHeader>
              <CardTitle className="text-2xl font-bold flex items-center justify-between gap-2">
                Détails de la location
                <Badge
                  variant="outline"
                  className={`${getBookingStatusColor(
                    serviceCarBooking?.status
                  )} text-base text-white border-none`}
                >
                  {" "}
                  {getBookingStatusLabel(serviceCarBooking?.status)}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <Card className="border-border bg-white">
                <CardHeader>
                  <CardTitle className="text-lg">
                    Dates de réservation :
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Card className="flex-1 bg-primary/5">
                      <CardContent>
                        <DetailRow
                          icon={<Calendar className="h-4 w-4" />}
                          label="Du"
                          value={
                            serviceCarBooking?.startAt
                              ? formatDateTime(serviceCarBooking.startAt)
                              : "-"
                          }
                        />
                      </CardContent>
                    </Card>
                    <Card className="flex-1 bg-primary/5">
                      <CardContent>
                        <DetailRow
                          icon={<Calendar className="h-4 w-4" />}
                          label="Au"
                          value={
                            serviceCarBooking?.endAt
                              ? formatDateTime(serviceCarBooking.endAt)
                              : "-"
                          }
                        />
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>

              {serviceCarBooking?.driver && (
                <Card className="border-border bg-white">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      Conducteur :
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Avatar className="w-10 h-10">
                        <AvatarImage
                          src={
                            serviceCarBooking?.driver?.profilePicture ||
                            "/misc/placeholder.svg"
                          }
                        />
                        <AvatarFallback>
                          {serviceCarBooking?.driver?.firstName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <p className="text-md text-muted-foreground font-bold">
                        {serviceCarBooking?.driver?.firstName}{" "}
                        {serviceCarBooking?.driver?.lastName}
                      </p>
                    </div>
                    <Badge
                      variant="outline"
                      className={`${getRoleColor(
                        serviceCarBooking?.driver?.role
                      )} text-sm text-white border-none`}
                    >
                      {getRoleLabel(serviceCarBooking?.driver?.role)}
                    </Badge>
                  </CardContent>
                </Card>
              )}

              <Card className="border-border bg-white">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    Actions :
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-between gap-2">
                  {/* Boutons d'action */}
                  <div className="flex  gap-3 pt-4 w-full">
                    <Button
                      onClick={() =>
                        serviceCarBooking?.id &&
                        handleCompleteServiceCarBooking(serviceCarBooking?.id)
                      }
                      className="flex-1"
                      disabled={
                        isPending ||
                        isCompletingServiceCarBooking ||
                        !serviceCarBooking?.id
                      }
                    >
                      <LucideCheckCircle2 className="h-4 w-4 mr-2" />
                      Marquer comme terminée
                    </Button>
                    <Button
                      onClick={() =>
                        serviceCarBooking?.id &&
                        handleCancelServiceCarBooking(serviceCarBooking?.id)
                      }
                      variant="secondary"
                      className="flex-1"
                      disabled={
                        isPending ||
                        isCancellingServiceCarBooking ||
                        !serviceCarBooking?.id
                      }
                    >
                      <TbCalendarCancel className="h-4 w-4 mr-2" />
                      Annuler la location
                    </Button>
                  </div>

                  <div className="flex  gap-3 pt-4 w-full">
                    <Button
                      onClick={() => setShowEditDialog(true)}
                      variant="outline"
                      className="flex-1"
                      disabled={
                        isPending ||
                        isDeletingServiceCarBooking ||
                        !serviceCarBooking?.id
                      }
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Modifier les dates
                    </Button>
                    <Button
                      onClick={() => setShowCancelDialog(true)}
                      variant="destructive"
                      className="flex-1"
                      disabled={
                        isPending ||
                        isDeletingServiceCarBooking ||
                        !serviceCarBooking?.id
                      }
                    >
                      <LuTrash2 className="h-4 w-4 mr-2" />
                      Supprimer la location
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <ServiceCarBookingFormDialog
                isOpen={showEditDialog}
                onClose={() => setShowEditDialog(false)}
                initialData={serviceCarBooking}
                showStatusField={true}
              />

              <DeleteConfirmationDialog
                showDeleteDialog={showCancelDialog}
                setShowDeleteDialog={setShowCancelDialog}
                handleDelete={() =>
                  serviceCarBooking?.id &&
                  handleDeleteServiceCarBooking(serviceCarBooking?.id)
                }
                title="Supprimer la location"
                description={`supprimer la location de ${serviceCarBooking?.serviceCar?.brand} ${serviceCarBooking?.serviceCar?.model} (${serviceCarBooking?.serviceCar?.registrationPlate}) pour le conducteur ${serviceCarBooking?.driver?.firstName} ${serviceCarBooking?.driver?.lastName}`}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

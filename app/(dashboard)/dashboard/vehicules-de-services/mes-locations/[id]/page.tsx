"use client";

import { DetailRow } from "@/components/shared/details-row";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetServiceCarBookingById } from "@/features/service-car-booking/hooks";
import { formatDateTime } from "@/lib/utils";
import {
  getCategoryLabel,
  getMotorisationColor,
  getMotorisationLabel,
  getStatusColor,
  getStatusLabel,
} from "@/types/car";
import {
  AlertCircle,
  Calendar,
  Edit,
  Leaf,
  Palette,
  Users,
  X,
} from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { BsFuelPump } from "react-icons/bs";
import { MdGarage } from "react-icons/md";
import { TbLicense } from "react-icons/tb";

export default function ServiceCarBookingDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { data: serviceCarBooking, isPending } = useGetServiceCarBookingById(
    id as string
  );

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
              {serviceCarBooking?.serviceCar?.status && (
                <Badge
                  className={`${getStatusColor(
                    serviceCarBooking?.serviceCar?.status
                  )} text-white text-md font-semibold`}
                >
                  {getStatusLabel(serviceCarBooking?.serviceCar?.status)}
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
              <CardTitle className="text-2xl font-bold">
                Détails de la location
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Dates de réservation */}
              <Card className="border-border bg-white">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
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

              {/* Informations du conducteur */}
              {serviceCarBooking?.driver && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-muted-foreground" />
                    <h3 className="text-lg font-semibold">Conducteur</h3>
                  </div>
                  <div className="pl-7">
                    <p className="text-sm text-muted-foreground">
                      {serviceCarBooking.driver.firstName}{" "}
                      {serviceCarBooking.driver.lastName}
                    </p>
                  </div>
                </div>
              )}

              {/* Boutons d'action */}
              <div className="flex flex-col gap-3 pt-4">
                <Button
                  onClick={() => setIsEditDialogOpen(true)}
                  variant="outline"
                  className="w-full"
                  disabled={isPending || !serviceCarBooking?.id}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Modifier les dates
                </Button>
                <Button
                  onClick={() => {}}
                  variant="destructive"
                  className="w-full"
                  disabled={isPending || !serviceCarBooking?.id}
                >
                  <X className="h-4 w-4 mr-2" />
                  Annuler la location
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

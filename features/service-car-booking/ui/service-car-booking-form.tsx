"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import InputDateTimeCalendar from "@/components/ui/input-date-time-calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { useGetCurrentUser } from "@/features/auth/hooks";
import {
  useBookServiceCar,
  useEditServiceCarBooking,
  useGetServiceCarBookings,
} from "@/features/service-car-booking/hooks";
import { Car } from "@/types/car";
import {
  getBookingStatusLabel,
  ServiceCarBooking,
} from "@/types/service-car-booking";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { serviceCarBookingSchema, ServiceCarBookingSchema } from "../schemas";

/** Retourne la date à minuit (début de journée). */
function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

/** Indique si la date est comprise entre rangeStart et rangeEnd (inclus). */
function isDateInRange(date: Date, rangeStart: Date, rangeEnd: Date): boolean {
  const day = startOfDay(date).getTime();
  const start = startOfDay(rangeStart).getTime();
  const end = startOfDay(rangeEnd).getTime();
  return day >= start && day <= end;
}

interface ServiceCarBookingFormProps {
  initialData?: ServiceCarBooking;
  serviceCar?: Car;
  isEditMode?: boolean;
  onClose?: () => void;
  showStatusField?: boolean;
}

/**
 * Formulaire de réservation ou modification d’un véhicule de service (dates, créneau, statut optionnel).
 * Gère les conflits de dates avec les réservations existantes.
 * @param initialData Réservation existante en mode édition (optionnel).
 * @param serviceCar Véhicule concerné (optionnel, pour affichage ou contraintes).
 * @param isEditMode Si vrai, utilise la mutation de modification au lieu de création.
 * @param onClose Callback appelé à la fermeture ou après succès.
 * @param showStatusField Si vrai, affiche le champ statut (pour les admins).
 */
export function ServiceCarBookingForm({
  initialData,
  serviceCar,
  isEditMode,
  onClose,
  showStatusField = false,
}: ServiceCarBookingFormProps) {
  const router = useRouter();
  const { data: currentUser } = useGetCurrentUser();
  const { data: allBookings = [] } = useGetServiceCarBookings();
  const { mutate: bookServiceCar, isPending: isBookingPending } =
    useBookServiceCar();
  const { mutate: editServiceCarBooking, isPending: isEditingPending } =
    useEditServiceCarBooking();

  const serviceCarId = serviceCar?.id ?? initialData?.serviceCar?.id;
  const disabledMatcher = useMemo(() => {
    const startOfToday = startOfDay(new Date());
    const pastDatesMatcher = { before: startOfToday };
    if (!serviceCarId) {
      return pastDatesMatcher;
    }
    const otherBookings = allBookings.filter(
      (b) =>
        (b.serviceCarId === serviceCarId ||
          b.serviceCar?.id === serviceCarId) &&
        b.status !== "CANCELLED" &&
        (isEditMode ? b.id !== initialData?.id : true),
    );
    const reservedRanges = otherBookings.map((b) => ({
      start: new Date(b.startAt),
      end: new Date(b.endAt),
    }));
    const reservedMatcher = (date: Date) =>
      reservedRanges.some((r) => isDateInRange(date, r.start, r.end));
    return [pastDatesMatcher, reservedMatcher];
  }, [serviceCarId, allBookings, isEditMode, initialData?.id]);

  const form = useForm<ServiceCarBookingSchema>({
    resolver: zodResolver(serviceCarBookingSchema),
    defaultValues: {
      id: initialData?.id,
      serviceCarId: initialData?.serviceCar?.id ?? serviceCar?.id,
      driverId: initialData?.driver?.id ?? currentUser?.id,
      startAt: new Date(initialData?.startAt ?? new Date()),
      endAt: new Date(initialData?.endAt ?? new Date()),
      status: initialData?.status ?? "CONFIRMED",
    },
  });

  const onSubmit = async (data: ServiceCarBookingSchema) => {
    if (isEditMode) {
      editServiceCarBooking(data, {
        onSuccess: () => {
          toast.success("Location modifiée avec succès");
          onClose?.();
          form.reset();
        },
        onError: (error) => {
          toast.error(error.message);
        },
      });
    } else {
      bookServiceCar(data, {
        onSuccess: () => {
          toast.success("Véhicule de service réservé avec succès");
          router.push("/dashboard/vehicules-de-services/mes-locations");
        },
        onError: (error) => {
          toast.error(error.message);
        },
      });
    }
  };
  return (
    <form id="service-car-booking-form" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        {/* Champ status pour l'admin */}
        {showStatusField && (
          <Controller
            control={form.control}
            name="status"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="w-fit">
                <FieldLabel htmlFor={field.name} className="text-md">
                  Statut : <span className="text-red-500">*</span>
                </FieldLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Sélectionner un statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PENDING">
                      {getBookingStatusLabel("PENDING")}
                    </SelectItem>
                    <SelectItem value="CONFIRMED">
                      {getBookingStatusLabel("CONFIRMED")}
                    </SelectItem>
                    <SelectItem value="CANCELLED">
                      {getBookingStatusLabel("CANCELLED")}
                    </SelectItem>
                    <SelectItem value="COMPLETED">
                      {getBookingStatusLabel("COMPLETED")}
                    </SelectItem>
                  </SelectContent>
                </Select>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Date et heure de début */}
          <Controller
            control={form.control}
            name="startAt"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name} className="text-md">
                  Du : <span className="text-red-500">*</span>
                </FieldLabel>
                <InputDateTimeCalendar
                  value={field.value}
                  onChange={field.onChange}
                  disabled={disabledMatcher}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          {/* Date et heure de fin */}
          <Controller
            control={form.control}
            name="endAt"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name} className="text-md">
                  Au : <span className="text-red-500">*</span>
                </FieldLabel>
                <InputDateTimeCalendar
                  value={field.value}
                  onChange={field.onChange}
                  disabled={disabledMatcher}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>

        <Field>
          <div className="flex justify-end gap-2">
            {onClose && (
              <Button type="button" variant="outline" onClick={onClose}>
                Annuler
              </Button>
            )}
            <Button
              type="submit"
              form="service-car-booking-form"
              disabled={isBookingPending}
              className={!onClose ? "w-full" : ""}
            >
              {isBookingPending || isEditingPending ? (
                <Spinner className="w-4 h-4" />
              ) : isEditMode ? (
                "Modifier"
              ) : (
                "Réserver"
              )}
            </Button>
          </div>
        </Field>
      </FieldGroup>
    </form>
  );
}

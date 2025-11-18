"use client";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import InputCarSelect from "@/components/ui/input-car-select";
import { InputDateTime } from "@/components/ui/input-date-time";
import InputNumber from "@/components/ui/input-number";
import InputTime from "@/components/ui/input-time";
import { Spinner } from "@/components/ui/spinner";
import { AddressForm } from "@/features/addresses/ui/address-form";
import { useGetCurrentUser } from "@/features/auth/hooks";
import { useGetDriverCarById } from "@/features/car/hooks";
import { useAddCarpool, useEditCarpool } from "@/features/carpool/hooks";
import { CarpoolSchema, carpoolSchema } from "@/features/carpool/schemas";
import { Carpool } from "@/types/carpool";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

interface CarpoolFormProps {
  initialData?: CarpoolSchema;
  onClose: () => void;
}

export function CarpoolForm({ initialData, onClose }: CarpoolFormProps) {
  const { data: currentUser } = useGetCurrentUser();
  const { mutate: addCarpool, isPending } = useAddCarpool();
  const { mutate: editCarpool, isPending: isEditingPending } = useEditCarpool();
  const { data: cars } = useGetDriverCarById(currentUser?.id);

  const carId = initialData?.carId ?? (initialData as Carpool)?.car?.id ?? 0;

  const form = useForm<CarpoolSchema>({
    resolver: zodResolver(carpoolSchema),
    defaultValues: {
      id: initialData?.id,
      driverId: initialData?.driverId ?? currentUser?.id,
      carId: carId,
      fromAddress: initialData?.fromAddress ?? {
        street: "",
        city: "",
        postalCode: "",
        country: "",
      },
      toAddress: initialData?.toAddress ?? {
        street: "",
        city: "",
        postalCode: "",
        country: "",
      },
      distanceKm: initialData?.distanceKm ?? 0,
      durationMin: initialData?.durationMin ?? 0,
      seatsTotal: initialData?.seatsTotal ?? 0,
      seatsRemaining: initialData?.seatsRemaining ?? 0,
      departureAt: initialData?.departureAt
        ? typeof initialData.departureAt === "string"
          ? new Date(initialData.departureAt)
          : initialData.departureAt
        : new Date(),
      status: initialData?.status ?? "OPEN",
    },
  });

  const onSubmit = (data: CarpoolSchema) => {
    if (initialData) {
      editCarpool(data, {
        onSuccess: () => {
          form.reset();
          onClose();
          toast.success("Covoiturage modifié avec succès");
        },
        onError: (error) => {
          toast.error(error.message);
        },
      });
    } else {
      addCarpool(data, {
        onSuccess: () => {
          form.reset();
          onClose();
          toast.success("Covoiturage ajouté avec succès");
        },
        onError: (error) => {
          toast.error(error.message);
        },
      });
    }
  };
  return (
    <form
      id="carpool-form"
      key={initialData?.id ?? "new"}
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <FieldGroup>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-4">
            {/* Adresse de départ */}
            <AddressForm
              control={form.control}
              fieldName="fromAddress"
              title="Adresse de départ"
            />

            {/* Adresse d'arrivée */}
            <AddressForm
              control={form.control}
              fieldName="toAddress"
              title="Adresse d'arrivée"
            />
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-2">
              {/* Date et heure de départ */}
              <Controller
                control={form.control}
                name="departureAt"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel id={`${field.name}-label`} htmlFor={field.name}>
                      Date et heure de départ
                      <span className="text-red-500">*</span>
                    </FieldLabel>
                    <InputDateTime
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Durée du trajet */}
              <Controller
                control={form.control}
                name="durationMin"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel id={`${field.name}-label`} htmlFor={field.name}>
                      Durée du trajet
                      <span className="text-red-500">*</span>
                    </FieldLabel>
                    <InputTime
                      value={field.value}
                      onChange={(value) => field.onChange(value ?? 0)}
                      onBlur={field.onBlur}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      required
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            <div className="flex items-center gap-2">
              {/* Places disponibles */}
              <Controller
                control={form.control}
                name="seatsTotal"
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="flex-1 min-w-0"
                  >
                    <FieldLabel id={`${field.name}-label`} htmlFor={field.name}>
                      Places disponibles
                      <span className="text-red-500">*</span>
                    </FieldLabel>
                    <InputNumber
                      value={field.value}
                      onChange={(value) => field.onChange(value ?? 0)}
                      onBlur={field.onBlur}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      required
                      unit="Place"
                      minValue={1}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Distance du trajet */}
              <Controller
                control={form.control}
                name="distanceKm"
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="flex-1 min-w-0"
                  >
                    <FieldLabel id={`${field.name}-label`} htmlFor={field.name}>
                      Distance du trajet
                      <span className="text-red-500">*</span>
                    </FieldLabel>
                    <InputNumber
                      value={field.value}
                      onChange={(value) => field.onChange(value ?? 0)}
                      onBlur={field.onBlur}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      required
                      unit="km"
                      minValue={0}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            {/* Mon véhicule */}
            <Controller
              control={form.control}
              name="carId"
              render={({ field, fieldState }) => {
                const handleCarChange = (carId: number) => {
                  field.onChange(carId);

                  // Préremplir seatsTotal et seatsRemaining quand un véhicule est sélectionné
                  if (cars && cars.length > 0) {
                    const selectedCar = cars.find((car) => car.id === carId);
                    if (selectedCar && selectedCar.seats) {
                      const totalSeats = selectedCar.seats - 1;
                      form.setValue("seatsTotal", totalSeats);
                      form.setValue("seatsRemaining", totalSeats);
                    }
                  }
                };

                return (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel id={`${field.name}-label`} htmlFor={field.name}>
                      Mon véhicule
                      <span className="text-red-500">*</span>
                    </FieldLabel>
                    <InputCarSelect
                      id={field.name}
                      cars={cars ?? []}
                      value={field.value}
                      onChange={handleCarChange}
                      onBlur={field.onBlur}
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                );
              }}
            />
          </div>
        </div>

        <Field>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit" form="carpool-form">
              {isPending || isEditingPending ? (
                <Spinner className="w-4 h-4" />
              ) : initialData ? (
                "Modifier"
              ) : (
                "Publier"
              )}
            </Button>
          </div>
        </Field>
      </FieldGroup>
    </form>
  );
}

"use client";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import InputCarSelect from "@/components/ui/input-car-select";
import { InputDateTime } from "@/components/ui/input-date-time";
import InputNumber from "@/components/ui/input-number";
import InputTime from "@/components/ui/input-time";
import { Spinner } from "@/components/ui/spinner";
import { useGetCurrentUser } from "@/features/auth/hooks";
import { useGetDriverCarById } from "@/features/car/hooks";
import { CarpoolSchema, carpoolSchema } from "@/features/carpool/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

interface CarpoolFormProps {
  initialData?: CarpoolSchema;
  onClose: () => void;
}

export function CarpoolForm({ initialData, onClose }: CarpoolFormProps) {
  const [isPending, setIsPending] = useState(false);
  const { data: currentUser } = useGetCurrentUser();

  const { data: cars } = useGetDriverCarById(currentUser?.id);

  const form = useForm<CarpoolSchema>({
    resolver: zodResolver(carpoolSchema),
    defaultValues: {
      departure_date: initialData?.departure_date || new Date(),
      departure_location: initialData?.departure_location || "",
      arrival_location: initialData?.arrival_location || "",
      duration: initialData?.duration || 0,
      available_seats: initialData?.available_seats || 0,
      distance: initialData?.distance || 0,
      carId: initialData?.carId || "",
      carpooling_status: initialData?.carpooling_status || "OPEN",
    },
  });

  const onSubmit = (data: CarpoolSchema) => {
    setIsPending(true);
    console.log(data);
    setIsPending(false);
  };
  return (
    <form id="carpool-form" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-4">
            {/* Adresse de départ */}
            <Controller
              control={form.control}
              name="departure_location"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    Adresse de départ<span className="text-red-500">*</span>
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    type="text"
                    placeholder="Adresse de départ"
                    required
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Adresse d'arrivée */}
            <Controller
              control={form.control}
              name="arrival_location"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    Adresse d&apos;arrivée
                    <span className="text-red-500">*</span>
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    type="text"
                    placeholder="Adresse d'arrivée"
                    required
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <div className="flex items-center gap-2">
              {/* Date et heure de départ */}
              <Controller
                control={form.control}
                name="departure_date"
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
                name="duration"
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
                name="available_seats"
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
                name="distance"
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
          </div>

          <div>
            {/* Mon véhicule */}
            <Controller
              control={form.control}
              name="carId"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel id={`${field.name}-label`} htmlFor={field.name}>
                    Mon véhicule
                    <span className="text-red-500">*</span>
                  </FieldLabel>
                  <InputCarSelect id={field.name} cars={cars ?? []} />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>
        </div>

        <Field>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit" form="carpool-form">
              {isPending ? <Spinner className="w-4 h-4" /> : "Publier"}
            </Button>
          </div>
        </Field>
      </FieldGroup>
    </form>
  );
}

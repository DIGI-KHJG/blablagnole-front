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
import {
  carpoolingSchema,
  CarpoolingSchema,
} from "@/features/carpooling/shemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

interface CarpoolingFormProps {
  initialData?: CarpoolingSchema;
  onClose: () => void;
}

export function CarpoolingForm({ initialData, onClose }: CarpoolingFormProps) {
  const [isPending, setIsPending] = useState(false);

  const form = useForm<CarpoolingSchema>({
    resolver: zodResolver(carpoolingSchema),
    defaultValues: {
      departure_date: initialData?.departure_date || new Date(),
      departure_location: initialData?.departure_location || "",
      arrival_location: initialData?.arrival_location || "",
      duration: initialData?.duration || 0,
      available_seats: initialData?.available_seats || 0,
      distance: initialData?.distance || 0,
      car: initialData?.car || "",
      carpooling_status: initialData?.carpooling_status || "ACTIVE",
    },
  });

  const onSubmit = (data: CarpoolingSchema) => {
    try {
      setIsPending(true);
      console.log(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsPending(false);
    }
  };
  return (
    <form id="carpooling-form" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <div className="grid grid-cols-2 gap-10">
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
              name="car"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel id={`${field.name}-label`} htmlFor={field.name}>
                    Mon véhicule
                    <span className="text-red-500">*</span>
                  </FieldLabel>
                  <InputCarSelect id={field.name} />
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
            <Button
              type="button"
              form="carpooling-form"
              variant="outline"
              onClick={onClose}
            >
              Annuler
            </Button>
            <Button type="submit" form="carpooling-form">
              {isPending ? <Spinner className="w-4 h-4" /> : "Publier"}
            </Button>
          </div>
        </Field>
      </FieldGroup>
    </form>
  );
}

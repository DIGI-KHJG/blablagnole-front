"use client";

import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { InputCarBrand } from "@/components/ui/input-car-brand";
import { InputCarCategory } from "@/components/ui/input-car-category";
import InputNumber from "@/components/ui/input-number";
import { InputPlateNumber } from "@/components/ui/input-plate-number";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { carSchema, CarSchema } from "../schemas";

interface CarFormProps {
  initialData?: CarSchema;
  onClose: () => void;
}
export function CarForm({ initialData, onClose }: CarFormProps) {
  const [isPending, setIsPending] = useState(false);
  const form = useForm<CarSchema>({
    resolver: zodResolver(carSchema),
    defaultValues: {
      brand: initialData?.brand || "",
      model: initialData?.model || "",
      type: initialData?.type || "",
      year: initialData?.year || new Date().getFullYear(),
      color: initialData?.color || "",
      seats_count: initialData?.seats_count || 2,
      doors_count: initialData?.doors_count || 2,
      plate_number: initialData?.plate_number || "",
      is_available: initialData?.is_available || true,
      image: initialData?.image || "",
      status: initialData?.status || "AVAILABLE",
      motorization: initialData?.motorization || "GASOLINE",
      co2_emissions_km: initialData?.co2_emissions_km || null,
    },
  });
  const onSubmit = (data: CarSchema) => {
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
    <form id="car-form" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        {/* URL de l'image */}
        <Controller
          control={form.control}
          name="image"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>
                Image (URL)<span className="text-red-500">*</span>
              </FieldLabel>
              <Input
                {...field}
                id={field.name}
                type="url"
                placeholder="https://..."
                required
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <div className="grid grid-cols-2 gap-10">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              {/* Marque */}
              <Controller
                control={form.control}
                name="brand"
                render={({ field, fieldState }) => (
                  <InputCarBrand
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    required
                    className="flex-1 min-w-0"
                    error={fieldState.error?.message}
                  />
                )}
              />

              {/* Modèle */}
              <Controller
                control={form.control}
                name="model"
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="flex-1 min-w-0"
                  >
                    <FieldLabel htmlFor={field.name}>
                      Modèle<span className="text-red-500">*</span>
                    </FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      placeholder="Modèle"
                      required
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
            <div className="flex items-center gap-4">
              {/* Nombre de places */}
              <Controller
                control={form.control}
                name="seats_count"
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="flex-1 min-w-0"
                  >
                    <FieldLabel htmlFor={field.name}>
                      Nombre de places<span className="text-red-500">*</span>
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

              {/* Nombre de portes */}
              <Controller
                control={form.control}
                name="doors_count"
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="flex-1 min-w-0"
                  >
                    <FieldLabel htmlFor={field.name}>
                      Nombre de portes<span className="text-red-500">*</span>
                    </FieldLabel>
                    <InputNumber
                      value={field.value}
                      onChange={(value) => field.onChange(value ?? 0)}
                      onBlur={field.onBlur}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      required
                      unit="Porte"
                      minValue={1}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            {/* Couleur */}
            <Controller
              control={form.control}
              name="color"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    Couleur<span className="text-red-500">*</span>
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    placeholder="Couleur"
                    required
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              {/* Type */}
              <Controller
                control={form.control}
                name="type"
                render={({ field, fieldState }) => (
                  <InputCarCategory
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    required
                    className="flex-1 min-w-0"
                    error={fieldState.error?.message}
                  />
                )}
              />
              {/* Année */}
              <Controller
                control={form.control}
                name="year"
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="flex-1 min-w-0"
                  >
                    <FieldLabel htmlFor={field.name}>
                      Année<span className="text-red-500">*</span>
                    </FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      type="number"
                      min={1950}
                      max={new Date().getFullYear() + 1}
                      required
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            <div className="flex items-center gap-4">
              {/* Plaque d'immatriculation */}
              <Controller
                control={form.control}
                name="plate_number"
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="flex-1 min-w-0"
                  >
                    <FieldLabel htmlFor={field.name}>
                      Plaque d&apos;immatriculation
                      <span className="text-red-500">*</span>
                    </FieldLabel>
                    <InputPlateNumber
                      id={field.name}
                      value={field.value || ""}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      required
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Motorisation */}
              <Controller
                control={form.control}
                name="motorization"
                render={({ field }) => (
                  <Field className="flex-1 min-w-0">
                    <FieldLabel>Motorisation</FieldLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="GASOLINE">Essence</SelectItem>
                        <SelectItem value="DIESEL">Diesel</SelectItem>
                        <SelectItem value="ELECTRIC">Électrique</SelectItem>
                        <SelectItem value="HYBRID">Hybride</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>
                )}
              />
            </div>
            {/* Émissions de CO2 */}
            <Controller
              control={form.control}
              name="co2_emissions_km"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    CO2 (g/km)<span className="text-red-500">*</span>
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    type="number"
                    min={0}
                    value={field.value ?? ""}
                    placeholder="CO2 (g/km)"
                    required
                  />
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
            <Button type="submit" form="car-form">
              {isPending ? <Spinner className="w-4 h-4" /> : "Ajouter"}
            </Button>
          </div>
        </Field>
      </FieldGroup>
    </form>
  );
}

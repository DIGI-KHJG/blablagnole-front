"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from "react";
import { carSchema, CarSchema } from "./shema";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Controller, useForm } from "react-hook-form";
import { Spinner } from "@/components/ui/spinner";
interface CompanyCarFormProps {
  initialData?: CarSchema;
  onClose: () => void;
}
export function CompagnyForm({ initialData, onClose }: CompanyCarFormProps) {
  const [isPending, setIsPending] = useState(false);
  const form = useForm<CarSchema>({
    resolver: zodResolver(carSchema),
    defaultValues: {
      brand: initialData?.brand || "",
      model: initialData?.model || "",
      type: initialData?.type || "SEDAN",
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
    <form id="company-car-form" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <div className="grid grid-cols-2 gap-10">
          <div className="space-y-4">
        </div>
               {/* Brand */}
            <Controller
              control={form.control}
              name="brand"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Marque</FieldLabel>
                  <Input {...field} id={field.name} placeholder="Peugeot" />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            {/* Model */}
            <Controller
              control={form.control}
              name="model"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Modèle</FieldLabel>
                  <Input {...field} id={field.name} placeholder="208" />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            {/* Type (select) */}
            <Controller
              control={form.control}
              name="type"
              render={({ field }) => (
                <Field>
                  <FieldLabel>Type</FieldLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SEDAN">Berline</SelectItem>
                      <SelectItem value="SUV">SUV</SelectItem>
                      <SelectItem value="VAN">Van</SelectItem>
                      <SelectItem value="COUPE">Coupe</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
              )}
            />
             {/* Year */}
            <Controller
              control={form.control}
              name="year"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Année</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    type="number"
                    min={1900}
                    max={new Date().getFullYear() + 1}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </div>

          <div className="space-y-4">
            {/* Color */}
            <Controller
              control={form.control}
              name="color"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Couleur</FieldLabel>
                  <Input {...field} id={field.name} placeholder="Bleu" />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            {/* Seats count */}
            <Controller
              control={form.control}
              name="seats_count"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Nombre de places</FieldLabel>
                  <Input {...field} id={field.name} type="number" min={1} max={9} />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            {/* Doors count */}
            <Controller
              control={form.control}
              name="doors_count"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Nombre de portes</FieldLabel>
                  <Input {...field} id={field.name} type="number" min={1} max={5} />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            {/* Plate number */}
            <Controller
              control={form.control}
              name="plate_number"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Plaque d'immatriculation</FieldLabel>
                  <Input {...field} id={field.name} placeholder="AA-123-AA" />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            {/* Motorization */}
            <Controller
              control={form.control}
              name="motorization"
              render={({ field }) => (
                <Field>
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
             {/* CO2 emissions */}
            <Controller
              control={form.control}
              name="co2_emissions_km"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>CO2 (g/km)</FieldLabel>
                  <Input {...field} id={field.name} type="number" min={0} value={field.value ?? ""} />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            {/* Image URL */}
            <Controller
              control={form.control}
              name="image"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Image (URL)</FieldLabel>
                  <Input {...field} id={field.name} type="url" placeholder="https://..." />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </div>
        <Field>
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              form="company-car-form"
              variant="outline"
              onClick={onClose}
            >
              Annuler
            </Button>
            <Button type="submit" form="company-car-form">
              {isPending ? <Spinner className="w-4 h-4" /> : "Ajouter"}
            </Button>
          </div>
        </Field>
      </FieldGroup>
    </form>);
}
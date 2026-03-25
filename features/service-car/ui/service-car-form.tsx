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
import {
  useAddServiceCar,
  useEditServiceCar,
} from "@/features/service-car/hooks";
import {
  serviceCarSchema,
  ServiceCarSchema,
} from "@/features/service-car/schemas";
import { Car } from "@/types/car";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

interface ServiceCarFormProps {
  initialData?: Car;
  onClose: () => void;
}

/**
 * Formulaire de création ou modification d’un véhicule de service (plaque, marque, modèle, catégorie, motorisation, CO2).
 * @param initialData Données initiales en mode édition (optionnel).
 * @param onClose Callback appelé à la fermeture ou après succès.
 */
export function ServiceCarForm({ initialData, onClose }: ServiceCarFormProps) {
  const { mutate: addServiceCar, isPending } = useAddServiceCar();
  const { mutate: editServiceCar, isPending: isEditingPending } =
    useEditServiceCar();

  const form = useForm<ServiceCarSchema>({
    resolver: zodResolver(serviceCarSchema),
    defaultValues: {
      id: initialData?.id,
      registrationPlate: initialData?.registrationPlate ?? "",
      brand: initialData?.brand ?? "",
      model: initialData?.model ?? "",
      category: initialData?.category ?? "",
      motorisation: initialData?.motorisation ?? "PETROL",
      co2Emission: initialData?.co2Emission ?? 0,
      color: initialData?.color ?? "",
      seats: initialData?.seats ?? 2,
      imageUrl: initialData?.imageUrl ?? "",
      status: initialData?.status ?? "IN_SERVICE",
    },
  });

  const onSubmit = async (data: ServiceCarSchema) => {
    if (initialData) {
      editServiceCar(data, {
        onSuccess: () => {
          form.reset();
          onClose();
          toast.success("Véhicule de service modifié avec succès");
        },
        onError: (error) => {
          toast.error(error.message);
        },
      });
    } else {
      addServiceCar(data, {
        onSuccess: () => {
          form.reset();
          onClose();
          toast.success("Véhicule de service ajouté avec succès");
        },
        onError: (error) => {
          toast.error(error.message);
        },
      });
    }
  };
  return (
    <form id="service-car-form" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        {/* Statut */}
        <Controller
          control={form.control}
          name="status"
          render={({ field }) => (
            <Field className="w-fit">
              <FieldLabel>
                Statut<span className="text-red-500">*</span>
              </FieldLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="IN_SERVICE">En service</SelectItem>
                  <SelectItem value="UNDER_REPAIR">En réparation</SelectItem>
                  <SelectItem value="OUT_OF_SERVICE">Hors service</SelectItem>
                </SelectContent>
              </Select>
            </Field>
          )}
        />
        {/* URL de l'image */}
        <Controller
          control={form.control}
          name="imageUrl"
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
                name="seats"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="w-1/2">
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

              {/* Émissions de CO2 */}
              <Controller
                control={form.control}
                name="co2Emission"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="w-1/2">
                    <FieldLabel htmlFor={field.name}>
                      CO2 (g/km)<span className="text-red-500">*</span>
                    </FieldLabel>
                    <InputNumber
                      value={field.value}
                      onChange={(value) => field.onChange(value ?? 0)}
                      onBlur={field.onBlur}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      required
                      unit="g/km"
                      allowDecimals={true}
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
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              {/* Catégorie */}
              <Controller
                control={form.control}
                name="category"
                render={({ field, fieldState }) => (
                  <InputCarCategory
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    required
                    className="w-1/2"
                    error={fieldState.error?.message}
                  />
                )}
              />
              {/* Motorisation */}
              <Controller
                control={form.control}
                name="motorisation"
                render={({ field }) => (
                  <Field className="flex-1 min-w-0">
                    <FieldLabel>
                      Motorisation<span className="text-red-500">*</span>
                    </FieldLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PETROL">Essence</SelectItem>
                        <SelectItem value="DIESEL">Diesel</SelectItem>
                        <SelectItem value="ELECTRIC">Électrique</SelectItem>
                        <SelectItem value="HYBRID">Hybride</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>
                )}
              />
            </div>

            <div className="flex items-center gap-4">
              {/* Plaque d'immatriculation */}
              <Controller
                control={form.control}
                name="registrationPlate"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
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
          </div>
        </div>

        <Field>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button
              type="submit"
              form="service-car-form"
              disabled={isPending || isEditingPending}
            >
              {isPending || isEditingPending ? (
                <Spinner className="w-4 h-4" />
              ) : initialData ? (
                "Modifier"
              ) : (
                "Ajouter"
              )}
            </Button>
          </div>
        </Field>
      </FieldGroup>
    </form>
  );
}

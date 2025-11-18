"use client";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Control, Controller, Path } from "react-hook-form";

type AddressFieldPath<TFieldValues> = Path<TFieldValues> & string;

interface AddressFormProps<TFieldValues extends Record<string, unknown>> {
  control: Control<TFieldValues>;
  fieldName: AddressFieldPath<TFieldValues>;
  title: string;
}

export function AddressForm<TFieldValues extends Record<string, unknown>>({
  control,
  fieldName,
  title,
}: AddressFormProps<TFieldValues>) {
  const baseName = String(fieldName);

  return (
    <div className="border-border border rounded-md space-y-6 p-4">
      <h3 className="text-lg font-medium">{title}</h3>

      {/* Rue */}
      <Controller
        control={control}
        name={`${baseName}.street` as Path<TFieldValues>}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={`${baseName}.street`}>
              Libellé de la voie<span className="text-red-500">*</span>
            </FieldLabel>
            <Input
              {...field}
              value={String(field.value ?? "")}
              id={`${baseName}.street`}
              aria-invalid={fieldState.invalid}
              type="text"
              placeholder="Libellé de la voie"
              required
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <div className="flex items-center gap-2">
        {/* Code postal */}
        <Controller
          control={control}
          name={`${baseName}.postalCode` as Path<TFieldValues>}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="flex-1">
              <FieldLabel htmlFor={`${baseName}.postalCode`}>
                Code postal<span className="text-red-500">*</span>
              </FieldLabel>
              <Input
                {...field}
                value={String(field.value ?? "")}
                id={`${baseName}.postalCode`}
                aria-invalid={fieldState.invalid}
                type="text"
                placeholder="Code postal"
                required
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Ville */}
        <Controller
          control={control}
          name={`${baseName}.city` as Path<TFieldValues>}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="flex-1">
              <FieldLabel htmlFor={`${baseName}.city`}>
                Ville<span className="text-red-500">*</span>
              </FieldLabel>
              <Input
                {...field}
                value={String(field.value ?? "")}
                id={`${baseName}.city`}
                aria-invalid={fieldState.invalid}
                type="text"
                placeholder="Ville"
                required
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>

      {/* Pays */}
      <Controller
        control={control}
        name={`${baseName}.country` as Path<TFieldValues>}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={`${baseName}.country`}>
              Pays<span className="text-red-500">*</span>
            </FieldLabel>
            <Input
              {...field}
              value={String(field.value ?? "")}
              id={`${baseName}.country`}
              aria-invalid={fieldState.invalid}
              type="text"
              placeholder="Pays"
              required
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </div>
  );
}

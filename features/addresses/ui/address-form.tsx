"use client";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputAddressAutocomplete } from "@/components/ui/input-address-autocomplete";
import { Control, Controller, Path, useWatch } from "react-hook-form";

type AddressFieldPath<TFieldValues> = Path<TFieldValues> & string;

export interface AddressSelectResult {
  address: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  coords: { lat: number; lon: number };
}

interface AddressFormProps<TFieldValues extends Record<string, unknown>> {
  control: Control<TFieldValues>;
  fieldName: AddressFieldPath<TFieldValues>;
  title: string;
  /** Remplace le champ "Libellé de la voie" par un autocomplete d'adresse. */
  enableAutocomplete?: boolean;
  /** Appelé quand une adresse est sélectionnée (remplit tous les champs + coords pour le parent). */
  onAddressSelect?: (result: AddressSelectResult) => void;
}

/**
 * Bloc de champs pour une adresse (voie, ville, code postal, pays), optionnellement avec autocomplete.
 * @param control Contrôle react-hook-form du formulaire parent.
 * @param fieldName Chemin du champ adresse dans le formulaire.
 * @param title Titre affiché au-dessus des champs.
 * @param enableAutocomplete Si vrai, remplace le champ voie par un autocomplete Photon.
 * @param onAddressSelect Callback appelé quand une adresse est sélectionnée (remplit champs + coords).
 */
export function AddressForm<TFieldValues extends Record<string, unknown>>({
  control,
  fieldName,
  title,
  enableAutocomplete,
  onAddressSelect,
}: AddressFormProps<TFieldValues>) {
  const baseName = String(fieldName);
  const watchedAddress = useWatch({ control, name: fieldName });
  const addressDisplayValue =
    watchedAddress &&
    typeof watchedAddress === "object" &&
    "street" in watchedAddress
      ? (() => {
          const a = watchedAddress as {
            street?: string;
            city?: string;
            postalCode?: string;
            country?: string;
          };
          const street = (a.street && a.street !== "—" ? a.street : "").replace(
            /,\s*$/,
            "",
          ).trim();
          return street || "";
        })()
      : "";

  return (
    <div className="border-border border rounded-md space-y-6 p-4">
      <h3 className="text-lg font-medium">{title}</h3>

      {/* Rue ou recherche d'adresse */}
      {enableAutocomplete && onAddressSelect ? (
        <Field>
          <FieldLabel htmlFor={`${baseName}.street`}>
            Libellé de la voie<span className="text-red-500">*</span>
          </FieldLabel>
          <InputAddressAutocomplete
            id={`${baseName}.street`}
            value={addressDisplayValue}
            placeholder="Rechercher une adresse (rue, ville, code postal...)"
            onSelect={(result) => {
              onAddressSelect(result);
            }}
          />
        </Field>
      ) : (
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
      )}

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

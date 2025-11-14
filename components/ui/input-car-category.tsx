"use client";

import carCategories from "@/features/car/data/car-categories.json";
import { Combobox } from "./combobox";
import { Field, FieldError, FieldLabel } from "./field";

export interface InputCarCategoryProps {
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  id?: string;
  "aria-invalid"?: boolean;
  "aria-labelledby"?: string;
  required?: boolean;
  className?: string;
  label?: string;
  error?: string;
}

export function InputCarCategory({
  value = "",
  onChange,
  id,
  "aria-invalid": ariaInvalid,
  "aria-labelledby": ariaLabelledBy,
  required,
  className,
  label = "Catégorie",
  error,
}: InputCarCategoryProps) {
  // Convertir le code en label français pour l'affichage
  const categoryLabels = Object.values(carCategories);
  const categoryCodes = Object.keys(carCategories) as Array<
    keyof typeof carCategories
  >;
  const currentCategory = value
    ? carCategories[value as keyof typeof carCategories]
    : "";

  const handleCategoryChange = (label: string) => {
    // Trouver le code correspondant au label
    const code = categoryCodes.find((code) => carCategories[code] === label);
    if (code && onChange) {
      onChange(code);
    }
  };

  return (
    <Field data-invalid={!!error} className={className}>
      <FieldLabel htmlFor={id} id={`${id}-label`}>
        {label}
        {required && <span className="text-red-500">*</span>}
      </FieldLabel>
      <Combobox
        value={currentCategory}
        onChange={handleCategoryChange}
        options={categoryLabels}
        placeholder="Choisir une catégorie"
        searchPlaceholder="Rechercher"
        id={id}
        aria-invalid={ariaInvalid}
        aria-labelledby={ariaLabelledBy || `${id}-label`}
        required={required}
      />
      {error && <FieldError errors={[{ message: error }]} />}
    </Field>
  );
}

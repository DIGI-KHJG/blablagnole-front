"use client";

import carBrands from "@/features/car/data/car-brands.json";
import { Combobox } from "./combobox";
import { Field, FieldError, FieldLabel } from "./field";

export interface InputCarBrandProps {
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

export function InputCarBrand({
  value = "",
  onChange,
  id,
  "aria-invalid": ariaInvalid,
  "aria-labelledby": ariaLabelledBy,
  required,
  className,
  label = "Marque",
  error,
}: InputCarBrandProps) {
  return (
    <Field data-invalid={!!error} className={className}>
      <FieldLabel htmlFor={id} id={`${id}-label`}>
        {label}
        {required && <span className="text-red-500">*</span>}
      </FieldLabel>
      <Combobox
        value={value}
        onChange={onChange}
        options={carBrands}
        placeholder="Choisir une marque"
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

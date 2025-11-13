"use client";

import * as React from "react";
import { Input } from "./input";

// Fonction pour formater la plaque d'immatriculation (AA-123-AA)
function formatPlateNumber(value: string): string {
  // Supprimer tous les caractères non alphanumériques et convertir en majuscules
  const cleaned = value.replace(/[^A-Za-z0-9]/g, "").toUpperCase();

  let result = "";

  // Construire la plaque caractère par caractère selon les règles
  for (let i = 0; i < cleaned.length && result.length < 7; i++) {
    const char = cleaned[i];
    const currentLength = result.length;

    // Positions 0-1 : seulement des lettres
    if (currentLength < 2) {
      if (/[A-Z]/.test(char)) {
        result += char;
      }
    }
    // Positions 2-4 : seulement des chiffres
    else if (currentLength < 5) {
      if (/[0-9]/.test(char)) {
        result += char;
      }
    }
    // Positions 5-6 : seulement des lettres
    else {
      if (/[A-Z]/.test(char)) {
        result += char;
      }
    }
  }

  // Formater avec les tirets
  if (result.length <= 2) {
    return result;
  } else if (result.length <= 5) {
    return `${result.slice(0, 2)}-${result.slice(2)}`;
  } else {
    return `${result.slice(0, 2)}-${result.slice(2, 5)}-${result.slice(5)}`;
  }
}

export interface InputPlateNumberProps
  extends Omit<React.ComponentProps<"input">, "onChange" | "value"> {
  value?: string;
  onChange?: (value: string) => void;
}

const InputPlateNumber = React.forwardRef<
  HTMLInputElement,
  InputPlateNumberProps
>(({ value = "", onChange, ...props }, ref) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPlateNumber(e.target.value);
    onChange?.(formatted);
  };

  return (
    <Input
      ref={ref}
      {...props}
      value={value}
      onChange={handleChange}
      placeholder={props.placeholder || "AA-123-AA"}
    />
  );
});

InputPlateNumber.displayName = "InputPlateNumber";

export { InputPlateNumber };

"use client";

import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { useId } from "react";
import { Button, Group, Input, NumberField } from "react-aria-components";

interface InputNumberProps {
  value?: number;
  onChange?: (value: number | undefined) => void;
  onBlur?: () => void;
  id?: string;
  "aria-invalid"?: boolean;
  "aria-labelledby"?: string;
  required?: boolean;
  unit?: "km" | "Place" | "Porte";
  minValue?: number;
  maxValue?: number;
}

export default function InputNumber({
  value,
  onChange,
  onBlur,
  id,
  "aria-invalid": ariaInvalid,
  "aria-labelledby": ariaLabelledBy,
  required,
  unit,
  minValue = 0,
  maxValue,
}: InputNumberProps) {
  const generatedId = useId();
  const fieldId = id || generatedId;
  const labelId = ariaLabelledBy || `${fieldId}-label`;
  // Permettre les décimales pour les kilomètres, pas pour les places
  const allowDecimals = unit === "km";
  const maxFractionDigits = allowDecimals ? 2 : 0;

  return (
    <NumberField
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      id={fieldId}
      aria-labelledby={labelId}
      aria-invalid={ariaInvalid}
      isRequired={required}
      minValue={minValue}
      maxValue={maxValue}
      formatOptions={{
        style: "decimal",
        minimumFractionDigits: 0,
        maximumFractionDigits: maxFractionDigits,
      }}
      step={allowDecimals ? 0.1 : 1}
    >
      <div className="*:not-first:mt-2">
        <Group className="relative flex h-9 w-full items-center overflow-hidden rounded-md border border-input text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none data-disabled:opacity-50 data-focus-within:border-ring data-focus-within:ring-[3px] data-focus-within:ring-ring/50 data-focus-within:has-aria-invalid:border-destructive data-focus-within:has-aria-invalid:ring-destructive/20 dark:data-focus-within:has-aria-invalid:ring-destructive/40">
          <Input className="flex-1 min-w-0 bg-background px-3 py-2 text-foreground tabular-nums" />
          {unit && (
            <span className="flex h-full shrink-0 items-center px-2 bg-muted/50 text-muted-foreground">
              {unit}
            </span>
          )}
          <div className="flex h-[calc(100%+2px)] shrink-0 flex-col">
            <Button
              slot="increment"
              className="-me-px flex h-1/2 w-6 flex-1 items-center justify-center border border-input bg-background text-sm text-muted-foreground/80 transition-[color,box-shadow] hover:bg-accent hover:text-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ChevronUpIcon size={12} aria-hidden="true" />
            </Button>
            <Button
              slot="decrement"
              className="-me-px -mt-px flex h-1/2 w-6 flex-1 items-center justify-center border border-input bg-background text-sm text-muted-foreground/80 transition-[color,box-shadow] hover:bg-accent hover:text-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ChevronDownIcon size={12} aria-hidden="true" />
            </Button>
          </div>
        </Group>
      </div>
    </NumberField>
  );
}

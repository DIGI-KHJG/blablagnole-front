"use client";

import { Time } from "@internationalized/date";
import { ClockIcon } from "lucide-react";
import { useId } from "react";
import { TimeValue } from "react-aria-components";

import { DateInput, TimeField } from "@/components/ui/datefield-rac";

interface InputTimeProps {
  value?: number;
  onChange?: (value: number | undefined) => void;
  onBlur?: () => void;
  id?: string;
  "aria-invalid"?: boolean;
  "aria-labelledby"?: string;
  required?: boolean;
}

export default function InputTime({
  value,
  onChange,
  onBlur,
  id,
  "aria-invalid": ariaInvalid,
  "aria-labelledby": ariaLabelledBy,
  required,
}: InputTimeProps) {
  const generatedId = useId();
  const fieldId = id || generatedId;
  const labelId = ariaLabelledBy || `${fieldId}-label`;
  // Convertir les minutes en TimeValue (heures, minutes)
  const timeValue =
    value != null && value >= 0
      ? new Time(
          Math.floor(value / 60), // heures
          value % 60 // minutes
        )
      : null;

  const handleChange = (newTimeValue: TimeValue | null) => {
    if (!newTimeValue) {
      onChange?.(undefined);
      return;
    }

    // Convertir TimeValue en minutes
    const minutes = newTimeValue.hour * 60 + newTimeValue.minute;
    onChange?.(minutes);
  };

  return (
    <TimeField
      className="*:not-first:mt-2"
      value={timeValue}
      onChange={handleChange}
      onBlur={onBlur}
      id={fieldId}
      aria-labelledby={labelId}
      aria-invalid={ariaInvalid}
      isRequired={required}
    >
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 start-0 z-10 flex items-center justify-center ps-3 text-muted-foreground/80">
          <ClockIcon size={16} aria-hidden="true" />
        </div>
        <DateInput className="ps-9" />
      </div>
    </TimeField>
  );
}

"use client";

import { ChevronDownIcon } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface InputDateTimeProps {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  onBlur?: () => void;
  id?: string;
  "aria-invalid"?: boolean;
  "aria-labelledby"?: string;
  required?: boolean;
}

export function InputDateTime({
  value,
  onChange,
  onBlur,
  id,
  "aria-invalid": ariaInvalid,
  "aria-labelledby": ariaLabelledBy,
  required,
}: InputDateTimeProps) {
  const [open, setOpen] = React.useState(false);
  const generatedId = React.useId();
  const fieldId = id || generatedId;
  const labelId = ariaLabelledBy || `${fieldId}-label`;

  // Extraire la date et l'heure de la valeur (copie pour le calendrier)
  const dateOnly = value
    ? (() => {
        const date = new Date(value);
        date.setHours(0, 0, 0, 0);
        return date;
      })()
    : undefined;

  // Formater l'heure en HH:MM (sans secondes)
  const formatTime = (date: Date | undefined): string => {
    if (!date) return "";
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const timeValue = formatTime(value);

  // Combiner la date et l'heure en un seul objet Date
  const handleDateChange = (selectedDate: Date | undefined) => {
    if (!selectedDate) {
      onChange?.(undefined);
      return;
    }

    if (value) {
      // Si une valeur existe, préserver l'heure
      const newDate = new Date(selectedDate);
      newDate.setHours(value.getHours(), value.getMinutes(), 0, 0);
      onChange?.(newDate);
    } else {
      // Si pas de valeur, créer une nouvelle date avec l'heure actuelle
      const newDate = new Date(selectedDate);
      const now = new Date();
      newDate.setHours(now.getHours(), now.getMinutes(), 0, 0);
      onChange?.(newDate);
    }
    setOpen(false);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const timeString = e.target.value;
    if (!timeString) {
      // Si l'heure est vide, garder la date mais mettre l'heure à minuit
      if (value) {
        const newDate = new Date(value);
        newDate.setHours(0, 0, 0, 0);
        onChange?.(newDate);
      }
      return;
    }

    const [hours, minutes] = timeString.split(":").map(Number);
    if (value) {
      // Si une date existe, mettre à jour seulement l'heure
      const newDate = new Date(value);
      newDate.setHours(hours, minutes, 0, 0);
      onChange?.(newDate);
    } else {
      // Si pas de date, créer une nouvelle date avec la date d'aujourd'hui et l'heure sélectionnée
      const newDate = new Date();
      newDate.setHours(hours, minutes, 0, 0);
      onChange?.(newDate);
    }
  };

  return (
    <div className="flex gap-4">
      <div className="flex flex-col gap-3">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id={`${fieldId}-date-picker`}
              className="w-full justify-between font-normal"
              type="button"
              aria-labelledby={labelId}
              aria-invalid={ariaInvalid}
            >
              {dateOnly
                ? dateOnly.toLocaleDateString()
                : "Sélectionner une date"}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              selected={dateOnly}
              captionLayout="dropdown"
              onSelect={handleDateChange}
              aria-label="Sélectionner une date"
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex flex-col gap-3">
        <Input
          type="time"
          id={`${fieldId}-time-picker`}
          step="60"
          value={timeValue}
          onChange={handleTimeChange}
          onBlur={onBlur}
          aria-labelledby={labelId}
          aria-invalid={ariaInvalid}
          required={required}
          className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
        />
      </div>
    </div>
  );
}

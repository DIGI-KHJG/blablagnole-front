"use client";

import { ClockIcon } from "lucide-react";
import { useId, useMemo } from "react";

import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface InputDateTimeCalendarProps {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
}

export default function InputDateTimeCalendar({
  value,
  onChange,
}: InputDateTimeCalendarProps) {
  const id = useId();

  const date = value
    ? new Date(value.getFullYear(), value.getMonth(), value.getDate())
    : undefined;

  const timeValue = useMemo(() => {
    if (value) {
      const hours = value.getHours().toString().padStart(2, "0");
      const minutes = value.getMinutes().toString().padStart(2, "0");
      return `${hours}:${minutes}`;
    }
    return "12:00";
  }, [value]);

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      const [hours, minutes] = timeValue.split(":").map(Number);
      const newDate = new Date(selectedDate);
      newDate.setHours(hours || 0, minutes || 0, 0);
      onChange?.(newDate);
    } else {
      onChange?.(undefined);
    }
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = e.target.value;
    const currentDate = date || value;
    if (currentDate) {
      const [hours, minutes] = newTime.split(":").map(Number);
      const newDate = new Date(currentDate);
      newDate.setHours(hours || 0, minutes || 0, 0);
      onChange?.(newDate);
    } else {
      // Si pas de date, créer une nouvelle date avec la date d'aujourd'hui
      const today = new Date();
      const [hours, minutes] = newTime.split(":").map(Number);
      today.setHours(hours || 0, minutes || 0, 0);
      onChange?.(today);
    }
  };

  return (
    <div>
      <div className="rounded-md border bg-white">
        <Calendar
          mode="single"
          className="p-2 w-full "
          selected={date}
          onSelect={handleDateSelect}
        />
        <div className="border-t p-3">
          <div className="flex items-center gap-3">
            <Label htmlFor={id} className="text-xs">
              Heure
            </Label>
            <div className="relative grow">
              <Input
                id={id}
                type="time"
                step="60"
                value={timeValue}
                onChange={handleTimeChange}
                className="peer appearance-none ps-9 [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
              />
              <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
                <ClockIcon size={16} aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

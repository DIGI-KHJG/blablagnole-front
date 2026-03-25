"use client";

import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const HOURS_START = 4;
const HOURS_END = 24; // 04:00 -> 23:00 (exclusive)
const TIME_OPTIONS = Array.from({ length: HOURS_END - HOURS_START }, (_, i) => {
  const h = HOURS_START + i;
  return `${String(h).padStart(2, "0")}:00`;
});

interface InputDateTimePopoverProps {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
}

function getTimeString(date: Date): string {
  return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
}

const DEFAULT_PLACEHOLDER = "Sélectionnez la date et heure de départ";

export default function InputDateTimePopover({
  value,
  onChange,
  placeholder = DEFAULT_PLACEHOLDER,
}: InputDateTimePopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const calendarRef = useRef<HTMLDivElement | null>(null);

  const effectiveValue = value;
  const date =
    effectiveValue && !isNaN(effectiveValue.getTime())
      ? new Date(
          effectiveValue.getFullYear(),
          effectiveValue.getMonth(),
          effectiveValue.getDate(),
        )
      : undefined;
  const timeDisplay =
    effectiveValue && !isNaN(effectiveValue.getTime())
      ? getTimeString(effectiveValue)
      : "";

  const handleSelectDate = (selectedDate: Date | undefined) => {
    if (!selectedDate) return;
    const [hours, minutes] = timeDisplay
      ? timeDisplay.split(":").map(Number)
      : [4, 0];
    const next = new Date(selectedDate);
    next.setHours(hours, minutes);
    onChange?.(next);
  };

  const handleSelectTime = (timeValue: string) => {
    const [hour, minute] = timeValue.split(":").map(Number);
    const base = date
      ? new Date(date.getFullYear(), date.getMonth(), date.getDate())
      : new Date();
    base.setHours(hour, minute);
    onChange?.(base);
    setIsOpen(false);
  };

  const displayText =
    effectiveValue && !isNaN(effectiveValue.getTime())
      ? `${format(effectiveValue, "PPP", { locale: fr })}, ${timeDisplay}`
      : "";

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen} modal={true}>
      <PopoverTrigger asChild>
        <div className="relative flex w-full items-center">
          <Input
            readOnly
            value={displayText}
            placeholder={placeholder}
            className={cn(
              "h-10 pr-9 cursor-pointer",
              !displayText && "text-muted-foreground",
            )}
            onClick={() => setIsOpen(true)}
            onFocus={(e) => {
              e.target.blur();
              setIsOpen(true);
            }}
            aria-label="Date et heure"
          />
          <CalendarIcon className="pointer-events-none absolute right-3 h-4 w-4 opacity-50" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 flex items-start" align="start">
        <div ref={calendarRef}>
          <Calendar
            mode="single"
            captionLayout="dropdown"
            selected={date}
            locale={fr}
            onSelect={(selectedDate) => {
              if (selectedDate) handleSelectDate(selectedDate);
            }}
            fromYear={2020}
            toYear={2100}
            disabled={false}
          />
        </div>
        <div className="w-[120px] my-4 mr-2">
          <ScrollArea className="h-[18rem]">
            <div className="flex flex-col gap-2 h-full">
              {TIME_OPTIONS.map((timeValue) => (
                <Button
                  key={timeValue}
                  className="w-full text-left px-2"
                  variant="outline"
                  onClick={() => handleSelectTime(timeValue)}
                >
                  {timeValue}
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>
      </PopoverContent>
    </Popover>
  );
}

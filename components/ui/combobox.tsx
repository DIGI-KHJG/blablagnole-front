"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ChevronDownIcon, SearchIcon } from "lucide-react";
import { useMemo, useRef, useState } from "react";

interface ComboboxProps {
  value?: string;
  onChange?: (value: string) => void;
  options: string[];
  placeholder?: string;
  searchPlaceholder?: string;
  className?: string;
  id?: string;
  "aria-invalid"?: boolean;
  "aria-labelledby"?: string;
  required?: boolean;
}

export function Combobox({
  value,
  onChange,
  options,
  placeholder = "Sélectionner...",
  searchPlaceholder = "Rechercher...",
  className,
  id,
  "aria-invalid": ariaInvalid,
  "aria-labelledby": ariaLabelledBy,
  required,
}: ComboboxProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const filteredOptions = useMemo(() => {
    if (!searchQuery) return options;
    const query = searchQuery.toLowerCase();
    return options.filter((option) => option.toLowerCase().includes(query));
  }, [options, searchQuery]);

  const selectedOption = options.find((opt) => opt === value);

  const handleSelect = (option: string) => {
    onChange?.(option);
    setIsOpen(false);
    setSearchQuery("");
  };

  return (
    <Popover
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (open) {
          setTimeout(() => searchInputRef.current?.focus(), 0);
        } else {
          setSearchQuery("");
        }
      }}
    >
      <PopoverTrigger asChild>
        <Button
          id={id}
          aria-labelledby={ariaLabelledBy}
          aria-invalid={ariaInvalid}
          aria-required={required}
          type="button"
          variant="outline"
          className={cn(
            "w-full justify-between font-normal h-9",
            !selectedOption && "text-muted-foreground",
            className
          )}
        >
          <span className="truncate">{selectedOption || placeholder}</span>
          <ChevronDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[var(--radix-popover-trigger-width)] p-0"
        align="start"
      >
        <div className="flex items-center gap-2 border-b px-3 py-2">
          <SearchIcon className="h-4 w-4 shrink-0 text-muted-foreground" />
          <Input
            ref={searchInputRef}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={searchPlaceholder}
            className="h-8 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
        <div
          ref={scrollContainerRef}
          className="max-h-[200px] overflow-y-auto p-1"
          onWheel={(e) => {
            e.stopPropagation();
          }}
          style={{ overscrollBehavior: "contain" }}
        >
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => handleSelect(option)}
                className={cn(
                  "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 px-2 text-sm outline-none",
                  "hover:bg-accent hover:text-accent-foreground",
                  "focus:bg-accent focus:text-accent-foreground",
                  value === option && "bg-accent text-accent-foreground"
                )}
              >
                {option}
              </button>
            ))
          ) : (
            <div className="px-2 py-1.5 text-sm text-muted-foreground text-center">
              Aucun résultat
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}

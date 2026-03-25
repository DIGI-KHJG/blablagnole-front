"use client";

import { Input } from "@/components/ui/input";
import {
  searchIgnAddresses,
  ignResultToAddressWithCoords,
  geocodeIgnByText,
  type IgnCompletionItem,
  type AddressWithCoords,
} from "@/lib/geocoding/ign";
import { cn } from "@/lib/utils";
import { Loader2Icon, MapPinIcon } from "lucide-react";
import { useCallback, useEffect, useId, useRef, useState } from "react";

export interface AddressAutocompleteResult {
  address: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  coords: { lat: number; lon: number };
}

/** Formate une adresse en une seule ligne pour l’affichage des suggestions (rue, code postal ville, pays). */
function formatSuggestionLabel(a: AddressWithCoords): string {
  const street = (a.street !== "—" ? a.street : "").replace(/,\s*$/, "").trim();
  const postalCity = [a.postalCode, a.city].filter(Boolean).join(" ");
  const parts = [street, postalCity, a.country].filter(Boolean);
  return parts.join(", ");
}

const DEBOUNCE_MS = 300;

export interface InputAddressAutocompleteProps {
  onSelect: (result: AddressAutocompleteResult) => void;
  /** Texte affiché quand une adresse est déjà sélectionnée (reste visible après sélection). */
  value?: string;
  placeholder?: string;
  id?: string;
  className?: string;
  "aria-invalid"?: boolean;
  "aria-labelledby"?: string;
  disabled?: boolean;
}

export function InputAddressAutocomplete({
  onSelect,
  value: selectedLabel,
  placeholder = "Rechercher une adresse...",
  id: idProp,
  className,
  "aria-invalid": ariaInvalid,
  "aria-labelledby": ariaLabelledBy,
  disabled,
}: InputAddressAutocompleteProps) {
  const id = useId();
  const inputId = idProp ?? id;
  const [query, setQuery] = useState("");
  const displayValue = query !== "" ? query : (selectedLabel ?? "");
  const [suggestions, setSuggestions] = useState<IgnCompletionItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const runSearch = useCallback(async (q: string) => {
    if (q.length < 2) {
      setSuggestions([]);
      return;
    }
    setLoading(true);
    try {
      const results = await searchIgnAddresses(q, { limit: 5 });
      setSuggestions(results);
      setHighlightIndex(-1);
    } catch {
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!query.trim()) {
      setSuggestions([]);
      setOpen(false);
      return;
    }
    debounceRef.current = setTimeout(() => {
      runSearch(query);
      setOpen(true);
    }, DEBOUNCE_MS);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, runSearch]);

  const handleSelect = useCallback(
    async (item: IgnCompletionItem) => {
      const fromSearch = await geocodeIgnByText(item.fulltext);
      const { street, city, postalCode, country, lat, lon } =
        fromSearch ?? ignResultToAddressWithCoords(item);
      onSelect({
        address: { street, city, postalCode, country },
        coords: { lat, lon },
      });
      setQuery(""); // le parent met à jour `value`, l’input affichera l’adresse sélectionnée
      setSuggestions([]);
      setOpen(false);
    },
    [onSelect],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!open || suggestions.length === 0) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setHighlightIndex((i) => (i < suggestions.length - 1 ? i + 1 : i));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setHighlightIndex((i) => (i > 0 ? i - 1 : -1));
      } else if (
        e.key === "Enter" &&
        highlightIndex >= 0 &&
        suggestions[highlightIndex]
      ) {
        e.preventDefault();
        void handleSelect(suggestions[highlightIndex]);
      } else if (e.key === "Escape") {
        setOpen(false);
        setHighlightIndex(-1);
      }
    },
    [open, suggestions, highlightIndex, handleSelect],
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <div className="relative">
        <MapPinIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
        <Input
          id={inputId}
          type="text"
          value={displayValue}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => displayValue.length >= 2 && setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          aria-invalid={ariaInvalid}
          aria-labelledby={ariaLabelledBy}
          aria-autocomplete="list"
          aria-expanded={open && suggestions.length > 0}
          aria-controls={open ? `${inputId}-listbox` : undefined}
          disabled={disabled}
          autoComplete="off"
          className="pl-9"
        />
        {loading && (
          <Loader2Icon className="absolute right-3 top-1/2 size-4 -translate-y-1/2 animate-spin text-muted-foreground pointer-events-none" />
        )}
      </div>
      {open && (suggestions.length > 0 || loading) && (
        <ul
          id={`${inputId}-listbox`}
          role="listbox"
          className="absolute top-full left-0 right-0 z-50 mt-1 max-h-60 overflow-auto rounded-md border bg-popover py-1 shadow-md"
        >
          {suggestions.length === 0 && loading ? (
            <li className="px-3 py-2 text-sm text-muted-foreground flex items-center gap-2">
              <Loader2Icon className="size-4 animate-spin" />
              Recherche...
            </li>
          ) : (
            suggestions.map((item, index) => {
              const addr = ignResultToAddressWithCoords(item);
              const label = formatSuggestionLabel(addr);
              const isHighlighted = index === highlightIndex;
              return (
                <li
                  key={`${item.fulltext}-${index}`}
                  role="option"
                  aria-selected={isHighlighted}
                  className={cn(
                    "cursor-pointer px-3 py-2 text-sm outline-none",
                    isHighlighted
                      ? "bg-accent text-accent-foreground"
                      : "hover:bg-accent/50",
                  )}
                  onMouseEnter={() => setHighlightIndex(index)}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    void handleSelect(item);
                  }}
                >
                  {label}
                </li>
              );
            })
          )}
        </ul>
      )}
    </div>
  );
}

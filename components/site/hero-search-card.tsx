"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import InputDateTimePopover from "@/components/ui/input-date-time-popover";
import { FadeIn } from "@/components/ui/text-animations";
import { heroSearchSchema, HeroSearchSchema } from "@/features/search/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { MapPin, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";

export function HeroSearchCard() {
  const router = useRouter();

  const form = useForm<HeroSearchSchema>({
    resolver: zodResolver(heroSearchSchema),
    defaultValues: {
      departure: "",
      arrival: "",
      dateTime: undefined,
    },
  });

  const onSubmit = (data: HeroSearchSchema) => {
    const params = new URLSearchParams();
    if (data.departure.trim()) params.set("departure", data.departure.trim());
    if (data.arrival.trim()) params.set("arrival", data.arrival.trim());
    if (data.dateTime) params.set("dateTime", data.dateTime.toISOString());
    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="absolute bottom-44 left-0 right-0 z-20 flex justify-center px-4 sm:px-6 lg:px-8">
      <FadeIn delay={0.3}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="translate-y-1/2 rounded-2xl border border-border/80 bg-background p-4 shadow-xl sm:p-5 w-80 sm:w-150 md:w-200 lg:w-250"
        >
          <p className="mb-5 text-lg font-semibold tracking-wide text-foreground sm:mb-6">
            Où allez-vous ?
          </p>
          <FieldGroup>
            <div className="grid gap-6 md:grid-cols-2 md:gap-8">
              <div className="flex flex-1 items-stretch gap-5">
                <div
                  className="flex w-10 shrink-0 flex-col items-center justify-between py-1"
                  aria-hidden
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                    <MapPin className="h-4 w-4" />
                  </span>
                  <div className="flex min-h-4 flex-1 justify-center w-full">
                    <div className="w-1 border-l-2 border-dashed border-border/80 h-full" />
                  </div>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                    <MapPin className="h-4 w-4" />
                  </span>
                </div>
                <div className="flex flex-1 flex-col gap-5">
                  <Controller
                    control={form.control}
                    name="departure"
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="hero-departure">
                          Ville de départ
                        </FieldLabel>

                        <div className="h-10">
                          <Input
                            {...field}
                            id="hero-departure"
                            placeholder="Montpellier"
                            className="h-full flex-1 focus-visible:ring-2"
                            aria-label="Ville de départ"
                            aria-invalid={fieldState.invalid}
                          />

                          {/* {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )} */}
                        </div>
                      </Field>
                    )}
                  />

                  <Controller
                    control={form.control}
                    name="arrival"
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="hero-arrival">
                          Ville d&apos;arrivée
                        </FieldLabel>

                        <div className="h-10">
                          <Input
                            {...field}
                            id="hero-arrival"
                            placeholder="Paris"
                            className="h-full flex-1 focus-visible:ring-2"
                            aria-label="Ville d'arrivée"
                            aria-invalid={fieldState.invalid}
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </div>
                      </Field>
                    )}
                  />
                </div>
              </div>

              <div className="flex flex-1 flex-col justify-end gap-3">
                <Controller
                  control={form.control}
                  name="dateTime"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="hero-date-time">
                        Date et heure
                      </FieldLabel>
                      <InputDateTimePopover
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Sélectionnez la date et heure de départ"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              className=" w-full justify-center focus-visible:ring-2"
              aria-label="Lancer la recherche"
            >
              <Search className="mr-2 h-4 w-4 shrink-0" />
              Rechercher
            </Button>
          </FieldGroup>
        </form>
      </FadeIn>
    </div>
  );
}

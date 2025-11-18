"use client";

import { Button } from "@/components/ui/button";
import SelectCarCard from "@/components/ui/select-car-card";
import { Car } from "@/types/car";
import Link from "next/link";
import { useId } from "react";
import { LuCar } from "react-icons/lu";

interface InputCarSelectProps {
  cars: Car[];
  id?: string;
  value?: number;
  onChange?: (carId: number) => void;
  onBlur?: () => void;
  "aria-labelledby"?: string;
  "aria-invalid"?: boolean;
}

export default function InputCarSelect({
  cars,
  id,
  value,
  onChange,
  onBlur,
  "aria-labelledby": ariaLabelledBy,
}: InputCarSelectProps) {
  const generatedId = useId();
  const fieldId = id || generatedId;
  const labelId = ariaLabelledBy || `${fieldId}-label`;

  const handleCarClick = (car: Car) => {
    if (car.id && onChange) {
      onChange(car.id);
    }
    if (onBlur) {
      onBlur();
    }
  };

  if (!cars || cars.length === 0) {
    return (
      <div
        className="w-full border-border border rounded-md"
        id={fieldId}
        role="group"
        aria-labelledby={labelId}
      >
        <div className="flex flex-col items-center justify-center gap-4 p-8 text-center">
          <LuCar className="w-12 h-12 text-muted-foreground mb-3 opacity-50" />
          <p className="text-sm text-muted-foreground">
            Commencer par ajouter une vehicule sur votre profile
          </p>
          <Button asChild variant="default">
            <Link href="/dashboard/profile">Mon profile</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full" id={fieldId} role="group" aria-labelledby={labelId}>
      <div className="max-h-[480px] overflow-y-auto px-2">
        <div className="flex flex-col gap-4">
          {cars.map((car) => {
            const isSelected =
              value !== undefined &&
              value !== null &&
              car.id !== undefined &&
              Number(value) === Number(car.id) &&
              Number(value) > 0;
            return (
              <SelectCarCard
                key={car.id}
                car={car}
                isSelected={isSelected}
                onClick={() => handleCarClick(car)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

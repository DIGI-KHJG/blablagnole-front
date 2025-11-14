"use client";

import SelectCarCard from "@/features/car/ui/select-car-card";
import { Car } from "@/types/car";
import { useId, useState } from "react";

interface InputCarSelectProps {
  cars: Car[];
  id?: string;
  "aria-labelledby"?: string;
  "aria-invalid"?: boolean;
}

export default function InputCarSelect({
  cars,
  id,
  "aria-labelledby": ariaLabelledBy,
}: InputCarSelectProps) {
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const generatedId = useId();
  const fieldId = id || generatedId;
  const labelId = ariaLabelledBy || `${fieldId}-label`;

  return (
    <div className="w-full" id={fieldId} role="group" aria-labelledby={labelId}>
      <div className="max-h-[480px] overflow-y-auto px-2">
        <div className="flex flex-col gap-4">
          {cars.map((car) => (
            <SelectCarCard
              key={car.id}
              car={car}
              isSelected={selectedCar?.id === car.id}
              onClick={() => setSelectedCar(car)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

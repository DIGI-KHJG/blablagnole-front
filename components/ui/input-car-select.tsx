"use client";

import CarCard from "@/features/company-car/ui/car-card";
import { useId, useState } from "react";

const CARS = [
  {
    id: 1,
    brand: "Tesla",
    model: "Model 3",
    year: 2024,
    color: "Noir",
    plate: "AB-123-CD",
    seats: 5,
    type: "Berline",
    motorization: "Électrique",
    image: "/tesla-model-3-noir.jpg",
  },
  {
    id: 2,
    brand: "BMW",
    model: "X5",
    year: 2023,
    color: "Blanc",
    plate: "EF-456-GH",
    seats: 7,
    type: "SUV",
    motorization: "Diesel",
    image: "/bmw-x5-blanc-suv.jpg",
  },
  {
    id: 3,
    brand: "Peugeot",
    model: "308",
    year: 2024,
    color: "Gris",
    plate: "IJ-789-KL",
    seats: 5,
    type: "Berline",
    motorization: "Essence",
    image: "/peugeot-308-gris.jpg",
  },
  {
    id: 4,
    brand: "Audi",
    model: "Q7",
    year: 2023,
    color: "Bleu",
    plate: "MN-012-OP",
    seats: 7,
    type: "SUV",
    motorization: "Diesel",
    image: "/audi-q7-bleu-suv.jpg",
  },
  {
    id: 5,
    brand: "Renault",
    model: "Clio",
    year: 2024,
    color: "Rouge",
    plate: "QR-345-ST",
    seats: 5,
    type: "Berline",
    motorization: "Essence",
    image: "/renault-clio-rouge.jpg",
  },
  {
    id: 6,
    brand: "Mercedes",
    model: "GLE",
    year: 2023,
    color: "Noir",
    plate: "UV-678-WX",
    seats: 5,
    type: "SUV",
    motorization: "Essence",
    image: "/mercedes-gle-noir-suv.jpg",
  },
];

interface InputCarSelectProps {
  id?: string;
  "aria-labelledby"?: string;
  "aria-invalid"?: boolean;
}

export default function InputCarSelect({
  id,
  "aria-labelledby": ariaLabelledBy,
}: InputCarSelectProps) {
  const [selectedCar, setSelectedCar] = useState<(typeof CARS)[0] | null>(null);
  const generatedId = useId();
  const fieldId = id || generatedId;
  const labelId = ariaLabelledBy || `${fieldId}-label`;

  return (
    <div className="w-full" id={fieldId} role="group" aria-labelledby={labelId}>
      <div className="max-h-[480px] overflow-y-auto px-2">
        <div className="flex flex-col gap-4">
          {CARS.map((car) => (
            <CarCard
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

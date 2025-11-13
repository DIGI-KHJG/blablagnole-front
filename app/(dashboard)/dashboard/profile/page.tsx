"use client";

import { Button } from "@/components/ui/button";
import { useCurrentUserQuery } from "@/features/auth/hooks";
import CarFormDialog from "@/features/company-car/ui/car-form-dialog";
import { ProfileHeader } from "@/features/profile/ui/profile-header";
import { useState } from "react";
import { LuCar, LuPlus } from "react-icons/lu";

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

export default function ProfilePage() {
  const { data: user } = useCurrentUserQuery();
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-8 h-[88vh]">
      <div className="md:col-span-3 border border-border rounded-lg p-4">
        <ProfileHeader user={user ?? null} />
      </div>

      <div className="md:col-span-2 bg-primary/5 rounded-lg p-4">
        <div className="sticky top-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <LuCar className="w-6 h-6 text-blue-500" />
              Ma Voiture
            </h2>
            <Button onClick={() => setIsFormDialogOpen(true)}>
              <LuPlus className="w-4 h-4" /> Ajouter une voiture
            </Button>
          </div>
        </div>
      </div>

      <CarFormDialog
        isOpen={isFormDialogOpen}
        onClose={() => setIsFormDialogOpen(false)}
      />
    </div>
  );
}

"use client";
import DashboardPageTitle from "@/components/shared/dashboard-page-title";
import CarFormDialog from "@/features/company-car/ui/car-form-dialog";

import { useState } from "react";
import { FaTruck } from "react-icons/fa";

export default function ParcDeVehicules() {
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  return (
    <>
      <DashboardPageTitle
        title="Parc de véhicules"
        description="Gérez le parc de véhicules de l'entreprise"
        icon={FaTruck}
        buttonText="Ajouter un véhicule"
        onButtonClick={() => setIsFormDialogOpen(true)}
      ></DashboardPageTitle>
      <CarFormDialog
        isOpen={isFormDialogOpen}
        onClose={() => setIsFormDialogOpen(false)}
      />
    </>
  );
}

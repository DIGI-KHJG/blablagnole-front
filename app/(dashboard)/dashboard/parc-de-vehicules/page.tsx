"use client";
import DashboardPageTitle from "@/components/shared/dashboard-page-title";

import { FaTruck } from "react-icons/fa";
import { useState } from "react";
import CompanyCarFormDialog from "@/features/company-car/company-car-form-dialog";

export default function ParcDeVehicules() {
    const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  return (
    <>
    <DashboardPageTitle
      title="Parc de véhicules"
      description="Gérez le parc de véhicules de l'entreprise"
      icon={FaTruck}
      buttonText="Ajouter un véhicule"
    ></DashboardPageTitle>
    <CompanyCarFormDialog  isOpen={isFormDialogOpen}
        onClose={() => setIsFormDialogOpen(false)}/>
  </>);
}

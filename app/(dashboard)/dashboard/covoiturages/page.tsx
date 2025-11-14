"use client";

import DashboardPageTitle from "@/components/shared/dashboard-page-title";
import CarpoolFormDialog from "@/features/carpool/ui/carpool-form-dialog";
import { useState } from "react";
import { IoCarSport } from "react-icons/io5";

export default function Covoiturages() {
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);

  return (
    <>
      <DashboardPageTitle
        title="Covoiturages"
        description="Gérez mes covoiturages"
        icon={IoCarSport}
        buttonText="Publier un covoiturage"
        onButtonClick={() => setIsFormDialogOpen(true)}
      ></DashboardPageTitle>
      <CarpoolFormDialog
        isOpen={isFormDialogOpen}
        onClose={() => setIsFormDialogOpen(false)}
      />
    </>
  );
}

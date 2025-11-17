"use client";
import DashboardPageTitle from "@/components/shared/dashboard-page-title";
import CarpoolFormDialog from "@/features/carpool/ui/carpool-form-dialog";
import { useState } from "react";
import { PiCardsFill } from "react-icons/pi";

export default function MesAnnonces() {
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  return (
    <>
      <DashboardPageTitle
        title="Mes annonces"
        description="Gérez mes annonces de covoiturage"
        icon={PiCardsFill}
        buttonText="Publier une annonce"
        onButtonClick={() => setIsFormDialogOpen(true)}
      ></DashboardPageTitle>
      <CarpoolFormDialog
        isOpen={isFormDialogOpen}
        onClose={() => setIsFormDialogOpen(false)}
      />
    </>
  );
}

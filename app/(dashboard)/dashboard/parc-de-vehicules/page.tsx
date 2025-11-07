import DashboardPageTitle from "@/components/shared/dashboard-page-title";
import { FaTruck } from "react-icons/fa";

export default function ParcDeVehicules() {
  return (
    <DashboardPageTitle
      title="Parc de véhicules"
      description="Gérez le parc de véhicules de l'entreprise"
      icon={FaTruck}
      buttonText="Ajouter un véhicule"
    ></DashboardPageTitle>
  );
}

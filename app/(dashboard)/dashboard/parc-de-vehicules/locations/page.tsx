import DashboardPageTitle from "@/components/shared/dashboard-page-title";
import { FaTruck } from "react-icons/fa";

export default function ParcDeVehiculesLocations() {
  return (
    <>
      <DashboardPageTitle
        title="Toutes les locations"
        description="Gérez toutes les locations des véhicules de l'entreprise"
        icon={FaTruck}
      ></DashboardPageTitle>
    </>
  );
}

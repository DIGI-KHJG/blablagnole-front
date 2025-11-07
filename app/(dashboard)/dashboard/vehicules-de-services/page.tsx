import DashboardPageTitle from "@/components/shared/dashboard-page-title";
import { FaCar } from "react-icons/fa";

export default function VehiculesDeServices() {
  return (
    <DashboardPageTitle
      title="Véhicules de services"
      description="Gérez mes locations de véhicules de services"
      icon={FaCar}
    ></DashboardPageTitle>
  );
}

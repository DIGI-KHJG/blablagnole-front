import DashboardPageTitle from "@/components/shared/dashboard-page-title";
import { FaCalendarAlt } from "react-icons/fa";

export default function MesReservations() {
  return (
    <>
      <DashboardPageTitle
        title="Mes réservations"
        description="Gérez mes réservations de covoiturage"
        icon={FaCalendarAlt}
      ></DashboardPageTitle>
    </>
  );
}

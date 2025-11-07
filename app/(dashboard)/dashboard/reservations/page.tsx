import DashboardPageTitle from "@/components/shared/dashboard-page-title";
import { FaCalendarDays } from "react-icons/fa6";

export default function Reservations() {
  return (
    <DashboardPageTitle
      title="Réservations"
      description="Gérez mes réservations"
      icon={FaCalendarDays}
    ></DashboardPageTitle>
  );
}

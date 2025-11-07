"use client";

import DashboardPageTitle from "@/components/shared/dashboard-page-title";
import { FaUsers } from "react-icons/fa";

export default function Collaborateurs() {
  return (
    <>
      <DashboardPageTitle
        title="Collaborateurs"
        description="Gérez les collaborateurs de l'entreprise"
        icon={FaUsers}
      ></DashboardPageTitle>
    </>
  );
}

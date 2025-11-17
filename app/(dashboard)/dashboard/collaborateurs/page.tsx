"use client";
import DashboardPageTitle from "@/components/shared/dashboard-page-title";
import { useGetUsers } from "@/features/user/hooks";
import { columns } from "@/features/user/ui/columns";
import { DataTable } from "@/features/user/ui/data-table";
import { FaUsers } from "react-icons/fa";

export default function Collaborateurs() {
  const { data: users } = useGetUsers();
  console.log("users", users);

  return (
    <>
      <DashboardPageTitle
        title="Collaborateurs"
        description="Gérez les collaborateurs de l'entreprise"
        icon={FaUsers}
      ></DashboardPageTitle>
      <DataTable data={users ?? []} columns={columns} />
    </>
  );
}

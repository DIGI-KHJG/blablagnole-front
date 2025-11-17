"use client";
import DashboardPageTitle from "@/components/shared/dashboard-page-title";
import { useGetUsers } from "@/features/user/hooks";
import { columns } from "@/features/user/ui/columns";
import { UsersDataTable } from "@/features/user/ui/users-data-table";
import { UsersDataTableSkeleton } from "@/features/user/ui/users-data-table-skeleton";
import { User } from "@/types/user";
import { ColumnDef } from "@tanstack/react-table";
import { FaUsers } from "react-icons/fa";

export default function Collaborateurs() {
  const { data: users, isLoading } = useGetUsers();

  return (
    <>
      <DashboardPageTitle
        title="Collaborateurs"
        description="Gérez les collaborateurs de l'entreprise"
        icon={FaUsers}
      ></DashboardPageTitle>
      {isLoading ? (
        <UsersDataTableSkeleton />
      ) : (
        <UsersDataTable
          data={users ?? []}
          columns={columns as ColumnDef<User>[]}
        />
      )}
    </>
  );
}

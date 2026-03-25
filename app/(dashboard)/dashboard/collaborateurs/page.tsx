"use client";

import DashboardPageTitle from "@/components/shared/dashboard-page-title";
import DashboardRoleTabs, {
  type RoleTabValue,
} from "@/components/shared/dashboard-role-tabs";
import { EmptyState } from "@/components/ui/empty-state";
import { useGetUsers } from "@/features/user/hooks";
import { columns } from "@/features/user/ui/columns";
import { UsersDataTable } from "@/features/user/ui/users-data-table";
import { UsersDataTableSkeleton } from "@/features/user/ui/users-data-table-skeleton";
import { User } from "@/types/user";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { FaUsers } from "react-icons/fa";

function filterUsersByRole(
  users: User[] | undefined,
  tab: RoleTabValue
): User[] {
  if (!users) return [];
  if (tab === "all") return users;
  if (tab === "admin") return users.filter((u) => u.role === "ADMIN");
  return users.filter((u) => u.role === "COLLABORATOR");
}

export default function Collaborateurs() {
  const [roleTab, setRoleTab] = useState<RoleTabValue>("all");
  const { data: users, isLoading } = useGetUsers();

  const filteredUsers = useMemo(
    () => filterUsersByRole(users, roleTab),
    [users, roleTab]
  );

  return (
    <>
      <DashboardPageTitle
        title="Collaborateurs"
        description="Gérez les collaborateurs de l'entreprise"
        icon={FaUsers}
      >
        <DashboardRoleTabs
          value={roleTab}
          onValueChange={setRoleTab}
        />
      </DashboardPageTitle>
      {isLoading ? (
        <UsersDataTableSkeleton />
      ) : filteredUsers.length > 0 ? (
        <UsersDataTable
          data={filteredUsers}
          columns={columns as ColumnDef<User>[]}
        />
      ) : (
        <EmptyState
          icon={FaUsers}
          title={
            <>
              {roleTab === "all" && "Aucun collaborateur"}
              {roleTab === "admin" && "Aucun administrateur"}
              {roleTab === "collaborator" && "Aucun collaborateur"}
            </>
          }
          description={
            <>
              {roleTab === "all" &&
                "Aucun collaborateur n'est enregistré pour le moment."}
              {roleTab === "admin" &&
                "Les comptes administration apparaîtront ici."}
              {roleTab === "collaborator" &&
                "Les comptes collaborateurs apparaîtront ici."}
            </>
          }
        />
      )}
    </>
  );
}

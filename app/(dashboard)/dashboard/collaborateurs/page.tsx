"use client";
import { useEffect, useState } from "react";
import DashboardPageTitle from "@/components/shared/dashboard-page-title";
import { FaUsers } from "react-icons/fa";
import { DataTable } from "@/features/user/ui/data-table";
import { columns, Collaborateur } from "@/features/user/ui/columns";
import { useGetUsers } from "@/features/user/hooks";


export default function Collaborateurs() {

const{data:users}=useGetUsers();
console.log("users",users);



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

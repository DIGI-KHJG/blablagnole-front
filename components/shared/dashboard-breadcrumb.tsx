"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type IconType } from "react-icons";
import { FaCar, FaHome, FaUser, FaUsers } from "react-icons/fa";
import { FaCalendarDays } from "react-icons/fa6";
import { IoCarSport } from "react-icons/io5";

const routeConfig: Record<string, { label: string; icon: IconType }> = {
  "/dashboard": {
    label: "Accueil",
    icon: FaHome,
  },
  "/dashboard/collaborateurs": {
    label: "Collaborateurs",
    icon: FaUsers,
  },
  "/dashboard/covoiturages": {
    label: "Covoiturages",
    icon: IoCarSport,
  },
  "/dashboard/reservations": {
    label: "Reservations",
    icon: FaCalendarDays,
  },
  "/dashboard/vehicules": {
    label: "Véhicules",
    icon: FaCar,
  },
  "/dashboard/profile": {
    label: "Profil",
    icon: FaUser,
  },
};

export function DashboardBreadcrumb() {
  const pathname = usePathname();
  const isHomePage = pathname === "/dashboard";

  const currentConfig = routeConfig[pathname] || {
    label: "Page",
    icon: FaHome,
  };
  const CurrentIcon = currentConfig.icon;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink
            asChild
            className={cn(
              "flex items-center gap-1.5",
              isHomePage && "font-medium text-primary"
            )}
          >
            <Link href="/dashboard">
              <FaHome className="h-4 w-4" />
              <span>Accueil</span>
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {!isHomePage && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink
                asChild
                className="flex items-center gap-1.5 font-medium text-primary"
              >
                <Link href={pathname}>
                  <CurrentIcon className="h-4 w-4" />
                  <span>{currentConfig.label}</span>
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

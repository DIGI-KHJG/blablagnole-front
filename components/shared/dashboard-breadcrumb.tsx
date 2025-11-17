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
import {
  FaAddressCard,
  FaCalendarAlt,
  FaCar,
  FaHome,
  FaTruck,
  FaUser,
  FaUsers,
} from "react-icons/fa";
import { FaCalendarDays } from "react-icons/fa6";
import { IoCarSport } from "react-icons/io5";
import { MdOutlinePayments } from "react-icons/md";
import { PiCardsFill } from "react-icons/pi";

const nonClickableRoutes = [
  "/dashboard/covoiturages",
  "/dashboard/vehicules-de-services",
];

const routeConfig: Record<
  string,
  { label: string; icon: IconType; clickable?: boolean }
> = {
  "/dashboard": {
    label: "Accueil",
    icon: FaHome,
    clickable: true,
  },
  "/dashboard/collaborateurs": {
    label: "Collaborateurs",
    icon: FaUsers,
    clickable: true,
  },
  "/dashboard/covoiturages": {
    label: "Covoiturages",
    icon: IoCarSport,
    clickable: false,
  },
  "/dashboard/covoiturages/mes-annonces": {
    label: "Mes annonces",
    icon: PiCardsFill,
    clickable: true,
  },
  "/dashboard/covoiturages/mes-reservations": {
    label: "Mes réservations",
    icon: FaCalendarAlt,
    clickable: true,
  },
  "/dashboard/reservations": {
    label: "Reservations",
    icon: FaCalendarDays,
    clickable: true,
  },
  "/dashboard/vehicules-de-services": {
    label: "Véhicules de services",
    icon: FaCar,
    clickable: false,
  },
  "/dashboard/vehicules-de-services/location": {
    label: "Location",
    icon: MdOutlinePayments,
    clickable: true,
  },
  "/dashboard/vehicules-de-services/mes-locations": {
    label: "Mes Locations",
    icon: FaAddressCard,
    clickable: true,
  },
  "/dashboard/parc-de-vehicules": {
    label: "Parc de véhicules",
    icon: FaTruck,
    clickable: true,
  },
  "/dashboard/parc-de-vehicules/vehicules": {
    label: "Véhicules",
    icon: FaCar,
    clickable: true,
  },
  "/dashboard/parc-de-vehicules/locations": {
    label: "Locations",
    icon: FaAddressCard,
    clickable: true,
  },
  "/dashboard/profile": {
    label: "Profil",
    icon: FaUser,
    clickable: true,
  },
};

function buildBreadcrumbItems(pathname: string) {
  const items: Array<{
    path: string;
    label: string;
    icon: IconType;
    clickable: boolean;
  }> = [];

  items.push({
    path: "/dashboard",
    label: "Accueil",
    icon: FaHome,
    clickable: true,
  });

  if (pathname === "/dashboard") {
    return items;
  }

  const segments = pathname.split("/").filter(Boolean);
  let currentPath = "/dashboard";

  for (let i = 1; i < segments.length; i++) {
    currentPath += `/${segments[i]}`;
    const config = routeConfig[currentPath];

    if (config) {
      items.push({
        path: currentPath,
        label: config.label,
        icon: config.icon,
        clickable:
          config.clickable !== false &&
          !nonClickableRoutes.includes(currentPath),
      });
    }
  }

  return items;
}

export function DashboardBreadcrumb() {
  const pathname = usePathname();
  const breadcrumbItems = buildBreadcrumbItems(pathname);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbItems.map((item, index) => {
          const isLast = index === breadcrumbItems.length - 1;

          return (
            <div key={`${item.path}-${index}`} className="flex items-center">
              {index > 0 && (
                <>
                  <BreadcrumbSeparator />
                  <span className="mx-2" />
                </>
              )}
              <BreadcrumbItem>
                {item.clickable && !isLast ? (
                  <BreadcrumbLink
                    asChild
                    className="flex items-center gap-1.5 hover:text-primary transition-colors"
                  >
                    <Link href={item.path}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Link>
                  </BreadcrumbLink>
                ) : (
                  <div
                    className={cn(
                      "flex items-center gap-1.5",
                      isLast && "font-medium text-primary",
                      !item.clickable && "cursor-default"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </div>
                )}
              </BreadcrumbItem>
            </div>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

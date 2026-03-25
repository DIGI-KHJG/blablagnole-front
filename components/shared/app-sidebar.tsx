"use client";

import * as React from "react";

import { NavMain } from "@/components/shared/nav-main";
import { NavUser } from "@/components/shared/nav-user";
import { BlablagnoleLogo } from "@/components/ui/blablagnole-logo";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { FaCar, FaTruck, FaUsers } from "react-icons/fa";
import { IoCarSport } from "react-icons/io5";

import { useGetCurrentUser } from "@/features/auth/hooks";

const data = {
  navLinks: [
    // {
    //   title: "Accueil",
    //   url: "/dashboard",
    //   icon: FaHome,
    // },
    {
      title: "Co-voiturage",
      icon: IoCarSport,
      items: [
        {
          title: "Liste des covoiturages",
          url: "/dashboard/covoiturages",
        },
        {
          title: "Mes annonces",
          url: "/dashboard/covoiturages/mes-annonces",
        },
        {
          title: "Mes réservations",
          url: "/dashboard/covoiturages/mes-reservations",
        },
      ],
    },

    {
      title: "Véhicules de services",
      icon: FaCar,
      items: [
        {
          title: "Mes Locations",
          url: "/dashboard/vehicules-de-services/mes-locations",
        },
      ],
    },
    {
      title: "Collaborateurs",
      url: "/dashboard/collaborateurs",
      icon: FaUsers,
    },
    {
      title: "Parc de véhicules",
      icon: FaTruck,
      items: [
        {
          title: "Liste des véhicules",
          url: "/dashboard/parc-de-vehicules/vehicules",
        },
        {
          title: "Toutes les locations",
          url: "/dashboard/parc-de-vehicules/locations",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: currentUser } = useGetCurrentUser();

  const isAdmin = currentUser?.role === "ADMIN";

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="w-full hover:bg-transparent"
              asChild
            >
              <BlablagnoleLogo className="mx-auto h-full w-4/6" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain
          items={
            isAdmin
              ? data.navLinks
              : data.navLinks
                  .filter(
                    (item) =>
                      item.title !== "Parc de véhicules" &&
                      item.title !== "Collaborateurs",
                  )
                  .map((item) => {
                    if (item.title === "Co-voiturage" && item.items) {
                      return {
                        ...item,
                        items: item.items.filter(
                          (sub) => sub.title !== "Liste des covoiturages",
                        ),
                      };
                    }
                    return item;
                  })
          }
        />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={currentUser ?? null} />
      </SidebarFooter>
    </Sidebar>
  );
}

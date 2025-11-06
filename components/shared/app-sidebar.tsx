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
import { FaHome, FaUsers } from "react-icons/fa";
import { FaCalendarDays } from "react-icons/fa6";
import { IoCarSport } from "react-icons/io5";

import { useCurrentUserQuery } from "@/features/auth/hooks";

const data = {
  navLinks: [
    {
      title: "Accueil",
      url: "/dashboard",
      icon: FaHome,
    },

    {
      title: "Co-voiturages",
      url: "/dashboard/covoiturages",
      icon: IoCarSport,
    },
    {
      title: "Réservations",
      url: "/dashboard/reservations",
      icon: FaCalendarDays,
    },
    {
      title: "Collaborateurs",
      url: "/dashboard/collaborateurs",
      icon: FaUsers,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: user } = useCurrentUserQuery();

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
        <NavMain items={data.navLinks} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user ?? null} />
      </SidebarFooter>
    </Sidebar>
  );
}

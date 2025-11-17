"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { type IconType } from "react-icons";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

type NavItem = {
  title: string;
  icon: IconType;
  url?: string;
  items?: {
    title: string;
    url: string;
  }[];
};

function NavItemWithDropdown({
  item,
  pathname,
}: {
  item: NavItem;
  pathname: string;
}) {
  const isAnySubItemActive = item.items?.some(
    (subItem) => pathname === subItem.url
  );
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} asChild>
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton tooltip={item.title} isActive={isAnySubItemActive}>
            <item.icon />
            <span>{item.title}</span>
            <ChevronRight
              className={`ml-auto transition-transform duration-200 ${
                isOpen ? "rotate-90" : ""
              }`}
            />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {item.items?.map((subItem) => {
              const isSubItemActive = pathname === subItem.url;
              return (
                <SidebarMenuSubItem key={subItem.title}>
                  <SidebarMenuSubButton asChild isActive={isSubItemActive}>
                    <Link href={subItem.url}>
                      <span>{subItem.title}</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              );
            })}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
}

export function NavMain({ items }: { items: NavItem[] }) {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarMenu className="gap-2">
        {items.map((item) => {
          // Si l'item a des sous-items, c'est un menu déroulant
          if (item.items && item.items.length > 0) {
            return (
              <NavItemWithDropdown
                key={item.title}
                item={item}
                pathname={pathname}
              />
            );
          }

          // Sinon, c'est un lien simple
          const isActive = pathname === item.url;
          return (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                tooltip={item.title}
                isActive={isActive}
              >
                <Link
                  className={isActive ? "text-primary" : ""}
                  href={item.url!}
                >
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}

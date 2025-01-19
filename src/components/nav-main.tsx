"use client";

import { CreditCard, Frame, Image, Images, Layers, Settings2, SquareTerminal } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

// This is sample data.
const newItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: SquareTerminal,
  },
  {
    title: "Gnereate Image",
    url: "/image-generation",
    icon: Image,
  },
  {
    title: "My Model",
    url: "/models",
    icon: Frame,
  },
  {
    title: "Train model",
    url: "/model-training",
    icon: Layers,
  },
  {
    title: "My images",
    url: "/gallery",
    icon: Images,
  },
  {
    title: "Billing",
    url: "/billing",
    icon: CreditCard,
  },
  {
    title: "Settings",
    url: "/account-settings",
    icon: Settings2,
  }
];

export function NavMain() {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {newItems.map((item) => (
          <Link href={item.url} key={item.title} className={cn("rounded-none", pathname === item.url ? "text-primary bg-primary/5" : "text-muted-foreground")}>
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton tooltip={item.title}>
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </Link>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}

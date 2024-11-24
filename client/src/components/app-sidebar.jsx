import * as React from "react"
import {
  History,
  Menu,
  Home,
  SquareActivity,
  Users
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "Amba",
    email: "amba@example.com",
    avatar: "https://github.com/shadcn.png",
  },
  navMain: [
    {
      title: "Menu",
      url: "/",
      icon: Menu,
      items: [
        {
          title: "Home",
          url: "/",
          icon: Home,
        },
      ],
    },
    {
      title: "Kesehatan",
      url: "#",
      icon: SquareActivity,
      items: [
        {
          title: "Riwayat Pemeriksaan",
          url: "/patient/dashboard/history",
          icon: History,
        },
        {
          title: "List Dokter",
          url: "/patient/dashboard/doctors",
          icon: Users,
        },
      ],
    },
  ],
}

export function AppSidebar({
  ...props
}) {
  return (
    (<Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavUser user={data.user} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>)
  );
}

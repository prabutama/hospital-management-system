import * as React from "react"
import {
  History,
  Menu,
  Home,
  SquareActivity,
  Users,
  ClipboardList,
  LayoutList
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
  navPatient: [
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
  navDoctor: [
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
          title: "Pengajuan Pemeriksaan",
          url: "#",
          icon: ClipboardList,
        },
        {
          title: "List Pemeriksaan",
          url: "/doctor/dashboard",
          icon: LayoutList,
        },
      ],
    },
  ],
}



export function AppSidebar({
  ...props
}) {
  const userRole = props.userRole
  return (
    (<Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavUser user={data.user} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={userRole === "doctor" ? data.navDoctor : data.navPatient} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>)
  );
}

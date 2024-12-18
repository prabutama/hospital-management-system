import * as React from "react"
import {
  History,
  Menu,
  Home,
  SquareActivity,
  Users,
  ClipboardList,
  LayoutList,
  UserRoundPlus
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"


export function AppSidebar({
  ...props
}) {
  const user = props.user
  const data = {
    user: {
      name: user?.name || "",
      email: user?.email || "",
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
          {
            title: "Pengajuan Pemeriksaan",
            url: "/patient/dashboard/consultations",
            icon: ClipboardList,
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
            url: "/doctor/dashboard/consultations",
            icon: History,
          },
          {
            title: "Riwayat Pemeriksaan",
            url: "/doctor/dashboard/history",
            icon: LayoutList,
          },
        ],
      },
    ],
    navStaff: [
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
            title: "Pengguna",
            url: "/staff/dashboard/users",
            icon: Users,
          },
          {
            title: "List Dokter",
            url: "/staff/dashboard/doctors",
            icon: LayoutList,
          },
          {
            title: "Tambahkan Dokter",
            url: "/staff/dashboard/add-doctor",
            icon: UserRoundPlus,
          },
          {
            title: "Pengajuan Pemeriksaan",
            url: "/staff/dashboard/consultations",
            icon: ClipboardList,
          },
          {
            title: "Riwayat Pemeriksaan",
            url: "/staff/dashboard/history",
            icon: History,
          },
        ],
      },
    ],
  }

  return (
    (<Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavUser user={data.user} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={user?.role === "doctor" ? data.navDoctor : user?.role === "staff" ? data.navStaff : data.navPatient} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>)
  );
}

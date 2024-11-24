import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { Navbar } from "@/components/Navbar"

export function Layout({ children, breadcrumbs = [], showNavbar = true, showSidebar = true }) {
    return (
        <div className="flex min-h-screen w-full">
            {/* Sidebar */}
            <div className="relative">
                {showSidebar && <AppSidebar />}
            </div>

            <div className="flex flex-col w-full">
                {showNavbar && <Navbar />}
                <div className="flex-1 p-6">{children}</div>
            </div>
        </div>
    );
}


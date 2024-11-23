import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"

export function Layout({ children, breadcrumbs = [] }) {
    return (
        <div className="flex min-h-screen">

            <AppSidebar />

            <div className="flex flex-1 flex-col">
                {/* Header */}
                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                    {/* <Separator orientation="vertical" className="mr-2 h-4" /> */}
                    {/* Breadcrumb */}
                    <Breadcrumb>
                        <BreadcrumbList>
                            {breadcrumbs.map((breadcrumb, index) => (
                                <BreadcrumbItem key={index}>
                                    {breadcrumb.isActive ? (
                                        <BreadcrumbPage>{breadcrumb.label}</BreadcrumbPage>
                                    ) : (
                                        <>
                                            <BreadcrumbLink href={breadcrumb.href}>
                                                {breadcrumb.label}
                                            </BreadcrumbLink>
                                            <BreadcrumbSeparator />
                                        </>
                                    )}
                                </BreadcrumbItem>
                            ))}
                        </BreadcrumbList>
                    </Breadcrumb>
                </header>

                {/* Page Content */}
                <div className="flex-1 p-6">{children}</div>
            </div>
        </div>
    )
}


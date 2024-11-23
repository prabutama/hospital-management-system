import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import { Login } from "@/pages/auth/Login";
import { Register } from "@/pages/auth/Register";
// import { DashboardDoctor } from "@/pages/dashboard/DoctorDashboard";
import { Patient } from "@/pages/dashboard/Patient";
// import { DashboardStaff } from "@/pages/dashboard/StaffDashboard";
import { Layout } from "@/pages/dashboard/Layout";
import { SidebarProvider } from "@/components/ui/sidebar";
const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/login",
        element: <Login />,

    },
    {
        path: "/register",
        element: <Register />,
    },
    // {
    //     path: "/doctor/dashboard",
    //     element: (
    //         <DashboardLayout userRole="doctor">
    //             <DashboardDoctor />
    //         </DashboardLayout>
    //     ),
    // },
    {
        path: "/patient/dashboard",
        element: (
            <SidebarProvider>
                <Layout userRole="patient">
                    <Patient />
                </Layout>
            </SidebarProvider>
        ),
    },
    // {
    //     path: "/staff/dashboard",
    //     element: (
    //         <DashboardLayout userRole="staff">
    //             <DashboardStaff />
    //         </DashboardLayout>
    //     ),
    // },
]);

export default router;

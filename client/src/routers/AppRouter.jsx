import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import { Login } from "@/pages/auth/Login";
import { Register } from "@/pages/auth/Register";
// import { DashboardDoctor } from "@/pages/dashboard/DoctorDashboard";
import { Patient } from "@/pages/dashboard/Patient";
// import { DashboardStaff } from "@/pages/dashboard/StaffDashboard";
import { Layout } from "@/pages/dashboard/Layout";
import PatientHistory from "@/pages/dashboard/PatientHistory";
import DoctorList from "@/pages/dashboard/DoctorList";
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
            <Layout userRole="patient" showNavbar={true} showSidebar={true}>
                <Patient />
            </Layout>
        ),
        children: [
            {
                path: "history",
                element: (
                    <PatientHistory />
                ),
            },
            {
                path: "doctors",
                element: (
                    <DoctorList />
                ),
            },
        ],
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

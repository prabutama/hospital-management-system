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
import { Doctor } from "@/pages/dashboard/Doctor";
import PrivateRoute from "./PrivateRoute";
import BlockedRoute from "./BlockedRoute";
const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/login",
        element: <BlockedRoute><Login /></BlockedRoute>,

    },
    {
        path: "/register",
        element: <BlockedRoute><Register /></BlockedRoute>,
    },
    {
        path: "/doctor/dashboard",
        element: (
            <PrivateRoute>
                <Layout userRole="doctor" showNavbar={true} showSidebar={true}>
                    <Doctor />
                </Layout>
            </PrivateRoute>
        ),
    },
    {
        path: "/patient/dashboard",
        element: (
            <PrivateRoute>
                <Layout userRole="patient" showNavbar={true} showSidebar={true}>
                    <Patient />
                </Layout>
            </PrivateRoute>
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

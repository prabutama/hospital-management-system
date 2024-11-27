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
import { Staff } from "@/pages/dashboard/Staff";
import AddDoctor from "@/pages/dashboard/AddDoctor";
import Consultations from "@/pages/dashboard/Consultations";
import User from "@/pages/dashboard/User";
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
        children: [
            {
                path: "consultations",
                element: (
                    <Consultations />
                ),
            },
            {
                path: "history",
                element: (
                    <PatientHistory />
                ),
            },
        ],
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
                    <DoctorList  />
                ),
            },
            {
                path: "consultations",
                element: (
                    <Consultations />
                ),
            }
        ],
    },
    {
        path: "/staff/dashboard",
        element: (
            <PrivateRoute>
                <Layout userRole="staff" showNavbar={true} showSidebar={true}>
                    <Staff />
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
            {
                path: "add-doctor",
                element: (
                    <AddDoctor />
                ),
            },
            {
                path: "consultations",
                element: (
                    <Consultations />
                ),
            },
            {
                path: "users",
                element: (
                    <User />
                ),
            }
        ],
    },
]);

export default router;

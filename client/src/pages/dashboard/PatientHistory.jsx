import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableBody, TableCell, TableHead } from "@/components/ui/table";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";

export default function PatientHistory() {
    const [appointments, setAppointments] = useState([]); // Ensure appointments are set here
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const { user } = useAuth();

    const fetchData = async () => {
        try {
            setLoading(true); // Correct use of setLoading
            const token = localStorage.getItem("token");

            if (!user?.id || !user?.role || !token) {
                throw new Error("User ID, role, or token is missing");
            }

            const endpoint =
                user.role === "doctor"
                    ? `http://localhost:3000/api/consultation/list-appointment/${user.id}`
                    : user.role === "patient"
                        ? `http://localhost:3000/api/consultation/list-appointment/patient/${user.id}`
                        : user.role === "staff"
                            ? `http://localhost:3000/api/consultation/list-appointment/`
                            : "";

            const response = await axios.get(endpoint, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log("API Response:", response.data);

            const mappedData = response.data.appointments.map((item) => {
                const date = new Date(item.date);
                const formattedDate = date.toLocaleString("id-ID", {
                    hour12: false,
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                });

                return {
                    id: item.consultation_id,
                    tanggalPengajuan: formattedDate,
                    namaPasien: user.role === "doctor" || user.role === "staff" ? item.pasien.name : "Anda",
                    namaDokter: user.role === "patient" ? item.doctor.name : user.role === "staff" ? item.dokter.name : "Anda",
                    keluhan: item.complaint,
                    status: item.status,
                    penyakit: item.response || "Belum ada diagnosa",
                };
            });

            const sortedData = mappedData.sort((a, b) => {
                const order = { accepted: 1, pending: 2, rejected: 3 };
                return order[a.status] - order[b.status];
            });

            setAppointments(sortedData); // Set appointments correctly
        } catch (error) {
            console.error("Fetch Error:", error);
            setError(error.response?.data?.message || error.message);
        } finally {
            setLoading(false); // End loading state
        }
    };

    useEffect(() => {
        fetchData();
    }, [user.id, user.role]);

    if (loading) {
        return <div>Loading...</div>; // Show a loading state
    }

    if (error) {
        return <div>Error: {error}</div>; // Show an error message
    }

    // Function to return the background color class based on the status
    const getRowBackgroundColor = (status) => {
        switch (status) {
            case "accepted":
                return "bg-green-100"; // Green background for accepted
            case "pending":
                return "bg-yellow-100"; // Yellow background for pending
            case "rejected":
                return "bg-red-100"; // Red background for rejected
            default:
                return ""; // Default background
        }
    };

    return (
        <Card className="shadow-md border">
            <h3 className="text-lg font-semibold p-4 border-b">Health History</h3>
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-gray-100">
                            <TableHead>Date</TableHead>
                            <TableHead>Patient's Name</TableHead>
                            <TableHead>Doctor's Name</TableHead>
                            <TableHead>Complaint</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Diagnosis Result</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {appointments.length > 0 ? (
                            appointments.map((appointment) => (
                                <TableRow
                                    key={appointment.id}
                                    className={getRowBackgroundColor(appointment.status)} // Apply background color based on status
                                >
                                    <TableCell>{appointment.tanggalPengajuan}</TableCell> {/* Use formatted date */}
                                    <TableCell>{appointment.namaPasien}</TableCell> {/* Patient's Name */}
                                    <TableCell>{appointment.namaDokter}</TableCell>
                                    <TableCell>{appointment.keluhan}</TableCell>
                                    <TableCell>{appointment.status}</TableCell> {/* Status */}
                                    <TableCell>{appointment.penyakit}</TableCell> {/* Diagnosis Result */}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan="6" className="text-center">
                                    No records found
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </Card>
    );
}

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";

export default function DoctorList() {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const user = useAuth();

    useEffect(() => {
        const fetchDoctors = async () => {
            const token = localStorage.getItem("token");
            try {
                const response = await axios.get("http://localhost:3000/api/consultation-schedule", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log("Data: ", response.data);
                setDoctors(response.data);
                setLoading(false);
            } catch (err) {
                setError("Failed to load doctor data. Please try again later.");
                setLoading(false);
            }
        };

        fetchDoctors();
    }, []);

    const handleConsultationRequest = (doctorId) => {
        alert(`Pengajuan konsultasi dengan dokter ID: ${doctorId}`);
    };

    if (loading) {
        return <p className="text-center text-gray-600">Loading doctors...</p>;
    }

    if (error) {
        return <p className="text-center text-red-600">{error}</p>;
    }

    const toCapitalCase = (name) => {
        return name
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(" ");
    };

    const formatTime = (time) => {
        const [hours, minutes] = time.split(":");
        return `${hours}:${minutes}`;
    };

    return (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {doctors.map((doctor) => (
                <Card key={doctor.dokter_id} className="shadow-lg rounded-lg border border-gray-200">
                    <CardHeader className="bg-gray-100 p-4 rounded-t-lg">
                        <CardTitle className="text-xl font-semibold text-gray-800">
                            Dr. {toCapitalCase(doctor.Doctor.name)}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                        <p className="text-sm text-gray-600">
                            <strong>Jadwal Konsultasi:</strong> {formatTime(doctor.start_time)} - {formatTime(doctor.end_time)}
                        </p>
                    </CardContent>
                    <CardFooter className="p-4">
                        {
                            user.role === "patient" ? (
                                <Button
                                    className="w-full bg-black text-white hover:bg-black"
                                    onClick={() => handleConsultationRequest(doctor.dokter_id)}
                                >
                                    Ajukan Konsultasi
                                </Button>
                            ) : (
                                <Button
                                    className="w-full bg-black text-white hover:bg-black"
                                    onClick={() => handleConsultationRequest(doctor.dokter_id)}
                                >
                                    Edit Jadwal
                                </Button>
                            )
                        }
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}


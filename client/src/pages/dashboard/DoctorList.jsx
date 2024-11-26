import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"; // Import Alert

export default function DoctorList() {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [consultationRequest, setConsultationRequest] = useState("");
    const [formAction, setFormAction] = useState(""); // "edit" or "consult"
    const [alertMessage, setAlertMessage] = useState(""); // To store the alert message
    const [alertType, setAlertType] = useState(""); // Success or error alert
    const { user } = useAuth();

    useEffect(() => {
        const fetchDoctors = async () => {
            const token = localStorage.getItem("token");
            try {
                const response = await axios.get("http://localhost:3000/api/consultation-schedule", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                // Get current time in hours and minutes
                const now = new Date();
                const currentTime = now.getHours() * 60 + now.getMinutes(); // Convert current time to minutes since midnight

                // Filter doctors based on current time
                const filteredDoctors = response.data.filter((doctor) => {
                    const [startHours, startMinutes] = doctor.start_time.split(":").map(Number);
                    const [endHours, endMinutes] = doctor.end_time.split(":").map(Number);
                    const startTime = startHours * 60 + startMinutes;
                    const endTime = endHours * 60 + endMinutes;

                    // Show doctors whose schedule is within the current time
                    return currentTime >= startTime && currentTime <= endTime;
                });

                // Sort doctors by start time
                const sortedDoctors = filteredDoctors.sort((a, b) => {
                    const timeA = a.start_time.split(":").join(""); // Remove ":" to create comparable strings
                    const timeB = b.start_time.split(":").join("");
                    return timeA.localeCompare(timeB);
                });

                setDoctors(sortedDoctors);
                setLoading(false);
            } catch (err) {
                setError("Failed to load doctor data. Please try again later.");
                setLoading(false);
            }
        };

        fetchDoctors();
    }, []);

    const handleConsultationRequest = (doctor) => {
        setSelectedDoctor(doctor);
        setFormAction("consult");
    };

    const handleEditSchedule = (doctor) => {
        setSelectedDoctor(doctor);
        setFormAction("edit");
    };

    const handleSubmit = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            setAlertMessage("Token tidak ditemukan!");
            setAlertType("error");
            return;
        }

        if (formAction === "consult") {
            try {
                const response = await axios.post(
                    "http://localhost:3000/api/consultation",
                    {
                        doctor_id: selectedDoctor.dokter_id,
                        patient_id: user.id,
                        complaint: consultationRequest,
                        schedule_id: selectedDoctor.schedule_id,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                // Tutup form
                setSelectedDoctor(null);

                // Tampilkan alert
                setAlertMessage(
                    `Konsultasi dengan dokter ${selectedDoctor.dokter_id} diajukan dengan keluhan: ${consultationRequest}`
                );
                setAlertType("success");

                // Refresh halaman
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            } catch (error) {
                // Tutup form sebelum menampilkan error
                setSelectedDoctor(null);

                setAlertMessage(
                    error.response?.data?.message || "Error submitting consultation request. Please try again later."
                );
                setAlertType("error");
            }
        } else {
            try {
                const formatTime = (time) => {
                    const [hours, minutes] = time.split(":");
                    return `${hours}:${minutes}:00`;
                };

                const response = await axios.put(
                    `http://localhost:3000/api/consultation-schedule/staff/${selectedDoctor.schedule_id}`,
                    {
                        doctor_name: selectedDoctor?.Doctor?.name || "Tidak diketahui",
                        start_time: formatTime(selectedDoctor.start_time),
                        end_time: formatTime(selectedDoctor.end_time),
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );

                // Tutup form
                setSelectedDoctor(null);

                // Tampilkan alert
                setAlertMessage(`Jadwal dokter ${selectedDoctor.Doctor?.name} berhasil diperbarui.`);
                setAlertType("success");

                // Refresh halaman
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            } catch (error) {
                // Tutup form sebelum menampilkan error
                setSelectedDoctor(null);

                setAlertMessage("Error updating schedule. Please try again later.");
                setAlertType("error");
            }
        }
    };

    const toCapitalCase = (name) => {
        return name
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(" ");
    };

    const formatTimeDisplay = (time) => {
        const [hours, minutes] = time.split(":");
        return `${hours}:${minutes}`;
    };

    return (
        <div>
            {alertMessage && (
                <Alert variant={alertType === "success" ? "success" : "destructive"} className="mb-4">
                    <AlertTitle>{alertType === "success" ? "Success!" : "Error!"}</AlertTitle>
                    <AlertDescription>{alertMessage}</AlertDescription>
                </Alert>
            )}

            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                {doctors.length > 0 ? (
                    doctors.map((doctor) => (
                        <Card key={doctor.dokter_id} className="shadow-lg rounded-lg border border-gray-200">
                            <CardHeader className="bg-gray-100 p-4 rounded-t-lg">
                                <CardTitle className="text-xl font-semibold text-gray-800">
                                    Dr. {toCapitalCase(doctor.Doctor.name)}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-4">
                                <p className="text-sm text-gray-600">
                                    <strong>Jadwal Konsultasi:</strong> {formatTimeDisplay(doctor.start_time)} - {formatTimeDisplay(doctor.end_time)}
                                </p>
                            </CardContent>
                            <CardFooter className="p-4">
                                {user.role === "patient" ? (
                                    <Button
                                        className="w-full bg-black text-white hover:bg-black"
                                        onClick={() => handleConsultationRequest(doctor)}
                                    >
                                        Ajukan Konsultasi
                                    </Button>
                                ) : user.role === "staff" ? (
                                    <Button
                                        className="w-full bg-black text-white hover:bg-black"
                                        onClick={() => handleEditSchedule(doctor)}
                                    >
                                        Edit Jadwal
                                    </Button>
                                ) : null}
                            </CardFooter>
                        </Card>
                    ))
                ) : (
                    <p className="text-center text-gray-500">Tidak ada dokter yang tersedia pada waktu ini.</p>
                )}
            </div>

            {/* Dialog for form */}
            {selectedDoctor && (
                <Dialog open={!!selectedDoctor} onOpenChange={() => setSelectedDoctor(null)}>
                    <DialogTrigger />
                    <DialogContent className="p-4">
                        <DialogHeader>
                            <DialogTitle>
                                {formAction === "edit" ? "Edit Jadwal" : "Ajukan Konsultasi"}
                            </DialogTitle>
                            <DialogDescription>
                                {formAction === "edit" ? (
                                    <p>Update jadwal untuk Dr. {toCapitalCase(selectedDoctor.Doctor.name)}</p>
                                ) : (
                                    <p>Ajukan keluhan kepada Dr. {toCapitalCase(selectedDoctor.Doctor.name)}</p>
                                )}
                            </DialogDescription>
                        </DialogHeader>

                        {formAction === "edit" ? (
                            <div>
                                <Input
                                    type="hidden"
                                    value={selectedDoctor.Doctor?.name}
                                    name="doctor_name"
                                />
                                <Input
                                    type="time"
                                    value={selectedDoctor.start_time}
                                    onChange={(e) => setSelectedDoctor({ ...selectedDoctor, start_time: e.target.value })}
                                    className="mt-2"
                                />
                                <Input
                                    type="time"
                                    value={selectedDoctor.end_time}
                                    onChange={(e) => setSelectedDoctor({ ...selectedDoctor, end_time: e.target.value })}
                                    className="mt-2"
                                />
                            </div>
                        ) : (
                            <div>
                                <textarea
                                    className="border p-2 w-full"
                                    value={consultationRequest}
                                    onChange={(e) => setConsultationRequest(e.target.value)}
                                    placeholder="Tuliskan keluhan Anda"
                                    rows={4}
                                />
                            </div>
                        )}
                        <DialogFooter>
                            <Button
                                className="w-full"
                                onClick={handleSubmit}
                                disabled={loading}
                            >
                                {loading ? "Processing..." : formAction === "edit" ? "Update Jadwal" : "Ajukan Konsultasi"}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
}

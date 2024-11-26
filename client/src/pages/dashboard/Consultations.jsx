import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import React, { useState, useEffect } from "react";

const Consultations = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedKeluhan, setSelectedKeluhan] = useState("");
    const [selectedPatient, setSelectedPatient] = useState("");
    const [diagnosis, setDiagnosis] = useState("");
    const { user } = useAuth();

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const token = localStorage.getItem("token");

            if (!user?.id || !user?.role || !token) {
                throw new Error("User ID, role, or token is missing");
            }

            // Tentukan endpoint berdasarkan role user
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

            const mappedData = response.data.appointments.map((item) => ({
                id: item.consultation_id,
                tanggalPengajuan: item.date,
                namaPasien: user.role === "doctor" || user.role === "staff" ? item.pasien.name : "Anda",
                namaDokter: user.role === "patient" ? item.doctor.name : user.role === "staff" ? item.dokter.name : null,
                keluhan: item.complaint,
                status: item.status,
                penyakit: item.response || "Belum ada diagnosa",
            }));

            setData(mappedData);
        } catch (error) {
            console.error("Fetch Error:", error);
            setError(error.response?.data?.message || error.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const openDialog = (keluhan, namaPasien) => {
        setSelectedKeluhan(keluhan);
        setSelectedPatient(namaPasien);
        setIsDialogOpen(true);
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
        setSelectedKeluhan("");
        setSelectedPatient("");
        setDiagnosis("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(`Diagnosis for ${selectedPatient}: ${diagnosis}`);
        closeDialog();
    };

    if (isLoading) {
        return <div>Loading data...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((row) => (
                <Card key={row.id} className="shadow-md border border-gray-300">
                    <CardHeader>
                        {
                            user.role === "doctor" ? (
                                <p className="text-lg font-semibold">Nama Pasien: {row.namaPasien}</p>
                            ) : user.role === "patient" ? (
                                <p className="text-lg font-semibold">Nama Dokter: dr. {row.namaDokter}</p>
                            ) : user.role === "staff" ? (
                                <>
                                    <p className="text-lg font-semibold">Nama Dokter: dr. {row.namaDokter}</p>
                                    <p className="text-lg font-semibold">Nama Pasien: {row.namaPasien}</p>
                                </>
                            ) : null
                        }
                        <p className="text-sm text-gray-500">{row.tanggalPengajuan}</p>
                    </CardHeader>
                    <CardContent>
                        <p>
                            <strong>Keluhan:</strong> {row.keluhan}
                        </p>
                        <p>
                            <strong>Diagnosa:</strong> {row.penyakit}
                        </p>
                        <p>
                            <strong>Status:</strong> {row.status}
                        </p>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                        {user.role === "doctor" && (
                            <Button
                                variant="default"
                                onClick={() => openDialog(row.keluhan, row.namaPasien)}
                            >
                                Input Diagnosa
                            </Button>
                        )}
                    </CardFooter>
                </Card>
            ))}

            {/* Dialog */}
            {isDialogOpen && (
                <div
                    className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center"
                    onClick={closeDialog}
                >
                    <div
                        className="bg-white p-6 rounded-lg shadow-md w-96"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-xl font-bold mb-4">
                            Diagnosis untuk {selectedPatient}
                        </h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <textarea
                                    id="diagnosis"
                                    value={diagnosis}
                                    onChange={(e) => setDiagnosis(e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                                    placeholder="Masukkan hasil diagnosis"
                                    rows={4}
                                />
                            </div>
                            <div className="flex justify-end">
                                <Button
                                    variant="ghost"
                                    className="mr-2"
                                    onClick={closeDialog}
                                >
                                    Cancel
                                </Button>
                                <Button variant="default" type="submit">
                                    Submit
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Consultations;

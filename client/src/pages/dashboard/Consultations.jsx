import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import React, { useState, useEffect } from "react";

const Consultations = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [alert, setAlert] = useState({ message: "", variant: "" });
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
                    namaDokter: user.role === "patient" ? item.doctor.name : user.role === "staff" ? item.dokter.name : null,
                    keluhan: item.complaint,
                    status: item.status,
                    penyakit: item.response || "Belum ada diagnosa",
                };
            });

            const sortedData = mappedData.sort((a, b) => {
                const order = { accepted: 1, pending: 2, rejected: 3 };
                return order[a.status] - order[b.status];
            });

            setData(sortedData);
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

    const openDialog = (id, keluhan, namaPasien) => {
        setSelectedKeluhan(id); // Menyimpan ID konsultasi
        setSelectedPatient(namaPasien);
        setIsDialogOpen(true);
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
        setSelectedKeluhan("");
        setSelectedPatient("");
        setDiagnosis("");
    };

    const handleAccepted = async (id) => {
        console.log(id);
        try {
            const token = localStorage.getItem("token");
            await axios.put(
                `http://localhost:3000/api/consultation/doctor/${id}`,
                { response: "Belum ada diagnosa", status: "accepted" },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setAlert({ message: "Konsultasi disetujui!", variant: "success" });
            setTimeout(() => {
                setAlert({ message: "", variant: "" });
            }, 2000);
            fetchData();
        } catch (error) {
            console.error("Approval Error:", error);
            setAlert({ message: "Gagal menyetujui konsultasi", variant: "error" });
            setTimeout(() => {
                setAlert({ message: "", variant: "" });
            }, 2000);
        }
    };

    const handleReject = async (id) => {
        try {
            const token = localStorage.getItem("token");
            await axios.put(
                `http://localhost:3000/api/consultation/doctor/${id}`,
                { response: "Belum ada diagnosa", status: "rejected" },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setAlert({ message: "Konsultasi ditolak!", variant: "success" });
            setTimeout(() => {
                setAlert({ message: "", variant: "" });
            }, 2000);
            fetchData();
        } catch (error) {
            console.error("Reject Error:", error);
            setAlert({ message: "Gagal menolak konsultasi", variant: "error" });
            setTimeout(() => {
                setAlert({ message: "", variant: "" });
            }, 2000);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");

            // Menggunakan selectedKeluhan sebagai ID konsultasi
            const response = await axios.put(
                `http://localhost:3000/api/consultation/doctor/${selectedKeluhan}`,
                { response: diagnosis, status: "accepted" },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            closeDialog();
            setAlert({ message: "Diagnosa berhasil disimpan!", variant: "success" });
            setTimeout(() => {
                setAlert({ message: "", variant: "" });
            }, 2000);
            fetchData();
        } catch (error) {
            console.error("Submit Diagnosis Error:", error);
            if (error.response) {
                console.error("Response Error Data:", error.response.data);
                console.error("Response Status:", error.response.status);
            }
            setAlert({ message: "Gagal menyimpan diagnosa", variant: "error" });
            setTimeout(() => {
                setAlert({ message: "", variant: "" });
            }, 2000);
        }
    };

    if (isLoading) {
        return <div className="text-center py-4">Loading data...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500 py-4">Error: {error}</div>;
    }

    return (
        <>
            {
                alert.message && (
                    <Alert
                        className="mt-4"
                        variant={alert.variant === "success" ? "success" : "error"}
                    >
                        <AlertTitle>
                            {alert.variant === "success" ? "Success" : "Error"}
                        </AlertTitle>
                        <AlertDescription>{alert.message}</AlertDescription>
                    </Alert>
                )
            }
            < div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" >
                {
                    data.map((row) => (
                        <Card key={row.id} className="shadow-lg rounded-lg border border-gray-300 bg-white">
                            <CardHeader className="p-4">
                                {user.role === "doctor" ? (
                                    <p className="text-lg font-semibold">Nama Pasien: {row.namaPasien}</p>
                                ) : user.role === "patient" ? (
                                    <p className="text-lg font-semibold">Nama Dokter: dr. {row.namaDokter}</p>
                                ) : user.role === "staff" ? (
                                    <>
                                        <p className="text-lg font-semibold">Nama Dokter: dr. {row.namaDokter}</p>
                                        <p className="text-lg font-semibold">Nama Pasien: {row.namaPasien}</p>
                                    </>
                                ) : null}
                                <p className="text-sm text-gray-500">{row.tanggalPengajuan}</p>
                            </CardHeader>
                            <CardContent className="p-4">
                                <p>
                                    <strong>Keluhan:</strong> {row.keluhan}
                                </p>
                                <p>
                                    <strong>Diagnosa:</strong> {row.penyakit}
                                </p>
                                <p>
                                    <strong>Status:</strong> <span className={`font-semibold ${row.status === 'pending' ? 'text-yellow-600' : row.status === 'accepted' ? 'text-green-600' : 'text-red-600'}`}>{row.status}</span>
                                </p>
                            </CardContent>
                            <CardFooter className="flex justify-end p-4">
                                {user.role === "doctor" && row.status === "pending" && (
                                    <>
                                        <Button
                                            variant="default"
                                            onClick={() => handleAccepted(row.id)}
                                            className="mr-2"
                                        >
                                            Setuju
                                        </Button>
                                        <Button
                                            className="bg-gray-600 hover:bg-gray-700"
                                            variant="destructive"
                                            onClick={() => handleReject(row.id)}
                                        >
                                            Tolak
                                        </Button>
                                    </>
                                )}
                                {user.role === "doctor" && row.status === "accepted" && (
                                    <Button
                                        variant="default"
                                        onClick={() => openDialog(row.id, row.keluhan, row.namaPasien)}
                                    >
                                        {row.response !== null ? "Edit Diagnosa" : "Input Diagnosa"}
                                    </Button>
                                )}
                            </CardFooter>
                        </Card>
                    ))
                }

                {
                    isDialogOpen && (
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
                                    <div className="flex justify-end gap-4">
                                        <Button
                                            variant="ghost"
                                            className="mr-2"
                                            onClick={closeDialog}
                                        >
                                            Batal
                                        </Button>
                                        <Button type="submit">Simpan Diagnosa</Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )
                }
            </div >
        </>
    );
};

export default Consultations;

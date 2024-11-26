import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useAuth } from '@/context/AuthContext';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

const columns = [
    { Header: "Tanggal Pengajuan", accessor: "tanggalPengajuan" },
    { Header: "Nama Pasien", accessor: "namaPasien" },
    { Header: "Keluhan", accessor: "keluhan" },
    { Header: "Penyakit", accessor: "penyakit" },
];

export default function Consultations() {
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

            const doctorId = user?.id;
            const token = localStorage.getItem('token');

            if (!doctorId || !token) {
                throw new Error('Doctor ID or token is missing');
            }

            const response = await axios.get(
                `http://localhost:3000/api/consultation/list-appointment/${doctorId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log('Response Data:', response.data.appointments);
            if (!Array.isArray(response.data.appointments)) {
                console.error('API returned unexpected format:', response.data);
                throw new Error('Unexpected response format');
            }

            const mappedData = response.data.appointments.map((item) => ({
                id: item.consultation_id,
                tanggalPengajuan: "Tanggal dummy", // Ganti sesuai data API jika tersedia
                namaPasien: item.pasien.name,
                keluhan: item.complaint,
                penyakit: item.response || "Belum ada diagnosa",
            }));

            setData(mappedData);
        } catch (error) {
            console.error('Fetch Error:', error);
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
        <div className="flex flex-col gap-4">
            <div className="shadow-md rounded-xl overflow-hidden border border-gray-300">
                <table className="table-auto w-full" style={{ tableLayout: "fixed" }}>
                    <thead className="bg-gray-100">
                        <tr>
                            {columns.map((column) => (
                                <th
                                    key={column.accessor}
                                    className="px-6 py-4 text-left border border-gray-200"
                                >
                                    {column.Header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row) => (
                            <tr key={row.id} className="hover:bg-gray-50">
                                <td colSpan={columns.length}>
                                    <Accordion type="single" collapsible>
                                        <AccordionItem value={String(row.id)}>
                                            <AccordionTrigger
                                                className="px-6 py-4 flex justify-between items-center w-full focus:outline-none"
                                                style={{ border: "none" }}
                                            >
                                                {columns.map((column) => (
                                                    <span
                                                        key={`${row.id}-${column.accessor}`}
                                                        className={`text-left w-full`}
                                                        style={{
                                                            borderBottom: "none",
                                                            padding: "0.5rem 1rem",
                                                        }}
                                                    >
                                                        {column.accessor === "penyakit" ? (
                                                            <button
                                                                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    openDialog(row.keluhan, row.namaPasien);
                                                                }}
                                                            >
                                                                Input Hasil Diagnosa
                                                            </button>
                                                        ) : (
                                                            row[column.accessor]
                                                        )}
                                                    </span>
                                                ))}
                                            </AccordionTrigger>
                                            <AccordionContent>
                                                <div className="px-6 py-4 text-gray-700 flex">
                                                    <div className="w-1/2 pr-4">
                                                        <strong>Keluhan:</strong> {row.keluhan}
                                                    </div>
                                                    <div className="border-l border-gray-300 pl-4 w-1/2">
                                                        <strong>Diagnosa:</strong> {row.penyakit}
                                                    </div>
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

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
                                <button
                                    type="button"
                                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg mr-2"
                                    onClick={closeDialog}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

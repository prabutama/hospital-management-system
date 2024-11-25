import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

export default function AddDoctor() {
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState({ visible: false, variant: "", title: "", message: "" });
    const [doctorData, setDoctorData] = useState({
        doctor_name: "",
        start_time: "",
        end_time: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDoctorData((prev) => ({ ...prev, [name]: value }));
    };

    const formatTime = (time) => {
        return time ? `${time}:00` : "";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!doctorData.doctor_name || !doctorData.email || !doctorData.password) {
            setAlert({
                visible: true,
                variant: "error",
                title: "Validasi Gagal",
                message: "Semua field wajib diisi.",
            });
            return;
        }

        if (!doctorData.start_time || !doctorData.end_time || doctorData.start_time >= doctorData.end_time) {
            setAlert({
                visible: true,
                variant: "error",
                title: "Waktu Tidak Valid",
                message: "Pastikan waktu mulai dan selesai diisi dengan benar.",
            });
            return;
        }

        const formattedData = {
            ...doctorData,
            start_time: formatTime(doctorData.start_time),
            end_time: formatTime(doctorData.end_time),
        };

        setLoading(true);

        try {
            const response = await fetch("http://localhost:3000/api/consultation-schedule", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formattedData),
            });

            if (!response.ok) {
                const error = await response.json().catch(() => null);
                setAlert({
                    visible: true,
                    variant: "error",
                    title: "Gagal",
                    message: error?.message || "Terjadi kesalahan pada server.",
                });
                return;
            }

            setAlert({
                visible: true,
                variant: "success",
                title: "Berhasil",
                message: "Data dokter berhasil ditambahkan!",
            });

            // Reset form setelah berhasil
            setDoctorData({
                doctor_name: "",
                start_time: "",
                end_time: "",
                email: "",
                password: "",
            });

            // Sembunyikan alert otomatis setelah beberapa detik
            setTimeout(() => setAlert({ visible: false, variant: "", title: "", message: "" }), 3000);
        } catch (err) {
            setAlert({
                visible: true,
                variant: "error",
                title: "Error",
                message: "Terjadi kesalahan saat menghubungkan ke server.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex">
            <Card className="w-full max-w-lg shadow-lg">
                {alert.visible && (
                    <Alert
                        className="w-[97%] mx-auto mt-2"
                        variant={alert.variant === "success" ? "default" : "destructive"}
                    >
                        <AlertTitle>{alert.title}</AlertTitle>
                        <AlertDescription>{alert.message}</AlertDescription>
                    </Alert>
                )}
                <CardHeader>
                    <CardTitle className="text-lg font-bold">Tambah Dokter</CardTitle>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        <div>
                            <Label htmlFor="doctor_name">Nama Dokter</Label>
                            <Input
                                type="text"
                                id="doctor_name"
                                name="doctor_name"
                                placeholder="Masukkan nama dokter"
                                value={doctorData.doctor_name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <Label htmlFor="start_time">Waktu Mulai</Label>
                            <Input
                                type="time"
                                id="start_time"
                                name="start_time"
                                value={doctorData.start_time}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <Label htmlFor="end_time">Waktu Selesai</Label>
                            <Input
                                type="time"
                                id="end_time"
                                name="end_time"
                                value={doctorData.end_time}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Masukkan email dokter"
                                value={doctorData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <Label htmlFor="password">Password</Label>
                            <Input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Masukkan password dokter"
                                value={doctorData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                        <Button type="submit" className="bg-black text-white hover:gray-800 flex items-center" disabled={loading}>
                            {loading ? (
                                <>
                                    <span className="loader mr-2"></span> Loading...
                                </>
                            ) : "Tambahkan Dokter"}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}

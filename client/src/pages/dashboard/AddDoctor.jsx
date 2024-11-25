import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function AddDoctor() {
    const [loading, setLoading] = useState(false);
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
        setLoading(true);

        const formattedData = {
            ...doctorData,
            start_time: formatTime(doctorData.start_time),
            end_time: formatTime(doctorData.end_time),
        };

        try {
            const response = await fetch("http://localhost:3000/api/consultation-schedule", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formattedData),
            });

            if (!response.ok) {
                const error = await response.json();
                console.error("Error:", error);
                alert("Gagal menambahkan data dokter. Silakan coba lagi.");
                return;
            }

            const result = await response.json();
            console.log("Doctor Data Submitted:", result);

            alert("Data dokter berhasil ditambahkan!");
            setDoctorData({
                doctor_name: "",
                start_time: "",
                end_time: "",
                email: "",
                password: "",
            });
        } catch (err) {
            console.error("Error:", err);
            alert("Terjadi kesalahan saat menghubungkan ke server.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex">
            <Card className="w-full max-w-lg shadow-lg">
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
                        <Button type="submit" className="bg-black text-white hover:gray-800" disabled={loading}>
                            {loading ? "Loading..." : "Tambahkan Dokter"}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function AddDoctor() {
    const [doctorData, setDoctorData] = useState({
        name: "",
        start_time: "",
        end_time: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDoctorData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Doctor Data Submitted: ", doctorData);

        alert("Data dokter berhasil ditambahkan!");
        setDoctorData({
            name: "",
            start_time: "",
            end_time: "",
            email: "",
            password: "",
        });
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
                            <Label htmlFor="name">Nama Dokter</Label>
                            <Input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Masukkan nama dokter"
                                value={doctorData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Waktu Mulai */}
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

                        {/* Waktu Selesai */}
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
                            <Label htmlFor="name">Email</Label>
                            <Input
                                type="text"
                                id="email"
                                name="email"
                                placeholder="Masukkan email dokter"
                                value={doctorData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <Label htmlFor="name">Password</Label>
                            <Input
                                type="text"
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
                        <Button type="submit" className="bg-black text-white hover:gray-800">
                            Tambahkan Dokter
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}

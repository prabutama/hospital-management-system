import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Layout } from "@/pages/dashboard/Layout";

export function Patient() {
    const userRole = "patient"; // Nilai tetap karena hanya untuk pasien

    const [file, setFile] = useState(null);

    // Fungsi untuk menangani perubahan file
    const handleFileChange = (event) => {
        const uploadedFile = event.target.files[0];
        if (uploadedFile) {
            setFile(uploadedFile);
        }
    };

    // Fungsi untuk menangani pengiriman form
    const handleSubmit = (event) => {
        event.preventDefault();
        if (!file) {
            alert("Please select a file before uploading.");
            return;
        }

        // Proses upload file ke server atau API di sini
        console.log("File uploaded:", file);
    };

    return (
        <Layout userRole={userRole}>
            <Card className="w-full max-w-lg p-6 space-y-6 bg-white shadow-lg rounded-xl">
                <h2 className="text-3xl font-bold text-gray-900">Patient Dashboard</h2>
                <p>Upload your X-ray image here.</p>

                {/* Form upload gambar X-ray */}
                <form onSubmit={handleSubmit}>
                    <div>
                        <Label htmlFor="xray">X-ray Image</Label>
                        <Input
                            type="file"
                            id="xray"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </div>
                    <Button className="mt-4" type="submit">
                        Upload Image
                    </Button>
                </form>
            </Card>
        </Layout>
    );
}

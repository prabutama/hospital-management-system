import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";

const doctors = [
    {
        id: 1,
        name: "Dr. John Doe",
        specialization: "Neurology",
        schedule: "Monday - Friday, 10:00 AM - 3:00 PM",
    },
    {
        id: 2,
        name: "Dr. Jane Smith",
        specialization: "Cardiology",
        schedule: "Tuesday - Saturday, 9:00 AM - 2:00 PM",
    },
    {
        id: 3,
        name: "Dr. Emily Clark",
        specialization: "Dermatology",
        schedule: "Wednesday - Sunday, 11:00 AM - 4:00 PM",
    },
    {
        id: 3,
        name: "Dr. Emily Clark",
        specialization: "Dermatology",
        schedule: "Wednesday - Sunday, 11:00 AM - 4:00 PM",
    },
];

export default function DoctorList() {
    const handleConsultationRequest = (doctorId) => {
        alert(`Pengajuan konsultasi dengan dokter ID: ${doctorId}`);
        // Implementasikan logika pengajuan konsultasi di sini
    };

    return (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {doctors.map((doctor) => (
                <Card key={doctor.id} className="shadow-md">
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold">
                            {doctor.name}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-gray-600">
                            <strong>Specialization:</strong> {doctor.specialization}
                        </p>
                        <p className="text-sm text-gray-600">
                            <strong>Schedule:</strong> {doctor.schedule}
                        </p>
                    </CardContent>
                    <CardFooter>
                        <Button
                            className="w-full"
                            onClick={() => handleConsultationRequest(doctor.id)}
                        >
                            Ajukan Konsultasi
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}

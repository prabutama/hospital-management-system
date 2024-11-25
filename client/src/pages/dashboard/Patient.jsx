import { useState } from "react";
import DoctorList from "@/pages/dashboard/DoctorList";
import PatientHistory from "@/pages/dashboard/PatientHistory";
import { Outlet } from "react-router-dom";

export function Patient() {

    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        const uploadedFile = event.target.files[0];
        if (uploadedFile) {
            setFile(uploadedFile);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!file) {
            alert("Please select a file before uploading.");
            return;
        }
        
        console.log("File uploaded:", file);
    };

    return (
        <div className="flex flex-col gap-4">
            <Outlet />
        </div>
    );
}

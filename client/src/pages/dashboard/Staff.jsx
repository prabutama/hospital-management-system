import { useState } from "react";
import DoctorList from "@/pages/dashboard/DoctorList";
import PatientHistory from "@/pages/dashboard/PatientHistory";
import { Outlet } from "react-router-dom";

export function Staff() {

    const [file, setFile] = useState(null);

    return (
        <div className="flex flex-col gap-4">
            <Outlet />
        </div>
    );
}

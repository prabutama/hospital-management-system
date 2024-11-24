import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";

export function Navbar() {
    return (
        <nav className="w-full bg-white border-b border-gray-200 shadow sticky top-0 z-50">
            <div className="container mx-auto px-4 flex justify-between items-center h-16">
                {/* Logo */}
                <div className="text-2xl font-bold text-blue-600">HospitalMS</div>

                {/* Navigation Links */}
                <div className="hidden md:flex gap-6">
                    <a href="#" className="text-gray-700 hover:text-blue-600">
                        Dashboard
                    </a>
                    <a href="#" className="text-gray-700 hover:text-blue-600">
                        Patients
                    </a>
                    <a href="#" className="text-gray-700 hover:text-blue-600">
                        Appointments
                    </a>
                    <a href="#" className="text-gray-700 hover:text-blue-600">
                        Reports
                    </a>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    {/* Dropdown Menu */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">Nama</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem>View Profile</DropdownMenuItem>
                            <DropdownMenuItem>Settings</DropdownMenuItem>
                            <DropdownMenuItem>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Login Button */}
                    <Link to="/login">
                        <Button variant="default" className="bg-blue-600 text-white hover:bg-blue-700">
                            Login
                        </Button>
                    </Link>
                </div>
            </div>
        </nav>
    );
}

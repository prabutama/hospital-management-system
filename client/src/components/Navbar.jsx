import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

export function Navbar() {
    const navigate = useNavigate()
    const { user, logout } = useAuth()
    const role = user?.role;
    const handleLogout = () => {
        logout();
    }

    return (
        <nav className="w-full bg-white border-b border-gray-200 shadow sticky top-0 z-50">
            <div className="container mx-auto px-4 flex justify-between items-center h-16">
                {/* Logo */}
                <div className="text-2xl font-bold text-teal-400 font-poppins tracking-wider">Healthify</div>

                {/* Navigation Links */}
                <div className="hidden md:flex gap-6">
                    <a href="/" className="text-teal-400 hover:text-teal-500">
                        Home
                    </a>
                    <a href="#" className="text-teal-400 hover:text-teal-500">
                        About
                    </a>
                    <a href="#" className="text-teal-400 hover:text-teal-500">
                        Services
                    </a>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    {user ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="border-0 focus:outline-none focus:ring-0 ring-0">
                                    {user.name} | {user.email}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="min-w-[180px] bg-white rounded-lg shadow-lg border border-gray-200 mt-3"
                                side="bottom"
                                align="end"
                                sideOffset={4}
                            >
                                <DropdownMenuItem className="text-gray-700 hover:bg-gray-100 px-4 py-2">
                                    <Link to={`/${role}/dashboard`} className="block w-full">Dashboard</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Button onClick={handleLogout} className="w-full text-left px-4 py-2 text-white hover:bg-gray-800">Logout</Button>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <Link to="/login">
                            <Button variant="default" className="bg-teal-400 text-white hover:bg-teal-500 tracking-wider">
                                Login
                            </Button>
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}

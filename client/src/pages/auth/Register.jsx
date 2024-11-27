import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Navbar } from "@/components/Navbar";

export function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false); // Loading state
    const [alert, setAlert] = useState({ message: "", variant: "" });
    const naviagate = useNavigate()
    const handleRegister = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setAlert({ message: "Passwords do not match.", variant: "error" });
            return;
        }

        setLoading(true);

        try {
            await axios.post("http://localhost:3000/api/register", {
                name,
                email,
                password,
            });

            setAlert({
                message: "Registration successful! Please log in.",
                variant: "success",
            });

            setTimeout(() => {
                naviagate("/login")
            }, 2000)

        } catch (error) {
            setAlert({
                message: error.response?.data?.message || "Registration failed. Please try again.",
                variant: "error",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <div className="flex items-center justify-center min-h-screen bg-gray-200 font-poppins">
                <Card className="w-full max-w-sm p-6 space-y-6 bg-white shadow-lg rounded-xl">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-teal-400">Create an Account</h2>
                        <p className="mt-2 text-slate-600">
                            Welcome to HospitalMS. Please create an account to get started.
                        </p>
                    </div>

                    {alert.message && (
                        <Alert
                            variant={alert.variant === "success" ? "success" : "error"}
                        >
                            <AlertTitle>
                                {alert.variant === "success" ? "Success" : "Error"}
                            </AlertTitle>
                            <AlertDescription>{alert.message}</AlertDescription>
                        </Alert>
                    )}

                    <form onSubmit={handleRegister} className="space-y-4">
                        <div>
                            <Label htmlFor="name" className="-mt-2 text-sm font-medium text-gray-700">
                                Full Name
                            </Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="Enter your full name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="mt-2 p-2 border border-gray-300 rounded-md w-full"
                            />
                        </div>

                        <div>
                            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                                Email Address
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="mt-2 p-2 border border-gray-300 rounded-md w-full"
                            />
                        </div>

                        <div>
                            <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                                Password
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="mt-2 p-2 border border-gray-300 rounded-md w-full"
                            />
                        </div>

                        <div>
                            <Label
                                htmlFor="confirmPassword"
                                className="text-sm font-medium text-gray-700"
                            >
                                Confirm Password
                            </Label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                placeholder="Confirm your password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                className="mt-2 p-2 border border-gray-300 rounded-md w-full"
                            />
                        </div>

                        <div>
                            <Button
                                type="submit"
                                className="w-full bg-teal-400 text-white hover:bg-teal-400"
                                disabled={loading}
                            >
                                {loading ? "Registering..." : "Register"}
                            </Button>
                        </div>
                    </form>
                    <div className="text-center mt-4">
                        <p className="text-sm text-gray-600">
                            Already have an account?{" "}
                            <a href="/login" className="text-black hover:underline">
                                Login here
                            </a>
                        </p>
                    </div>
                </Card>
            </div>
        </>
    );
}

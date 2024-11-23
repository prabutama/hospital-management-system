import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useState } from "react";

export function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleRegister = (e) => {
        e.preventDefault();
        // Handle registration logic (e.g., API call)
        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }
        console.log("Registering with:", { name, email, password });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <Card className="w-full max-w-sm p-6 space-y-6 bg-white shadow-lg rounded-xl">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900">Create an Account</h2>
                    <p className="mt-2 text-gray-600">Welcome to HospitalMS. Please create an account to get started.</p>
                </div>

                <form onSubmit={handleRegister} className="space-y-4">
                    {/* Name Input */}
                    <div>
                        <Label htmlFor="name" className="text-sm font-medium text-gray-700">
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

                    {/* Email Input */}
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

                    {/* Password Input */}
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

                    {/* Confirm Password Input */}
                    <div>
                        <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
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

                    {/* Submit Button */}
                    <div>
                        <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700">
                            Register
                        </Button>
                    </div>
                </form>

                {/* Login Link */}
                <div className="text-center mt-4">
                    <p className="text-sm text-gray-600">
                        Already have an account?{" "}
                        <a href="/login" className="text-blue-600 hover:underline">
                            Login here
                        </a>
                    </p>
                </div>
            </Card>
        </div>
    );
}

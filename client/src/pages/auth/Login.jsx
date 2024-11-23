import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useState } from "react";

export function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        // Handle login logic (e.g., make API call)
        console.log("Logging in with:", { email, password });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <Card className="w-full max-w-sm p-6 space-y-6 bg-white shadow-lg rounded-xl">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900">Login</h2>
                    <p className="mt-2 text-gray-600">Welcome back to HospitalMS</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
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

                    {/* Submit Button */}
                    <div>
                        <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700">
                            Login
                        </Button>
                    </div>
                </form>

                {/* Forgot Password Link */}
                <div className="text-center">
                    <a href="#" className="text-sm text-blue-600 hover:underline">
                        Forgot your password?
                    </a>
                </div>

                {/* Register Link */}
                <div className="text-center mt-4">
                    <p className="text-sm text-gray-600">
                        Don't have an account?{" "}
                        <a href="/register" className="text-blue-600 hover:underline">
                            Register here
                        </a>
                    </p>
                </div>
            </Card>
        </div>
    );
}

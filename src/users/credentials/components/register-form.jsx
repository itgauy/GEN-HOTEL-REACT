import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import useGuestSignup from "../stores/useGuestSignup"

export function RegisterForm({ className, ...props }) {
    const navigate = useNavigate()
    const { register_account } = useGuestSignup()

    const [passwordMatch, setPasswordMatch] = useState({ match: true, message: "" })
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: "",
        confirmPassword: ""
    })

    // 👇 Load email from localStorage
    useEffect(() => {
        const rawData = localStorage.getItem("guest-signup-storage");
        if (rawData) {
            try {
                const parsed = JSON.parse(rawData);
                const email = parsed?.state?.email;
                if (email) {
                    setFormData(prev => ({ ...prev, email }));
                }
            } catch (err) {
                console.error("Failed to parse guest-signup-storage:", err);
            }
        }
    }, []);


    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value,
        })

        if (name === "password" || name === "confirmPassword") {
            if (name === "confirmPassword" && value !== formData.password) {
                setPasswordMatch({ match: false, message: "Your passwords do not match." })
            } else if (name === "password" && value !== formData.confirmPassword && formData.confirmPassword) {
                setPasswordMatch({ match: false, message: "Your passwords do not match." })
            } else if (
                (name === "confirmPassword" && value === formData.password) ||
                (name === "password" && value === formData.confirmPassword)
            ) {
                setPasswordMatch({ match: true, message: "Your passwords do match." })
            }
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const { email, firstName, lastName, username, password } = formData

        const result = await register_account({
            email,
            firstName,
            lastName,
            username,
            guest_password: password,
        })

        if (result.success) {
            navigate("/registration-success")
        } else {
            alert(result.message || "Something went wrong during registration.")
        }
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="w-full">
                <CardHeader className="space-y-1 text-center">
                    <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
                    <CardDescription>Enter your information to register</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address (Verified)</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Enter your email"
                                required
                                value={formData.email}
                                onChange={handleInputChange}
                                disabled
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="username">Username</Label>
                            <Input
                                id="username"
                                name="username"
                                type="text"
                                placeholder="Enter your username"
                                required
                                value={formData.username}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="firstName">First Name</Label>
                                <Input
                                    id="firstName"
                                    name="firstName"
                                    placeholder="Enter your first name"
                                    required
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="lastName">Last Name</Label>
                                <Input
                                    id="lastName"
                                    name="lastName"
                                    placeholder="Enter your last name"
                                    required
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Enter your password"
                                required
                                value={formData.password}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <Input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                placeholder="Confirm your password"
                                required
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                            />
                        </div>

                        {formData.password && formData.confirmPassword && (
                            <div className={`text-sm ${passwordMatch.match ? "text-green-600" : "text-red-600"}`}>
                                {passwordMatch.message}
                            </div>
                        )}

                        <Button type="submit" className="w-full" disabled={!passwordMatch.match}>
                            Proceed
                        </Button>

                        <div className="text-center text-sm">
                            Already have an account?{" "}
                            <a
                                href="#"
                                className="text-primary hover:underline"
                                onClick={(e) => {
                                    e.preventDefault();

                                    const hasLocal = localStorage.getItem("guest-signup-storage");
                                    const hasSession = sessionStorage.getItem("temporary_access");
                                    const hasCookie = document.cookie.includes("hotel-guest-registration");

                                    if (hasLocal || hasSession || hasCookie) {
                                        const confirmClear = window.confirm(
                                            "It looks like you have pending registration. Once you confirm this process will be considered invalid do you like to proceed?"
                                        );

                                        if (confirmClear) {
                                            localStorage.removeItem("guest-signup-storage");
                                            sessionStorage.removeItem("temporary_access");

                                            // Remove the cookie manually
                                            document.cookie =
                                                "hotel-guest-registration=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

                                            navigate("/auth/login");
                                        }
                                    } else {
                                        navigate("/auth/login");
                                    }
                                }}
                            >
                                Login
                            </a>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

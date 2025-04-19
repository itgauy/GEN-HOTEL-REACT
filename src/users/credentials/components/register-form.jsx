import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils";

export function RegisterForm({ className, ...props }) {
    const [passwordMatch, setPasswordMatch] = useState({ match: true, message: "" })
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value,
        })

        // Check password match when either password field changes
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

    const handleSubmit = (e) => {
        e.preventDefault()
        // Handle registration logic here
        console.log("Form submitted:", formData)
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
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Enter your email"
                                required
                                value={formData.email}
                                onChange={handleInputChange}
                            />
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
                            <a href="/auth/login" className="text-primary hover:underline">
                                Login
                            </a>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>

    )
}

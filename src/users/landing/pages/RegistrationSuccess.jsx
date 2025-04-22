import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useNavigate } from "react-router-dom"

export default function RegistrationSuccess() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white p-4">
      <div className="w-full max-w-md">
        <Card className="w-full border-green-200 shadow-lg">
          <CardHeader className="text-center pb-2">
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <CardTitle className="text-2xl font-bold text-green-700">Registration Successful!</CardTitle>
            <CardDescription className="text-green-600 mt-2">
              Your account has been created successfully
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-gray-600">
              Thank you for joining us! You can start now booking reservations with our hotel services.
            </p>
            <div className="bg-green-50 p-4 rounded-lg border border-green-100">
              <h3 className="font-medium text-green-800 mb-2">What's next?</h3>
              <ul className="text-sm text-gray-600 space-y-1 text-left list-disc list-inside">
                <li>Explore available features</li>
                <li>Book your first hotel reservation</li>
                <li>Check out our informative guides with our article blogs page</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
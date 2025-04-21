import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import useGuestSignup from "../stores/useGuestSignup"

export function OtpVerification() {
  const { verifyOTP } = useGuestSignup()
  const navigate = useNavigate()

  // ✅ Get email from localStorage guest-signup-storage
  const stored = JSON.parse(localStorage.getItem("guest-signup-storage") || "{}")
  const email = stored?.state?.email || "user@example.com"

  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [isResending, setIsResending] = useState(false)
  const inputRefs = useRef([])
  const [timer, setTimer] = useState(60)

  useEffect(() => {
    if (inputRefs.current[0]) inputRefs.current[0].focus()

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    if (value && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus()
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus()
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData("text/plain").trim()
    if (/^\d{6}$/.test(pasted)) {
      setOtp(pasted.split(""))
      inputRefs.current[5]?.focus()
    }
  }

  const handleResendOtp = () => {
    if (timer === 0) {
      setIsResending(true)
      setTimeout(() => {
        setTimer(60)
        setIsResending(false)
        setOtp(["", "", "", "", "", ""])
        inputRefs.current[0]?.focus()
      }, 1500)
    }
  }

  const handleVerify = async () => {
    const otpString = otp.join("")
    if (otpString.length === 6) {
      const result = await verifyOTP(otpString)
      if (result.success) {
        navigate("/auth/login/registration")
      }
    }
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="space-y-1 text-center pb-2">
        <CardTitle className="text-2xl font-bold">Verification Code</CardTitle>
        <CardDescription>
          We've sent a verification code to
          <br />
          {email}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-center gap-1 sm:gap-2" onPaste={handlePaste}>
            {otp.map((digit, index) => (
              <Input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="h-16 w-12 text-center text-2xl font-bold"
              />
            ))}
          </div>

          <Button onClick={handleVerify} className="w-full" disabled={otp.join("").length !== 6}>
            Verify
          </Button>

          <div className="text-center text-sm">
            {timer > 0 ? (
              <p>Resend code in {timer}s</p>
            ) : (
              <Button variant="outline" className="w-full" onClick={handleResendOtp} disabled={isResending}>
                {isResending ? "Sending..." : "Resend Code"}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function OtpVerification({ email = "user@example.com", onVerify = () => {} }) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [isResending, setIsResending] = useState(false)
  const inputRefs = useRef([])
  const [timer, setTimer] = useState(60)

  useEffect(() => {
    // Focus the first input on component mount
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus()
    }

    // Start countdown timer
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(interval)
          return 0
        }
        return prevTimer - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const handleChange = (index, value) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return

    // Update the OTP array
    const newOtp = [...otp]
    newOtp[index] = value

    setOtp(newOtp)

    // Auto-focus next input if current input is filled
    if (value && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus()
    }
  }

  const handleKeyDown = (index, e) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus()
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text/plain").trim()

    // Check if pasted content is a 6-digit number
    if (/^\d{6}$/.test(pastedData)) {
      const digits = pastedData.split("")
      setOtp(digits)

      // Focus the last input
      if (inputRefs.current[5]) {
        inputRefs.current[5].focus()
      }
    }
  }

  const handleResendOtp = () => {
    if (timer === 0) {
      setIsResending(true)

      // Simulate API call to resend OTP
      setTimeout(() => {
        setTimer(60)
        setIsResending(false)
        // Clear the OTP fields
        setOtp(["", "", "", "", "", ""])
        // Focus the first input
        if (inputRefs.current[0]) {
          inputRefs.current[0].focus()
        }
      }, 1500)
    }
  }

  const handleVerify = () => {
    const otpString = otp.join("")
    if (otpString.length === 6) {
      onVerify(otpString)
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

          <Button
            onClick={handleVerify}
            className="w-full"
            disabled={otp.join("").length !== 6}
          >
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

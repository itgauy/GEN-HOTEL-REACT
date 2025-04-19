import { GalleryVerticalEnd } from "lucide-react"
import { OtpVerification } from "../components/verify-form"

function OtpVerificationPage() {
  const handleVerify = (otpCode) => {
    console.log("Verifying OTP:", otpCode)
    // Handle OTP verification logic here
    // Redirect to dashboard or next step on success
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="/homes" className="flex items-center gap-2 self-center font-medium">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <GalleryVerticalEnd className="size-4" />
          </div>
          Hotel Management System
        </a>
        <OtpVerification email="user@example.com" onVerify={handleVerify} />
      </div>
    </div>
  )
}

export default OtpVerificationPage;
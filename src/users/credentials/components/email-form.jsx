import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoaderCircle } from "lucide-react";
import useGuestSignup from "../stores/useGuestSignup";

export function Registration_Email({ className, ...props }) {
  const [email, setEmailInput] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { setEmail, verifyEmail } = useGuestSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    console.log("[DEBUG] Submitting email:", email);
    setEmail(email); // Save to Zustand store
    console.log("[DEBUG] Zustand email set:", email);
  
    try {
      const result = await verifyEmail(email);
      console.log("[DEBUG] verifyEmail result:", result);
  
      if (result.success) {
        console.log("[DEBUG] Verification successful, navigating...");
        navigate("/auth/login/register/verify");
      } else {
        console.warn("[WARN] Verification failed:", result.message);
        alert(result.message || "Verification failed.");
      }
    } catch (error) {
      console.error("[ERROR] Exception in verifyEmail:", error);
      alert("Something went wrong during verification.");
    } finally {
      setLoading(false);
      console.log("[DEBUG] Done processing form.");
    }
  };
    
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Greetings and welcome!</CardTitle>
          <CardDescription>We are thrilled to have you onboard!</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="identifier">Email Address</Label>
                <Input
                  id="identifier"
                  type="email"
                  placeholder="Enter your email address."
                  value={email}
                  onChange={(e) => setEmailInput(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <LoaderCircle className="animate-spin" size={18} />
                    Verifying...
                  </span>
                ) : (
                  "Proceed"
                )}
              </Button>

              <div className="text-center text-sm">
                Already have an account?{" "}
                <a href="/auth/login/" className="underline underline-offset-4">
                  Sign in
                </a>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
        By clicking continue, you agree to our <a href="#">Terms of Service</a> and{" "}
        <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
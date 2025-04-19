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
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { LoaderCircle } from "lucide-react";
import useLoginAuth from "@/users/credentials/stores/useLoginAuth";

export function LoginForm({ className, ...props }) {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login, user, isAuthenticated, refreshToken } = useLoginAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);
    const credentials = {
      ...(isEmail ? { email_address: identifier } : { username: identifier }),
      password,
    };

    console.log("🔐 Submitting credentials:", credentials);

    try {
      await login(credentials); // Call the login function

      const updatedUser = useLoginAuth.getState().user;
      console.log("📦 Updated Zustand User:", updatedUser);
      
      const role = Array.isArray(updatedUser?.employee_role)
      ? updatedUser.employee_role.join(" ")
      : "";
      console.log("🔍 Detected Role:", role);

      // Role-based navigation
      switch (true) {
        case /Manager/i.test(role):
          navigate("/auth/login/manager-check");
          break;
        case /Staff\s*\+?\s*Room Data Management/i.test(role):
          navigate("/room-admin");
          break;
        case /Staff\s*\+?\s*Booking Reservations Department/i.test(role):
          navigate("/reservations-admin");
          break;
        case /Staff\s*\+?\s*Booking Assistance Inquiries/i.test(role):
          navigate("/assistance-admin");
          break;
        case /Staff\s*\+?\s*Knowledge\s*\/\s*Article\s*Managing/i.test(role):
          navigate("/kms-admin");
          break;
        default:
          navigate("/unauthorized");
      }
    } catch (err) {
      console.error("❌ Login Error:", err);
      setError("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const isLoginDisabled = !identifier || !password || loading;

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Welcome back</CardTitle>
          <CardDescription>Login user credentials</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="grid gap-6">
              {error && <p className="text-red-500 text-sm text-center">{error}</p>}

              <div className="grid gap-2">
                <Label htmlFor="identifier">Username or Email</Label>
                <Input
                  id="identifier"
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="Enter your username or email"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a href="#" className="ml-auto text-sm underline-offset-4 hover:underline">
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {loading ? (
                <div className="flex justify-center">
                  <LoaderCircle className="animate-spin text-black" size={32} />
                </div>
              ) : (
                <Button type="submit" className="w-full" disabled={isLoginDisabled}>
                  Login
                </Button>
              )}

              <div className="text-center text-sm">
                Don't have an account?{" "}
                <a href="/auth/login/register" className="underline underline-offset-4">
                  Sign up
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

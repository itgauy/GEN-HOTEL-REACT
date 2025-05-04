import { Bell, User, CreditCard, LogOut } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import useLoginAuth from "@/users/credentials/stores/useLoginAuth";

export function Navbar_User({ className, ...props }) {
  const navigate = useNavigate();
  const { logout, revalidateUser } = useLoginAuth();
  const [isSessionExpired, setIsSessionExpired] = useState(false);
  const [userData, setUserData] = useState({
    fullName: "Unknown User",
    email: "unknown@email.com",
  });

  useEffect(() => {
    async function syncUserData() {
      // First try to revalidate and fetch the latest user data
      try {
        const result = await revalidateUser(); // Assumes it returns updated user data
        if (result) {
          const firstName = result?.guest_name?.firstName ?? "";
          const lastName = result?.guest_name?.lastName ?? "";
          const fullName = `${firstName} ${lastName}`;
          const email = result?.email_address ?? "unknown@email.com";
          setUserData({ fullName, email });
        }
      } catch (error) {
        console.warn("Failed to revalidate user:", error);
      }
  
      // Fallback: load localStorage user data
      const stored = localStorage.getItem("auth-storage");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          const user = parsed?.state?.user;
          const firstName = user?.guest_name?.firstName ?? "";
          const lastName = user?.guest_name?.lastName ?? "";
          const fullName = `${firstName} ${lastName}`;
          const email = user?.email_address ?? "unknown@email.com";
          setUserData({ fullName, email });
        } catch (err) {
          console.error("Failed to parse auth-storage:", err);
        }
      }
  
      // Token expiry check (optional)
      const cookie = Cookies.get("refreshToken");
      if (cookie) {
        const decoded = decodeURIComponent(cookie);
        const parts = decoded.split(";").map((part) => part.trim());
        const expiresPart = parts.find((p) =>
          p.toLowerCase().startsWith("expires=")
        );
  
        if (expiresPart) {
          const expiresStr = expiresPart.split("=")[1];
          const expiresDate = new Date(expiresStr);
          const now = new Date();
  
          if (now >= expiresDate) {
            setIsSessionExpired(true);
          }
        }
      }
    }
  
    syncUserData();
  }, []);  

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur select-none">
      <AlertDialog>
        <div className="lg:container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center">
            <Link to="/user/onboard" className="text-xl font-bold">
              Hotels
            </Link>
          </div>
          <nav className="flex items-center gap-6">
            <Link to="/user/onboard" className="text-sm font-medium hover:underline">
              Homes
            </Link>
            {/* <Link to="/user/onboard/blog" className="text-sm font-medium hover:underline">
              Blog
            </Link> */}
            <a href="/user/onboard/bookings" className="text-sm font-medium hover:underline">
              Reservations
            </a>
            <div className="flex flex-row space-x-4 items-center">
              {/* Notify */}
              {/* <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="rounded-full p-2 border cursor-pointer hover:bg-gray-200">
                    <Bell size={16} />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-96" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-lg font-bold leading-none">Notifications</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="h-[200px] text-md p-2">
                    There are no notifications found.
                  </div>
                  <DropdownMenuSeparator />
                </DropdownMenuContent>
              </DropdownMenu> */}
              {/* User Profile with Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="cursor-pointer">
                    <Avatar>
                      <AvatarImage src="https://github.com/golash0000.png" alt="@shadcn" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{userData.fullName}</p>
                      <p className="text-xs leading-none text-muted-foreground">{userData.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={() => navigate("/user/onboard/account/profile")}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <CreditCard className="mr-2 h-4 w-4" />
                    <span>Billing</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <AlertDialogTrigger className="w-full">
                    <DropdownMenuItem>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </AlertDialogTrigger>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {isSessionExpired ? "Session Expired" : "Log Out Confirmation"}
                </AlertDialogTitle>
                <AlertDialogDescription>
                  {isSessionExpired
                    ? "Your session has expired. Please log in again."
                    : "If you have pending processes, you can sign in again."}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => {
                    logout();
                    setTimeout(() => {
                      navigate("/");
                    }, 0);
                  }}
                >
                  Proceed
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </nav>
        </div>
      </AlertDialog>
    </header>
  )
}
import {
  BadgeCheck,
  ChevronsUpDown,
  LogOut,
} from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
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
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import useLoginAuth from "@/users/credentials/stores/useLoginAuth";

export function NavUser() {
  const { isMobile } = useSidebar();
  const navigate = useNavigate();
  const { logout } = useLoginAuth();
  const [isSessionExpired, setIsSessionExpired] = useState(false);
  const [userData, setUserData] = useState({
    fullName: "Unknown User",
    email: "unknown@email.com",
  });

  useEffect(() => {
    // Load and format user data from localStorage
    const stored = localStorage.getItem("auth-storage");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        const user = parsed?.state?.user;
        const firstName = user?.employee_name?.firstName ?? "";
        const lastInitial = user?.employee_name?.lastName?.[0] ?? "";
        const fullName = `${firstName} ${lastInitial}.`;
        const email = user?.email_address ?? "unknown@email.com";
        setUserData({ fullName, email });
      } catch (err) {
        console.error("Failed to parse auth-storage:", err);
      }
    }

    // Check refreshToken expiry from cookie
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
  }, []);


  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <AlertDialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src="https://github.com/golash0000.png"
                    alt=""
                  />
                  <AvatarFallback className="rounded-lg">
                    {userData.fullName[0] ?? "?"}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{userData.fullName}</span>
                  <span className="truncate text-xs">{userData.email}</span>
                </div>
                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
              side={isMobile ? "bottom" : "right"}
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage
                      src="https://github.com/golash0000.png"
                      alt=""
                    />
                    <AvatarFallback className="rounded-lg">
                      {userData.fullName[0] ?? "?"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{userData.fullName}</span>
                    <span className="truncate text-xs">{userData.email}</span>
                  </div>
                </div>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <BadgeCheck className="mr-2" />
                  Account
                </DropdownMenuItem>
                <AlertDialogTrigger className="w-full">
                  <DropdownMenuItem>
                    <LogOut className="mr-2" />
                    Log out
                  </DropdownMenuItem>
                </AlertDialogTrigger>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

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
                  navigate("/auth");
                }}
              >
                Proceed
              </AlertDialogAction>
            </AlertDialogFooter>  
          </AlertDialogContent>
        </AlertDialog>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
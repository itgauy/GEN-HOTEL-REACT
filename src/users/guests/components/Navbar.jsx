import { Bell, User, CreditCard, LogOut } from "lucide-react"
import { Link } from "react-router-dom"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Navbar_User({ className, ...props }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur select-none">
      <div className="lg:container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center">
          <Link to="" className="text-xl font-bold">
            Hotels
          </Link>
        </div>
        <nav className="flex items-center gap-6">
          <Link to="/user/onboard" className="text-sm font-medium hover:underline">
            Homes
          </Link>
          <Link to="/user/onboard/blog" className="text-sm font-medium hover:underline">
            Blog
          </Link>
          <Link to="/user/onboard/bookings" className="text-sm font-medium hover:underline">
            Reservations
          </Link>
          <div className="flex flex-row space-x-4 items-center">
            {/* Notify */}
            <DropdownMenu>
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
            </DropdownMenu>
            {/* User Profile with Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="cursor-pointer">
                  <Avatar>
                    <AvatarImage src="https://github.com/lash0000.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">&lt;no name&gt;</p>
                    <p className="text-xs leading-none text-muted-foreground">k80308392@gmail.com</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CreditCard className="mr-2 h-4 w-4" />
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </nav>
      </div>
    </header>
  )
}
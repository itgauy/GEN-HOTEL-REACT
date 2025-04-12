import { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "../components/Sidebar";

function Booking_Reservation_Appbar({ children }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="p-4 space-y-2">
                <SidebarTrigger />
                <Outlet />
            </main>
        </SidebarProvider>
    );
}

export default Booking_Reservation_Appbar;